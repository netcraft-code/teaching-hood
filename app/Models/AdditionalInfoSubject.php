<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfoSubject extends Model
{
    protected $table = 'additional_info_subject';
        
    protected $fillable = [
        'subject_id',
        'additional_info_id',
    ];
}
