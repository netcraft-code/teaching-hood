<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\AdditionalInfo;
use App\Http\Controllers\Controller;
use App\Models\AdditionalInfoGradeLevel;
use App\Models\AdditionalInfoSubject;
use Illuminate\Support\Facades\Storage;
use App\Models\Address;
use App\Models\PreferredLocationCity;

class ProfileController extends Controller
{
    public function get()
    {
        $data = auth()->user()->load('additional_info.subjects', 'additional_info.grade_level', 'addresses');

        return response_formatter(DEFAULT_200, $data);
    }

    public function update(Request $request)
    {
        // dd(request()->all());
        if (auth()->user()->user_type == 1) {
            $request->validate([
                'about_us'            => 'required|string',
                'subjects'             => 'required|array',
                'grade_levels'         => 'required|array',
                'experience'          => 'required|array',
                'education'           => 'required|array',
                'achievement'         => 'required|string',
                'certification'       => 'required|string',

                'name'                => 'required|string|max:255',
                'phone'               => 'required|string|max:20',
                'position'            => 'nullable|string|max:255',
                'total_experience'    => 'nullable|string|max:255',

                'availability'        => 'required|string',
                // 'expected_salary'     => 'required|string',
                'notice_period'       => 'required|string',
                'preferred_location'  => 'required|array',
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

            /* ================= User Update ================= */
            $userData = $request->only([
                'name',
                'phone',
                'position',
                'total_experience',
            ]);

            $data = $request->only([
                'about_us',
                'experience',
                'education',
                'achievement',
                'certification',
                'availability',
                // 'expected_salary',
                'notice_period',
                'preferred_location',
                'min_salary',
                'max_salary'
            ]);

            if ($request->hasFile('resume')) {
                // delete old resume if exists
                $old = AdditionalInfo::where('user_id', auth()->id())->value('resume');
                if ($old && Storage::disk('public')->exists($old)) {
                    Storage::disk('public')->delete($old);
                }

                $data['resume'] = $request->file('resume')
                    ->store('resumes', 'public'); // storage/app/public/resumes
            }

            /* ================= Avatar (User + AdditionalInfo) ================= */
            if ($request->hasFile('avatar_url')) {

                // delete old user avatar
                if ($user->avatar_url && Storage::disk('public')->exists($user->avatar_url)) {
                    Storage::disk('public')->delete($user->avatar_url);
                }

                $avatarPath = $request->file('avatar_url')->store('profile-images', 'public');

                $userData['avatar_url'] = $avatarPath;
                $data['avatar_url']     = $avatarPath;
            }

            /* ================= Banner (User + AdditionalInfo) ================= */
            if ($request->hasFile('banner_image_url')) {

                if ($user->banner_image_url && Storage::disk('public')->exists($user->banner_image_url)) {
                    Storage::disk('public')->delete($user->banner_image_url);
                }

                $bannerPath = $request->file('banner_image_url')->store('banner-images', 'public');

                $userData['banner_image_url'] = $bannerPath;
                $data['banner_image_url']     = $bannerPath;
            }

            /* ================= Save ================= */
            $user->update($userData);

            $additional_info_id = AdditionalInfo::updateOrCreate(
                ['user_id' => auth()->id()],
                $data
            );

            /* ================= Save Address ================= */
            Address::updateOrCreate(
                ['user_id' => $user->id],
                $request->only([
                    'address',
                    'city',
                    'state',
                    'pincode',
                    'country',
                ])
            );

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
            
            foreach (request()->preferred_location as $city) {
                PreferredLocationCity::updateOrCreate(
                    [
                        'additional_info_id' => $additional_info_id->id,
                        'city_id'    => $city,
                    ],
                    [
                        'additional_info_id' => $additional_info_id->id,
                        'city_id'    => $city,
                    ]
                );
            }
        }

        return response_formatter(DEFAULT_UPDATED_200);
    }
}
