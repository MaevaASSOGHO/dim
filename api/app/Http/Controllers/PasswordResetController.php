<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function sendLink(Request $r)
    {
        $r->validate(['email' => 'required|email']);

        // Par sécurité, on répond toujours OK, même si l’e-mail n’existe pas
        $status = Password::sendResetLink($r->only('email'));

        return response()->json([
            'ok' => true,
            'status' => __($status),
        ]);
    }

    public function reset(Request $r)
    {
        $r->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed', // attend password_confirmation
        ]);

        $status = Password::reset(
            $r->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($r) {
                $user->forceFill([
                    'password' => Hash::make($r->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['ok' => true, 'message' => __($status)]);
        }

        return response()->json(['ok' => false, 'message' => __($status)], 422);
    }
}
