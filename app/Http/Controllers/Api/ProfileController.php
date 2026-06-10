<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\AdditionalInfo;
use App\Http\Controllers\Controller;
use App\Models\AdditionalInfoGradeLevel;
use App\Models\AdditionalInfoSubject;
use Illuminate\Support\Facades\Storage;
use App\Models\Address;
use App\Models\GradeLevel;
use App\Models\Subject;

class ProfileController extends Controller
{
    public $data = [];

    public function update()
    {
        switch (auth()->user()->user_type) {
            case 1:
                $this->teacherProfile();
                break;
            case 2:
                $this->schoolProfile();
                break;
            case 3:
                $this->recruiterProfile();
                break;
            default:
                return response_formatter(DEFAULT_400);
        }

        return response_formatter(DEFAULT_UPDATED_200);
    }

    public function teacherProfile()
    {
        request()->validate([
            'about_us'            => 'required|string',
            'subjects'            => 'required|array',
            'grade_levels'        => 'required|array',
            'experience'          => 'required|array',
            'education'           => 'required|array',
            'achievement'         => 'nullable|string',
            'certification'       => 'nullable|string',

            'first_name'                => 'required|string|max:255',
            'last_name'                 => 'nullable|string|max:255',
            'phone'               => 'required|string|max:20',
            'position'            => 'nullable|string|max:255',
            'total_experience'    => 'nullable|string|max:255',

            'availability'        => 'nullable|string',
            'notice_period'       => 'nullable|string',
            'preferred_location'  => 'nullable|string',
            'min_salary'          => 'required|integer',
            'max_salary'          => 'required|integer',

            'resume'              => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'avatar_url'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner_image_url'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',

            /* ================= Address ================= */
            'address'             => 'required|string|max:500',
            'city'                => 'required|string|max:100',
            'state'               => 'required|string|max:100',
            'pincode'             => 'required|string|max:10',
            'country'             => 'nullable|string|max:100',
        ]);

        $user = auth()->user();

        $this->data = $this->updateUserData();
        $this->data['position'] = request()->grade . " " . request()->subject;

        $this->data['subject'] = request()->subject;
        $this->data['grade'] = request()->grade;

        $gradeLevel = GradeLevel::where('name', request()->grade)->first();
        $subject = Subject::where('name', request()->subject)->first();

        $this->data['grade_id'] = $gradeLevel->id;
        $this->data['subject_id'] = $subject->id;

        $this->updateBanners($user);

        $user->update($this->data);

        /* ================= Save ================= */
        $data = request()->only([
            'about_us',
            'experience',
            'education',
            'achievement',
            'certification',
            'availability',
            'notice_period',
            'preferred_location',
            'min_salary',
            'max_salary',
        ]);

        if (request()->hasFile('resume')) {
            // delete old resume if exists
            $old = AdditionalInfo::where('user_id', auth()->id())->value('resume');
            if ($old && Storage::disk('public')->exists($old)) {
                Storage::disk('public')->delete($old);
            }

            $data['resume'] = request()->file('resume')
                ->store('resumes', 'public'); // storage/app/public/resumes
        }

        $additional_info_id = AdditionalInfo::updateOrCreate(
            ['user_id' => auth()->id()],
            $data
        );

        /* ================= Save Address ================= */
        $this->updateAddresses($user);

        AdditionalInfoSubject::filterByAdditionalId($additional_info_id->id)
            ->delete();

        AdditionalInfoGradeLevel::filterByAdditionalId($additional_info_id->id)
            ->delete();

        foreach (request()->subjects as $subject) {
            AdditionalInfoSubject::updateOrCreate(
                [
                    'additional_info_id' => $additional_info_id->id,
                    'subject_id'        => $subject,
                ],
                [
                    'additional_info_id' => $additional_info_id->id,
                    'subject_id'        => $subject,
                ]
            );
        }

        foreach (request()->grade_levels as $gradelevel) {
            AdditionalInfoGradeLevel::updateOrCreate(
                [
                    'additional_info_id' => $additional_info_id->id,
                    'grade_level_id'    => $gradelevel,
                ],
                [
                    'additional_info_id' => $additional_info_id->id,
                    'grade_level_id'    => $gradelevel,
                ]
            );
        }
    }

    public function schoolProfile()
    {
        request()->validate([
            'about_us'          => 'required|string',
            'why_join_us'       => 'nullable|string',
            'website'       => 'nullable|string',
            'students'       => 'nullable|string',
            'teachers'       => 'nullable|string',

            'first_name'                => 'required|string|max:255',
            'last_name'                 => 'nullable|string|max:255',
            'phone'               => 'required|string|max:20',
            'position'            => 'nullable|string|max:255',
            'total_experience'    => 'nullable|string|max:255',

            'address'             => 'required|string|max:500',
            'city'                => 'required|string|max:100',
            'state'               => 'required|string|max:100',
            'pincode'             => 'required|string|max:10',
            'country'             => 'nullable|string|max:100',

            'avatar_url'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner_image_url'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $user = auth()->user();

        $this->data = $this->updateUserData();

        $this->updateBanners($user);

        $user->update($this->data);

        $data = request()->only([
            'about_us',
            "why_join_us",
            "website",
            "students",
            "teachers"
        ]);

        AdditionalInfo::updateOrCreate(
            ['user_id' => auth()->id()],
            $data
        );

        /* ================= Save Address ================= */
        $this->updateAddresses($user);
    }

    public function recruiterProfile()
    {
        request()->validate([
            'about_us'            => 'required|string',

            'first_name'                => 'required|string|max:255',
            'last_name'                 => 'nullable|string|max:255',
            'phone'               => 'required|string|max:20',
            'position'            => 'nullable|string|max:255',
            'total_experience'    => 'nullable|string|max:255',

            'avatar_url'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner_image_url'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',

            /* ================= Address ================= */
            'address'             => 'required|string|max:500',
            'city'                => 'required|string|max:100',
            'state'               => 'required|string|max:100',
            'pincode'             => 'required|string|max:10',
            'country'             => 'nullable|string|max:100',
        ]);

        $user = auth()->user();

        /* ================= User Update ================= */
        $this->data = $this->updateUserData();

        $this->updateAddresses($user);

        $this->updateBanners($user);

        $user->update($this->data);

        $data = request()->only([
            'about_us',
        ]);

        AdditionalInfo::updateOrCreate(
            ['user_id' => auth()->id()],
            $data
        );
    }

    public function updateUserData()
    {
        $userData = request()->only([
            'first_name',
            'last_name',
            'phone',
            'position',
            'total_experience',
            'board',
            'subject',
            'grade',
        ]);

        return $userData;
    }

    public function updateAddresses($user)
    {
        Address::updateOrCreate(
            ['user_id' => $user->id],
            request()->only([
                'address',
                'city',
                'state',
                'pincode',
                'country',
            ])
        );
    }

    public function updateBanners($user)
    {
        /* ================= Avatar (User + AdditionalInfo) ================= */
        if (request()->hasFile('avatar_url')) {
            // delete old user avatar
            if ($user->avatar_url && Storage::disk('public')->exists($user->avatar_url)) {
                Storage::disk('public')->delete($user->avatar_url);
            }

            $avatarPath = request()->file('avatar_url')->store('profile-images', 'public');

            // $userData['avatar_url'] = $avatarPath;
            $this->data['avatar_url']     = $avatarPath;
        }

        /* ================= Banner (User + AdditionalInfo) ================= */
        if (request()->hasFile('banner_image_url')) {

            if ($user->banner_image_url && Storage::disk('public')->exists($user->banner_image_url)) {
                Storage::disk('public')->delete($user->banner_image_url);
            }

            $bannerPath = request()->file('banner_image_url')->store('banner-images', 'public');

            // $userData['banner_image_url'] = $bannerPath;
            $this->data['banner_image_url']     = $bannerPath;
        }

        return $this->data;
    }

    public function updateImage()
    {
        // request()->validate([
        //     'image_type' => 'required|in:avatar,banner',
        //     'avatar_url' => 'required_if:image_type,avatar|image|mimes:jpg,jpeg,png,webp|max:2048',
        //     'banner_image_url' => 'required_if:image_type,banner|image|mimes:jpg,jpeg,png,webp|max:4096',
        // ]);

        $user = auth()->user();

        $userData = $this->updateBanners($user);

        $user->update($userData);

        $data = [];
        if (isset(request()->avatar_url)) {
            $data['avatar_url'] = url('/') . "/storage/" . $user->avatar_url;
        }

        if (isset(request()->banner_image_url)) {
            $data['banner_image_url'] = url('/') . "/storage/" . $user->banner_image_url;
        }

        return response_formatter(DEFAULT_UPDATED_200, $data);
    }

    public function getProfileCompletion(Request $request)
    {
        $user = auth()->user();

        $completion = calculateProfileCompletion($user);

        return response()->json([
            'user' => $user,
            'profile_completion' => $completion
        ]);
    }
}
