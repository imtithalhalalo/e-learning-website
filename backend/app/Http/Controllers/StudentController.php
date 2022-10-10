<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\EnrolledIn;
use App\Models\SubmitAssignment;
use App\Models\User;

class StudentController extends Controller
{
    public function viewCourses () {
        $studentID = Auth::user()->_id;
        
        $courses = EnrolledIn::where('student_id', '=', $studentID)->get();

        $result = [];

        foreach ($courses as $course) {
            $result[] = $course->course;
        }
        return response()->json([
            'status' => 'success',
            'message' => 'All Courses Enrolled In',
            'courses' => $result,
        ], 200);
    }

}
