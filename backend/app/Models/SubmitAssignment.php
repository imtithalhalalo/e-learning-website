<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class SubmitAssignment extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'assignment_id',
        'answer'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
