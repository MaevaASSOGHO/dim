<?php

use App\Http\Controllers\AccomodationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordResetController;


Route::middleware('api')->group(function () {
    // Auth
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::post('/me/avatar',   [ProfileController::class, 'updateAvatar']);
    Route::delete('/me/avatar', [ProfileController::class, 'destroyAvatar']); // optionnel
    Route::apiResource('accomodation', AccomodationController::class);
});

    Route::post('/forgot-password', [PasswordResetController::class, 'sendLink'])
        ->middleware('api');
    Route::post('/reset-password',  [PasswordResetController::class, 'reset'])
        ->middleware('api');

        
    // Destinations
    Route::get('/destinations', [DestinationController::class,'index']);
    Route::get('/destinations/{destination}', [DestinationController::class,'show']);


    // Trips
    Route::get('/trips', [TripController::class,'index']);
    Route::get('/trips/{idOrSlug}', [TripController::class,'show']);
    Route::post('/trips', [TripController::class,'store']);
    Route::put('/trips/{trip}', [TripController::class,'update']);
    Route::delete('/trips/{trip}', [TripController::class,'destroy']);


    // Bookings
    Route::post('/bookings', [BookingController::class,'store']);
    Route::get('/bookings/{booking}', [BookingController::class,'show']);

});

