<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditonalInfo extends Model
{
    protected $fillable = [
        'user_id',
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
        'resume',
        'avatar_url',
        'banner_image_url'
    ];

    protected function casts(): array
    {
        return [
            'education' => 'json',
            'experience' => 'json',
            'preferred_location' => 'json',
        ];
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }

    public function grade_level()
    {
        return $this->belongsToMany(GradeLevel::class);
    }
}
