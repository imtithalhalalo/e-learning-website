<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
Route::group(["prefix"=> "v0.1"], function(){

    //admin routes
    Route::group(["middleware" => "admin.role"], function(){
        Route::post('/addinstructor', [AdminController::class, 'addInstructor'])->name('add-instructor');
        Route::post('/addstudentt', [AdminController::class, 'addStudent'])->name('add-student');
        Route::post('/addcourse', [AdminController::class, 'addCourse'])->name('add-course');
        Route::post('/assigninstructor', [AdminController::class, 'assignInstructor'])->name('assign-instructor-to-Course');
    });

    //instructor routes
    Route::group(["middleware" => "instructor.role"], function(){
        Route::post('/addstudent', [InstructorController::class, 'addStudent'])->name('add-student');
        Route::post('/enrollstudent', [InstructorController::class, 'enrollStudent'])->name('enroll-student');
        Route::post('/createassignment', [InstructorController::class, 'createAssignment'])->name('create-assignment');
        Route::post('/createannouncement', [InstructorController::class, 'createAnnouncement'])->name('create-announcement');
    });

    //student routes
    Route::group(["middleware" => "student.role"], function(){
        Route::get('/viewcourses', [StudentController::class, 'viewCourses'])->name('view-courses');
        Route::get('/viewassignments/{id}', [StudentController::class, 'viewAssignments'])->name('view-assignments');
        Route::post('/submitassignment', [StudentController::class, 'submitAssignment'])->name('submit-assignment');
        Route::get('/viewannouncements', [StudentController::class, 'viewAnnouncements'])->name('view-announcements');
    });

    Route::get('/retrievecourses', [AdminController::class, 'retrieveCourses'])->name('retrieve-courses');
    Route::get('/getinstructors', [AdminController::class, 'getInstructors'])->name('get-instructors');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
