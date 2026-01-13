<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferredLocationCity extends Model
{
    protected $fillable = [
        'city_id',
        'additional_info_id'
    ];
}
