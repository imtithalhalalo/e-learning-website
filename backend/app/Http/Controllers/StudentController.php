<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
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

    public function viewAssignments ($courseID) {
        $assignments = Assignment::where('course_id', '=', $courseID)->get();

        return response()->json([
            'status' => 'success',
            'message' => 'All Assignments',
            'assignments' => $assignments,
        ], 200);
    }

    public function submitAssignment ( Request $request ) {
                    
        $submit = SubmitAssignment::create([
            'student_id' => Auth::user()->_id,
            'assignment_id' => $request->assignment_id,
            'answer' => $request->answer
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Submitted successfully',
            'submit' => $submit,
        ], 200);
    }

    public function viewAnnouncements () {
        $announcements = Announcement::all();

        return response()->json([
            'status' => 'success',
            'message' => 'All Announcements',
            'announcements' => $announcements,
        ], 200);
    }
}
