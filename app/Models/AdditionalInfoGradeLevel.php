<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalInfoGradeLevel extends Model
{
    protected $table = 'additional_info_grade_level';

    protected $fillable = [
        'grade_level_id',
        'additional_info_id',
    ];

    public static function scopeFilterByAdditionalId($query, $addtionalId)
    {
        return $query->where('additional_info_id', $addtionalId);
    }
}
