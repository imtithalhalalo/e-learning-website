<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Course;

class InstructorController extends Controller
{
    public function addStudent (Request $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Student added successfully',
            'user' => $user,
        ], 200);
    }
    
    public function addStudentToCourse(Request $request) {
        $student_email = $request->email;
        
        $course_id = $request->course_id;
        
        $add_student_to_course = Course::where('_id', '=', $course_id)
                                    ->get();
        
        foreach ($add_student_to_course as $row) {
            $row->update(['student_email' => $student_email]);
        }
        return response()->json( 
            $add_student_to_course,
        );                
    }
}
