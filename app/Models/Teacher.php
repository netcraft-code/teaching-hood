<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
    ];

    protected function casts(): array
    {
        return [
            'education' => 'json',
            'experience' => 'json',
        ];
    }
}
