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
    public function index()
    {
        return response()->json([
            'response_code' => 200,
            'status' => true,
            'message' => 'Job posts fetched successfully',
            'data' => JobPost::latest()->get()
        ], 200);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_name'      => 'required|string|max:255|unique:job_posts,school_name',
            'city'             => 'required|string|max:255',
            'state'            => 'required|string|max:255',
            'pincode'          => 'required|string|max:10',
            'board'            => 'required|string|max:100',
            'subject'          => 'required|string|max:100',
            'grade'            => 'required|string|max:50',
            'salary_range'     => 'required|string|max:100',
            'min_experience'   => 'required|integer|min:0',
            'qualification'    => 'required|string|max:255',
            'no_of_teachers'   => 'required|integer|min:1',
            'food'             => 'nullable|boolean',
            'accommodation'    => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $job = JobPost::create($validator->validated());

        return response()->json([
            'response_code' => 201,
            'status' => true,
            'message' => 'Job post created successfully',
            'data' => $job
        ], 201);
    }


    // 📌 JOB POST DETAIL
    public function show($id)
    {
        $job = JobPost::findOrFail($id);

        return response()->json([
            'response_code' => 200,
            'status' => true,
            'message' => 'Job post details fetched successfully',
            'data' => $job
        ], 200);
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
            'city'             => 'required|string|max:255',
            'state'            => 'required|string|max:255',
            'pincode'          => 'required|string|max:10',
            'board'            => 'required|string|max:100',
            'subject'          => 'required|string|max:100',
            'grade'            => 'required|string|max:50',
            'salary_range'     => 'required|string|max:100',
            'min_experience'   => 'required|integer|min:0',
            'qualification'    => 'required|string|max:255',
            'no_of_teachers'   => 'required|integer|min:1',
            'food'             => 'nullable|boolean',
            'accommodation'    => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $job = JobPost::findOrFail($id);
        $job->update($validator->validated());

        return response()->json([
            'response_code' => 200,
            'status' => true,
            'message' => 'Job post updated successfully',
            'data' => $job
        ], 200);
    }




    // 📌 DELETE JOB POST
    public function destroy($id)
    {
        JobPost::findOrFail($id)->delete();

        return response()->json([
            'response_code' => 200,
            'status' => true,
            'message' => 'Job post deleted successfully'
        ], 200);
    }
}
