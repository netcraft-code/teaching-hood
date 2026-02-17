<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use App\Models\LikedJob;
use App\Models\AppliedJob;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobPostController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) request()->get('perPage', 10);
        $offset  = (int) request()->get('offset', 0);

        $jobs = JobPost::withCount('appliedJobs')
            ->with('city', 'grade', 'subject', 'like', 'applied')
            ->where('is_closed', false)
            ->when($request->search, function ($query) use ($request) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    // Search in job_posts table
                    $q->where('school_name', 'like', "%{$search}%")
                        ->orWhere('job_description', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%")

                        // 🔥 Search in city
                        ->orWhereHas('city', function ($city) use ($search) {
                            $city->where('name', 'like', "%{$search}%");
                        })

                        // 🔥 Search in subject
                        ->orWhereHas('subject', function ($subject) use ($search) {
                            $subject->where('name', 'like', "%{$search}%");
                        })

                        // 🔥 Search in grade
                        ->orWhereHas('grade', function ($grade) use ($search) {
                            $grade->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->school_name, function ($query) use ($request) {
                $query->where('school_name', 'like', '%' . $request->school_name . '%');
            })
            ->when($request->subject, function ($query) use ($request) {
                $query->where('subject_id', $request->subject_id);
            })
            ->when($request->grade, function ($query) use ($request) {
                $query->where('grade_id', $request->grade_id);
            })
            ->when($request->city_id != 'all', function ($query) use ($request) {
                $query->where('city_id', $request->city_id);
            })
            ->when($request->job_type != 'all', function ($query) use ($request) {
                $query->where('job_type', 'like', '%' . $request->job_type . '%');
            })
            ->when($request->experience_required, function ($query) use ($request) {
                $query->where('experience_required', 'like', '%' . $request->experience_required . '%');
            })
            ->when($request->min_salary && $request->max_salary, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->whereBetween('min_salary', [$request->min_salary, $request->max_salary])
                        ->orWhereBetween('max_salary', [$request->min_salary, $request->max_salary]);
                });
            })
            ->when($request->posted_date != 'any', function ($query) use ($request) {
                match ($request->posted_date) {
                    '24h'      => $query->where('created_at', '>=', Carbon::now()->subHours(24)),
                    'week'     => $query->where('created_at', '>=', Carbon::now()->subWeek()),
                    'month'    => $query->where('created_at', '>=', Carbon::now()->subMonth()),
                    default    => null,
                };
            })
            ->latest()
            ->skip($offset)
            ->paginate($perPage);

        $lastWeekJobs = JobPost::where('created_at', '>=', now()->subWeek())->count();

        $jobs->map(function ($job) {
            $job->city_name = $job->city->name;
            $job->subject_name = $job->subject?->name;
            $job->grade_name = $job->grade?->name;
            $job->is_liked = $job->like ? true : false;
            $job->is_applied = $job->applied ? true : false;
            $job->is_closed = $job->is_closed;

            $job->total_applicants = $job->applied_jobs_count;
        });

        $extraData['new_jobs'] = $lastWeekJobs;

        return response_formatter(DEFAULT_200, $jobs, $extraData);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // School details
            'school_name' => 'required|string|max:255',
            'city_id'     => 'required|integer|exists:cities,id',

            'position'  => 'required|string',

            // Job details
            'subject_id'  => 'nullable|integer|exists:subjects,id',
            'grade_id'    => 'nullable|integer|exists:grade_levels,id',

            // Facilities
            'food'         => 'nullable|boolean',
            'accommodation' => 'nullable|boolean',

            // Job info
            'job_type'            => 'required|string|max:100',
            'min_salary'          => 'required|integer|min:0',
            'max_salary'          => 'required|integer|gte:min_salary',
            'experience_required' => 'required|string|max:100',

            // Descriptions
            'job_description'             => 'required|string',
            'qualification_requirements'  => 'required|string',

            // Dates
            'application_deadline' => 'required|date|after:today',

            // Status
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        $job = JobPost::create([
            'school_name'              => $request->school_name,
            'position'                 => $request->position,
            'city_id'                  => $request->city_id,
            'subject_id'               => $request->subject_id,
            'grade_id'                 => $request->grade_id,
            'food'                     => $request->boolean('food'),
            'accommodation'            => $request->boolean('accommodation'),
            'job_type'                 => $request->job_type,
            'min_salary'               => $request->min_salary,
            'max_salary'               => $request->max_salary,
            'experience_required'      => $request->experience_required,
            'job_description'          => $request->job_description,
            'qualification_requirements' => $request->qualification_requirements,
            'application_deadline'     => $request->application_deadline,
            'contact_email'            => $request->contact_email,
            'contact_phone'            => $request->contact_phone,
            'status'                   => $request->status ?? false,
            'user_id'                   => auth()->user()->id,
        ]);

        return response_formatter(DEFAULT_CREATED_201, $job);
    }

    // 📌 JOB POST DETAIL
    public function show($id)
    {
        $job = JobPost::with('city', 'grade', 'subject', 'user.addresses', 'user.additional_info')
            ->findOrFail($id);

        $job->city_name = $job->city->name;
        $job->subject_name = $job->subject?->name;
        $job->grade_name = $job->grade?->name;

        return response_formatter(DEFAULT_200, $job);
    }

    // 📌 JOB POST UPDATE
    public function update(Request $request, $id)
    {
        $job = JobPost::findOrFail($id);

        $validator = Validator::make($request->all(), [
            // School details
            'school_name' => 'required|string|max:255',
            'city_id'     => 'required|integer|exists:cities,id',

            'position'  => 'required|string',

            // Job details
            'subject_id'  => 'nullable|integer|exists:subjects,id',
            'grade_id'    => 'nullable|integer|exists:grade_levels,id',

            // Facilities
            'food'         => 'nullable|boolean',
            'accommodation' => 'nullable|boolean',

            // Job info
            'job_type'            => 'required|string|max:100',
            'min_salary'          => 'required|integer|min:0',
            'max_salary'          => 'required|integer|gte:min_salary',
            'experience_required' => 'required|string|max:100',

            // Descriptions
            'job_description'             => 'required|string',
            'qualification_requirements'  => 'required|string',

            // Dates
            'application_deadline' => 'required|date|after:today',

            // Status
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        $job->update([
            'school_name'               => $request->school_name,
            'position'                  => $request->position,
            'city_id'                   => $request->city_id,
            'subject_id'                => $request->subject_id,
            'grade_id'                  => $request->grade_id,
            'food'                      => $request->boolean('food'),
            'accommodation'             => $request->boolean('accommodation'),
            'job_type'                  => $request->job_type,
            'min_salary'                => $request->min_salary,
            'max_salary'                => $request->max_salary,
            'experience_required'       => $request->experience_required,
            'job_description'           => $request->job_description,
            'qualification_requirements' => $request->qualification_requirements,
            'application_deadline'      => $request->application_deadline,
            'contact_email'             => $request->contact_email,
            'contact_phone'             => $request->contact_phone,
            'status'                    => $request->status ?? false,
            'is_closed'                 => false,
        ]);

        return response_formatter(DEFAULT_UPDATED_200, $job);
    }

    // 📌 DELETE JOB POST
    public function destroy($id)
    {
        JobPost::findOrFail($id)->delete();
        return response_formatter(DEFAULT_DELETED_200);
    }

    public function getMaxCitiesJobs()
    {
        $jobs = JobPost::with('city')
            ->select('city_id', \DB::raw('COUNT(*) as total_jobs'))
            ->groupBy('city_id')
            ->orderByDesc('total_jobs')
            ->limit(5)
            ->get();

        $jobs->map(function ($job) {
            $job->city_name = $job->city->name;
            return $job;
        });

        return response_formatter(DEFAULT_200, $jobs);
    }

    public function like(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'job_post_id' => 'required|exists:job_posts,id',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        $userId = auth()->id();

        $likedJob = LikedJob::where([
            'user_id'     => $userId,
            'job_post_id' => $request->job_post_id,
        ])->first();

        if (!$likedJob) {
            // ✅ LIKE
            LikedJob::create([
                'user_id'     => $userId,
                'job_post_id' => $request->job_post_id,
            ]);

            return response_formatter(DEFAULT_200, [
                'liked' => true,
                'message' => 'Job liked successfully'
            ]);
        } else {
            // ❌ UNLIKE
            $likedJob->delete();

            return response_formatter(DEFAULT_200, [
                'liked' => false,
                'message' => 'Job unliked successfully'
            ]);
        }
    }

    public function close($id)
    {
        $jobsPost = JobPost::find($id);
        $jobsPost->update(['is_closed' => true]);

        return response_formatter(DEFAULT_200, [
            'liked' => true,
            'message' => 'Job closed successfully'
        ]);
    }

    public function currentVacanies()
    {
        if (auth()->user()->user_type == 2) {
            $perPage = (int) request()->get('perPage', 10);
            $offset  = (int) request()->get('offset', 0);

            $jobs = JobPost::with('city', 'grade', 'subject')
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->skip($offset)
                ->paginate($perPage);

            $jobs->map(function ($job) {
                $job->city_name = $job->city->name;
                $job->subject_name = $job->subject?->name;
                $job->grade_name = $job->grade?->name;
                $job->is_liked = $job->like ? true : false;

                $job->total_applicants = 0;
            });

            return response_formatter(DEFAULT_200, $jobs);
        }
    }

    public function applyJob($id)
    {
        $userId = auth()->id();

        // ✅ Check job exists
        $job = JobPost::findOrFail($id);

        // ✅ Prevent duplicate application
        $alreadyApplied = AppliedJob::where([
            'user_id'     => $userId,
            'job_post_id' => $id,
        ])->exists();

        if ($alreadyApplied) {
            return response_formatter(DEFAULT_200, [
                'applied' => true,
                'message' => 'You have already applied for this job'
            ]);
        }

        // ✅ Apply job
        AppliedJob::create([
            'user_id'     => $userId,
            'job_post_id' => $id,
        ]);

        return response_formatter(DEFAULT_200, [
            'applied' => true,
            'message' => 'This job has been applied successfully, Your interest has been expressed to the school'
        ]);
    }

    public function appliedJobs(Request $request)
    {
        $perPage = (int) request()->get('perPage', 10);
        $offset  = (int) request()->get('offset', 0);

        $appliedJobs = AppliedJob::with('user', 'job_posted')
            ->where('user_id', auth()->user()->id)
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('job_posted', function ($q) use ($request) {
                    $q->where('school_name', 'like', '%' . $request->search . '%')
                        ->orWhere('job_description', 'like', '%' . $request->search . '%')
                        ->orWhere('position', 'like', '%' . $request->search . '%');
                });
            })
            ->latest()
            ->skip($offset)
            ->paginate($perPage);

        return response_formatter(DEFAULT_200, $appliedJobs);
    }
}
