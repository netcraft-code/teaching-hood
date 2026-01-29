<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class JobPostController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'perPage'   => 'required',
            'offset'   => 'required',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        $perPage = (int) request()->get('perPage', 10);
        $offset  = (int) request()->get('offset', 0);

        $jobs = JobPost::query()
            ->when($request->school_name, function ($query) use ($request) {
                $query->where('school_name', 'like', '%' . $request->school_name . '%');
            })
            ->when($request->subject, function ($query) use ($request) {
                $query->where('subject_id', $request->subject_id);
            })
            ->when($request->grade, function ($query) use ($request) {
                $query->where('grade_id', $request->grade_id);
            })
            ->when($request->city_id, function ($query) use ($request) {
                $query->where('city_id', $request->city_id);
            })
            ->when($request->job_type, function ($query) use ($request) {
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
            ->when($request->posted_date, function ($query) use ($request) {
                match ($request->posted_date) {
                    '24_hours' => $query->where('created_at', '>=', Carbon::now()->subHours(24)),
                    'week'     => $query->where('created_at', '>=', Carbon::now()->subWeek()),
                    'month'    => $query->where('created_at', '>=', Carbon::now()->subMonth()),
                    default    => null,
                };
            })
            ->latest()
            ->skip($offset)
            ->paginate($perPage);

        return response_formatter(DEFAULT_200, $jobs);
    }

    // CREATE JOB POST
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // School details
            'school_name' => 'required|string|max:255|unique:job_posts,school_name',
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
            'contact_email'            => auth()->user()->email,
            'contact_phone'            => auth()->user()->phone,
            'status'                   => $request->status ?? false,
            'user_id'                   => auth()->user()->id,
        ]);

        return response_formatter(DEFAULT_CREATED_201, $job);
    }

    // 📌 JOB POST DETAIL
    public function show($id)
    {
        $job = JobPost::findOrFail($id);

        return response_formatter(DEFAULT_200, $job);
    }

    // 📌 JOB POST UPDATE
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'school_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('job_posts', 'school_name')->ignore($id),
            ],
            'city'           => 'required|string|max:255',
            'state'          => 'required|string|max:255',
            'pincode'        => 'required|string|max:10',
            'board'          => 'required|string|max:100',
            'subject'        => 'required|string|max:100',
            'grade'          => 'required|string|max:50',
            'salary_range'   => 'required|string|max:100',
            'min_experience' => 'required|integer|min:0',
            'qualification'  => 'required|string|max:255',
            'no_of_teachers' => 'required|integer|min:1',
            'food'           => 'nullable|boolean',
            'accommodation'  => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        $job = JobPost::findOrFail($id);
        $job->update($validator->validated());

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
}
