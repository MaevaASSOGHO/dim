<?php

// app/Http/Controllers/ProfileController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function updateAvatar(Request $r)
    {
        $r->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $r->user();

        // supprime l’ancien fichier si présent
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = $r->file('avatar')->store('avatars', 'public');
        $user->avatar_path = $path;
        $user->save();

        // user → inclut avatar_url grâce à l’appends
        return response()->json([
            'user'       => $user->refresh(),
            'avatar_url' => url(Storage::url($path)),
        ]);
    }

    public function destroyAvatar(Request $r)
    {
        $user = $r->user();
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
            $user->avatar_path = null;
            $user->save();
        }
        return response()->json(['user' => $user->refresh()]);
    }
}
