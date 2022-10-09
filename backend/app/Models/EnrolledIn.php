<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Tymon\JWTAuth\Contracts\JWTSubject;

class EnrolledIn extends Eloquent implements JWTSubject
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'course_id'
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
