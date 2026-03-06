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
        'subject',
        'grade',
        'user_id',
        'is_applied',
        'is_closed',
        'board'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
        return $this->belongsTo(LikedJob::class, 'id', 'job_post_id')
            ->where('user_id', auth()->id());
    }

    public function appliedJobs()
    {
        return $this->hasMany(AppliedJob::class, 'job_post_id');
    }

    public function applied()
    {
        return $this->hasOne(AppliedJob::class, 'job_post_id', 'id')
            ->where('user_id', auth()->id());
    }
}
