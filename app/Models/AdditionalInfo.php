<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfo extends Model
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
        'notice_period',
        'resume',
        'avatar_url',
        'banner_image_url',
        'min_salary',
        'max_salary',
        'students',
        'teachers',
        'why_join_us',
        'website',
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

    public function grade_levels()
    {
        return $this->belongsToMany(GradeLevel::class);
    }

    public function preferred_locations()
    {
        return $this->belongsToMany(PreferredLocationCity::class);
    }
}
