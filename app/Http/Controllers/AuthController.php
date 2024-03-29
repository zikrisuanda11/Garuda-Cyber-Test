<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function loginPage()
    {
        return inertia('Auth/Login');
    }

    public function registerPage()
    {
        return inertia('Auth/Register');
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        if(!auth()->attempt($request->only('email', 'password'))) {
            return Inertia::render('Auth/Login', [
                'error' => 'Email atau Password salah'
            ]);
            // return to_route('root')->with('error', 'Email atau Password salah');
            // return to_route('root')->with('message', 'Berhasil Login');
        }

        auth()->user()->createToken('token')->plainTextToken;

        return to_route('root')->with('message', 'Berhasil Login');

    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return inertia('Auth/Login', [
            'message' => 'Berhasil Mendaftar'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return inertia('Auth/Login', [
            'message' => 'Berhasil Logout'
        ]);
    }
}
