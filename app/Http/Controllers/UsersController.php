<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    // /users/{user} @show users.show
    public function show(User $user)
    {
      return view('users.show', compact('user'));
    }
}
