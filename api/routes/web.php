<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SimpleDestinationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\SimpleTourismPackageController;
use App\Http\Controllers\TestController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-api', function () {
    return response()->json(['message' => 'API test route works']);
});

// Routes API
Route::prefix('api')->group(function () {
    // Destinations
    Route::get('/destinations', [SimpleDestinationController::class,'index']);

    // Events
    Route::get('/events', [EventController::class,'index']);
    Route::get('/events/featured', [EventController::class,'featured']);
    Route::get('/events/upcoming', [EventController::class,'upcoming']);
    Route::get('/events/categories', [EventController::class,'categories']);
    Route::get('/events/{event}', [EventController::class,'show']);
    Route::post('/events', [EventController::class,'store']);
    Route::put('/events/{event}', [EventController::class,'update']);
    Route::delete('/events/{event}', [EventController::class,'destroy']);

    // Accommodations
    Route::get('/accommodations', [AccommodationController::class,'index']);
    Route::get('/accommodations/featured', [AccommodationController::class,'featured']);
    Route::get('/accommodations/types', [AccommodationController::class,'types']);
    Route::get('/accommodations/amenities', [AccommodationController::class,'amenities']);
    Route::get('/accommodations/{accommodation}', [AccommodationController::class,'show']);
    Route::post('/accommodations', [AccommodationController::class,'store']);
    Route::put('/accommodations/{accommodation}', [AccommodationController::class,'update']);
    Route::delete('/accommodations/{accommodation}', [AccommodationController::class,'destroy']);

    // Tourism Packages
    Route::get('/tourism-packages', [SimpleTourismPackageController::class,'index']);
    Route::get('/tourism-packages/featured', [SimpleTourismPackageController::class,'featured']);
    Route::get('/tourism-packages/categories', [SimpleTourismPackageController::class,'categories']);
    Route::get('/tourism-packages/{tourismPackage}', [SimpleTourismPackageController::class,'show']);
    Route::post('/tourism-packages', [SimpleTourismPackageController::class,'store']);
    Route::put('/tourism-packages/{tourismPackage}', [SimpleTourismPackageController::class,'update']);
    Route::delete('/tourism-packages/{tourismPackage}', [SimpleTourismPackageController::class,'destroy']);

    // Test Route
    Route::get('/test/destinations', [TestController::class, 'destinations']);
});
