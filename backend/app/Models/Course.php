<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Tymon\JWTAuth\Contracts\JWTSubject;
class Course extends Eloquent implements JWTSubject
{
    use HasFactory;
    protected $fillable = [
        'title',
        'desc',
        'image_url',
        'instructor_id',
        'student_email'
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
