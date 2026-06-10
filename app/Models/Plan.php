<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected function casts(): array
    {
        return [
            'features' => 'json',
        ];
    }   
}
