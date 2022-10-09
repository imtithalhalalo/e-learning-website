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
        Route::post('/addstudent', [AdminController::class, 'addStudent'])->name('add-student');
        Route::post('/addcourse', [AdminController::class, 'addCourse'])->name('add-course');
        Route::post('/assigninstructor', [AdminController::class, 'assignInstructor'])->name('assign-instructor-to-Course');
    });

    
    Route::get('/retrievecourses', [AdminController::class, 'retrieveCourses'])->name('retrieve-courses');
    Route::get('/getinstructors', [AdminController::class, 'getInstructors'])->name('get-instructors');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
