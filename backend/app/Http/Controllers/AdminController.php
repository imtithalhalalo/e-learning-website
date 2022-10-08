<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
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

    public function addInstructor (Request $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Instructor added successfully',
            'user' => $user,
        ], 200);
    }

    public function addCourse (Request $request) {
        $extension = $request->imageExtension;
        $encryptedImage =$request->encryptedImage;
        $image_no = time();//imageid
        $image = base64_decode($encryptedImage);
        $path = "images/courses/".$image_no.".".$extension;
        file_put_contents($path,$image);
        $course = Course::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'image_url' => $path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Course added successfully',
            'course' => $course,
        ], 200);
    }
}