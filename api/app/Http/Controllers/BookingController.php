<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function store(Request $r) {
        $data = $r->validate([
            'trip_id'=>'required|exists:trips,id',
            'full_name'=>'required|string',
            'email'=>'required|email',
            'phone'=>'nullable|string',
            'seats'=>'required|integer|min:1',
        ]);
        $trip = Trip::findOrFail($data['trip_id']);

        if ($trip->seats_left < $data['seats']) {
            return response()->json(['message'=>'Not enough seats'], 422);
        }

        $amount = $trip->price * $data['seats'];

        $booking = Booking::create([
            ...$data,
            'reference' => strtoupper(Str::random(10)),
            'amount_total' => $amount,
            'status' => 'pending',
        ]);

        // décrémente le stock
        $trip->decrement('seats_left', $data['seats']);

        return response()->json(['data'=>$booking], 201);
    }

    public function show(Booking $booking) {
        return response()->json(['data'=>$booking->load('trip')]);
    }
}
