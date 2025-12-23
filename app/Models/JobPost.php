<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    //

    protected $fillable = [
        'school_name',
        'city',
        'state',
        'pincode',
        'board',
        'subject',
        'grade',
        'salary_range',
        'min_experience',
        'qualification',
        'no_of_teachers',
        'food',
        'accommodation',
    ];
}
