<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'board',
        'email',
        'password',
        'otp',
        'user_type',
        'otp_expires_at',
        'phone',
        'city',
        'avatar_url',
        'banner_image_url',
        'position',
        'total_experience',
        'grade_id',
        'subject_id',
        'grade',
        'subject',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function additional_info()
    {
        return $this->hasOne(AdditionalInfo::class);
    }

    public function addresses()
    {
        return $this->hasOne(Address::class);
    }

    public function job_posts()
    {
        return $this->hasMany(JobPost::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
