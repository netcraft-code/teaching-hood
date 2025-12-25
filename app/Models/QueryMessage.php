<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QueryMessage extends Model
{
    protected $fillable = ['name','email','subject','message'];
}
