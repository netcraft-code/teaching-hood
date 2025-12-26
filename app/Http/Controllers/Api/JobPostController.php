<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class JobPostController extends Controller
{
    // 📌 LIST ALL JOB POSTS
    public function index(Request $request)
    {
        $request->validate([
            'school_name' => 'nullable|string|max:255',
            'subject'     => 'nullable|string|max:255',
            'grade'       => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
        ]);

        $jobs = JobPost::query()

            ->when($request->school_name, function ($query) use ($request) {
                $query->where('school_name', 'like', '%' . $request->school_name . '%');
            })

            ->when($request->subject, function ($query) use ($request) {
                $query->where('subject', 'like', '%' . $request->subject . '%');
            })

            ->when($request->grade, function ($query) use ($request) {
                $query->where('grade', 'like', '%' . $request->grade . '%');
            })

            ->when($request->location, function ($query) use ($request) {
                $query->where('location', 'like', '%' . $request->location . '%');
            })

            ->latest()
            ->get();

        return response_formatter(
            DEFAULT_200,
            $jobs
        );
    }

    // 📌 CREATE JOB POST
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_name'    => 'required|string|max:255|unique:job_posts,school_name',
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
            return response_formatter(
                DEFAULT_VALIDATION_422,
                $validator->errors()
            );
        }

        $job = JobPost::create($validator->validated());

        return response_formatter(
            DEFAULT_CREATED_201,
            $job
        );
    }

    // 📌 JOB POST DETAIL
    public function show($id)
    {
        $job = JobPost::findOrFail($id);

        return response_formatter(
            DEFAULT_200,
            $job
        );
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
            return response_formatter(
                DEFAULT_VALIDATION_422,
                $validator->errors()
            );
        }

        $job = JobPost::findOrFail($id);
        $job->update($validator->validated());

        return response_formatter(
            DEFAULT_UPDATED_200,
            $job
        );
    }

    // 📌 DELETE JOB POST
    public function destroy($id)
    {
        JobPost::findOrFail($id)->delete();

        return response_formatter(DEFAULT_DELETED_200);
    }
}