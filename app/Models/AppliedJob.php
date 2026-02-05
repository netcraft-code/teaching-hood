<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedJob extends Model
{
    protected $fillable = [
        'user_id',
        'job_post_id',
    ];
}
