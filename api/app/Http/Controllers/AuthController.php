<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $r) {
        $data = $r->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|min:10|max:15',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email'=> $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'] ?? null,
        ]);

         $token = $user->createToken('web')->plainTextToken;

        return response()->json([
          'user' => $user,
          'token' => $token
        ], 201);
    }

    public function login(Request $r) {
        $data = $r->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $email = strtolower(trim($data['email']));   // normalise
        $user = User::whereRaw('LOWER(email) = ?', [$email])->first();
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('web')->plainTextToken;
        return response()->json([
          'user' => $user,
          'token' => $token
        ]);
    }

    public function me(Request $r) {
        $token = $r->user()?->currentAccessToken();
        return response()->json([
            'user' => $r->user(),
            'token_id' => $token?->id,
            'abilities' => $token?->abilities,
        ]);
    }
}
