<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AppliedJob as MailAppliedJob;
use App\Models\JobPost;
use App\Models\LikedJob;
use App\Models\AppliedJob;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class JobPostController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) request()->get('perPage', 10);
        $offset  = (int) request()->get('offset', 0);

        $jobs = JobPost::withCount('appliedJobs')
            ->with('city.state', 'grade', 'subject', 'like', 'applied')
            ->where('status', true)
            ->where('is_closed', false)
            ->when($request->search, function ($query) use ($request) {
                $keywords = explode(' ', $request->search);
                $query->where(function ($q) use ($keywords) {
                    foreach ($keywords as $word) {
                        $q->where(function ($sub) use ($word) {
                            $sub->where('school_name', 'like', "%{$word}%")
                                ->orWhere('job_description', 'like', "%{$word}%")
                                ->orWhere('position', 'like', "%{$word}%")

                                ->orWhereHas('city', function ($city) use ($word) {
                                    $city->where('name', 'like', "%{$word}%");
                                })

                                ->orWhereHas('subject', function ($subject) use ($word) {
                                    $subject->where('name', 'like', "%{$word}%");
                                })

                                ->orWhereHas('grade', function ($grade) use ($word) {
                                    $grade->where('name', 'like', "%{$word}%");
                                });
                        });
                    }
                });
            })
            ->when($request->school_name, function ($query) use ($request) {
                $query->where('school_name', 'like', '%' . $request->school_name . '%');
            })
            ->when($request->subject_id != 'all', function ($query) use ($request) {
                $query->where('subject_id', $request->subject_id);
            })
            ->when($request->grade_id != 'all', function ($query) use ($request) {
                $query->where('grade_id', $request->grade_id);
            })
            ->when($request->city_id != 'all', function ($query) use ($request) {
                $query->where('city_id', $request->city_id);
            })
            // ->when($request->state_id != 'all', function ($query) use ($request) {
            //     $query->whereHas('city', function ($q) use ($request) {
            //         $q->where('state_id', $request->state_id);
            //     });
            // })
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
            'board'                     => $request->board
        ]);

        return response_formatter(DEFAULT_CREATED_201, $job);
    }

    // 📌 JOB POST DETAIL
    public function show($id)
    {
        $job = JobPost::with('city', 'grade', 'subject', 'user.addresses', 'user.additional_info')->findOrFail($id);

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
            'board'                     => $request->board
        ]);

        return response_formatter(DEFAULT_UPDATED_200, $job);
    }

    // 📌 DELETE JOB POST
    public function destroy($id)
    {
        JobPost::findOrFail($id)->delete();
        return response_formatter(DEFAULT_DELETED_200);
    }

    public function getMaxStateJobs()
    {
        $jobs = \DB::table('states')
            ->leftJoin('cities', 'states.id', '=', 'cities.state_id')
            ->leftJoin('job_posts', 'cities.id', '=', 'job_posts.city_id')
            ->select(
                'states.id as state_id',
                'states.name as state_name',
                \DB::raw('COUNT(job_posts.id) as total_jobs')
            )
            ->groupBy('states.id', 'states.name')
            ->orderByDesc('total_jobs')
            ->get();

        return response_formatter(DEFAULT_200, $jobs);
    }

    public function getMaxSubjectsJobs()
    {
        $jobs = JobPost::with('subject')
            ->select('subject_id', \DB::raw('COUNT(*) as total_jobs'))
            ->groupBy('subject_id')
            ->orderByDesc('total_jobs')
            // ->limit(5)
            ->get();

        $jobs->map(function ($job) {
            $job->subject_name = $job->subject?->name;
            return $job;
        });

        return response_formatter(DEFAULT_200, $jobs);
    }

    public function getMaxGradesJobs()
    {
        $jobs = JobPost::with('grade')
            ->select('grade_id', \DB::raw('COUNT(*) as total_jobs'))
            ->groupBy('grade_id')
            ->orderByDesc('total_jobs')
            // ->limit(5)
            ->get();

        $jobs->map(function ($job) {
            $job->grade_name = $job->grade?->name;
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

        if (in_array(auth()->user()->user_type, [3, 2])) {
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

        if ($job->contact_email) {
            Mail::to($job->contact_email)->send(new MailAppliedJob($job));
        }

        // Calculate job age in days
        $jobAgeInDays = Carbon::parse($job->created_at)->diffInDays(now());

        if ($jobAgeInDays > 30) {
            $message = 'This job has been applied successfully, Your interest has been expressed to the school';
        } else {
            $schoolName = $job->school_name ?? 'the school';
            $message = "Your application has been forwarded to {$schoolName}. If your profile matches, they will contact you via your registered mobile / email.";
        }

        return response_formatter(DEFAULT_200, [
            'applied' => true,
            'message' => $message
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
