<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentMiddleware
{

    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if ($user && $user->user_type == "student") {

            return $next($request);
        }
        dd("Quit");
    }
}
