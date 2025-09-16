<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($notifiable, string $token) {
            $frontend = env('FRONTEND_URL', 'http://localhost:3000');
            $email = urlencode($notifiable->getEmailForPasswordReset());
            return "{$frontend}/auth/reset-password?token={$token}&email={$email}";
        });
    }
}
