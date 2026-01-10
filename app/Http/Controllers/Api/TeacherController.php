<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GradeLevel;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    public function get()
    {
        $data = auth()->user()->load('teacher');

        return response_formatter(DEFAULT_200, $data);
    }

    public function update(Request $request)
    {
        if (auth()->user()->user_type == 1) {
            $request->validate([
                'about_us'            => 'required|string',
                'subject'             => 'required|string',
                'grade_level'         => 'required|string',
                'experience'          => 'required|string',
                'education'           => 'required|string',
                'achievement'         => 'required|string',
                'certification'       => 'required|string',

                'availability'        => 'required|string',
                'expected_salary'     => 'required|string',
                'notice_period'       => 'required|string',
                'preferred_location'  => 'required|string',

                // ✅ Resume validation
                'resume'              => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            ]);

            $data = $request->only([
                'about_us',
                'subject',
                'grade_level',
                'experience',
                'education',
                'achievement',
                'certification',
                'availability',
                'expected_salary',
                'notice_period',
                'preferred_location',
            ]);

            // ✅ Handle resume upload
            if ($request->hasFile('resume')) {
                // delete old resume if exists
                $old = Teacher::where('user_id', auth()->id())->value('resume');
                if ($old && Storage::disk('public')->exists($old)) {
                    Storage::disk('public')->delete($old);
                }

                $data['resume'] = $request->file('resume')
                    ->store('resumes', 'public'); // storage/app/public/resumes
            }

            Teacher::updateOrCreate(
                ['user_id' => auth()->id()],
                $data
            );
        }

        return response_formatter(DEFAULT_UPDATED_200);
    }

    public function getSubjects()
    {
        $subjects = Subject::all();

        return response_formatter(DEFAULT_200, $subjects);
    }

    public function getGradeLevel()
    {
        $gradelevel = GradeLevel::all();

        return response_formatter(DEFAULT_200, $gradelevel);
    }
}
