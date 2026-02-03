<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    protected $fillable = [
        'school_name',
        'city_id',
        'subject_id',
        'grade_id',
        'food',
        'accommodation',
        'job_type',
        'min_salary',
        'max_salary',
        'experience_required',
        'job_description',
        'qualification_requirements',
        'application_deadline',
        'contact_email',
        'contact_phone',
        'status',
        'position',
        'user_id',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function grade()
    {
        return $this->belongsTo(GradeLevel::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function like()
    {
        return $this->belongsTo(LikedJob::class, 'user_id', 'user_id');
    }
}
