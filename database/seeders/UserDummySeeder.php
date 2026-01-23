<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Models\User;
use App\Models\AdditionalInfo;
use App\Models\AdditionalInfoGradeLevel;
use App\Models\AdditionalInfoSubject;
use App\Models\Address;

class UserDummySeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {

            /** ------------------------
             *  USER
             * ------------------------ */
            $user = User::create([
                'first_name'        => "User{$i}",
                'last_name'         => "Demo",
                'board'             => 'CBSE',
                'email'             => "user{$i}@example.com",
                'password'          => Hash::make('password'),
                'otp'               => rand(100000, 999999),
                'user_type'         => $i % 2 === 0 ? 1 : 2,
                'otp_expires_at'    => Carbon::now()->addMinutes(10),
                'phone'             => '99900000' . $i,
                'city'              => 'Delhi',
                'avatar_url'        => 'https://via.placeholder.com/150',
                'banner_image_url'  => 'https://via.placeholder.com/1200x300',
                'position'          => $i % 2 === 0 ? 'Teacher' : 'Student',
                'total_experience'  => $i % 2 === 0 ? rand(1, 10) : 0,
            ]);

            /** ------------------------
             *  ADDITIONAL INFO
             * ------------------------ */
            $additionalInfo = AdditionalInfo::create([
                'user_id'        => $user->id,
                'about_us'       => 'Passionate about learning and teaching.',
                'subjects_id'        => 1,
                'grade_level_id'    => 1,
                'experience'     => rand(1, 10) . ' years',
                'education'      => 'B.Ed / M.Sc',
                'achievement'    => 'Best Teacher Award',
                'certification'  => 'Teaching Certification',
                'availability'   => 'Full Time',
                'notice_period'  => '30 days',
                'resume'         => 'resume_' . Str::random(8) . '.pdf',
                // 'avatar_url'     => 'https://via.placeholder.com/150',
                // 'banner_image_url' => 'https://via.placeholder.com/1200x300',
                'min_salary'     => 20000,
                'max_salary'     => 50000,
                'students'       => rand(20, 100),
                'teachers'       => rand(1, 5),
                'why_join_us'    => 'Great learning environment',
                'website'        => 'https://example.com',
            ]);

            /** ------------------------
             *  USER GRADE LEVEL
             * ------------------------ */
            AdditionalInfoGradeLevel::create([
                'grade_level_id'    => rand(1, 5),
                'additional_info_id' => $additionalInfo->id,
            ]);

            /** ------------------------
             *  USER SUBJECT
             * ------------------------ */
            AdditionalInfoSubject::create([
                'subject_id'        => rand(1, 5),
                'additional_info_id' => $additionalInfo->id,
            ]);

            /** ------------------------
             *  USER ADDRESS
             * ------------------------ */
            Address::create([
                'user_id'   => $user->id,
                'address'   => 'Street No ' . rand(1, 50),
                'city'      => 'Delhi',
                'state'     => 'Delhi',
                'pincode'   => '1100' . rand(10, 99),
                'country'   => 'India',
            ]);
        }
    }
}
