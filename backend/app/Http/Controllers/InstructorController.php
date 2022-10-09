<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course_Student;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Course;
use App\Models\EnrolledIn;

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
    

    public function createAssignment (Request $request) {
        $assignment = Assignment::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'deadline' => $request->deadline,
            'course_id' => $request->course_id
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Assignment added successfully',
            'assignment' => $assignment,
        ], 200);
    }
}
