<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $abj = \App\Models\Destination::create([
        'name' => 'Abidjan',
        'country' => 'Côte d’Ivoire',
        'city' => 'Abidjan',
        'description' => 'Capitale économique, lagune Ébrié, Plateau, Cocody…',
        'image_url' => 'https://example.com/abidjan.jpg',
    ]);

    $trip = \App\Models\Trip::create([
        'destination_id' => $abj->id,
        'title' => 'Weekend à Abidjan',
        'slug' => 'weekend-a-abidjan',
        'start_date' => now()->addDays(10),
        'end_date' => now()->addDays(12),
        'price' => 120000,
        'currency' => 'XOF',
        'seats_total' => 20,
        'seats_left' => 20,
        'status' => 'available',
        'summary' => 'Découverte de la ville, gastronomie, plages.',
        'cover_url' => 'https://example.com/abj-cover.jpg',
    ]);

    $booking = \App\Models\Booking::create([
        'trip_id' => $trip->id,
        'user_id' => null,
        'reference' => 'REF-' . strtoupper(uniqid()),
        'full_name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'phone' => '0123456789',
        'seats' => 2,
        'amount_total' => $trip->price * 2,
        'status' => 'pending',
    ]);
    }
}
