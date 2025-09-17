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
        'country' => 'Cote d\'Ivoire',
        'city' => 'Abidjan',
        'description' => 'Capitale economique, lagune Ebrie, Plateau, Cocody...',
        'image_url' => 'https://example.com/abidjan.jpg',
        'price' => 150000.00,
        'duration_days' => 3,
        'min_persons' => 1,
        'max_persons' => 10,
        'highlights' => 'Lagune Ebrie, Plateau, Cocody, Yopougon, Marcory',
        'rating' => 4.5,
        'ratings_count' => 25,
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
        'summary' => 'Decouverte de la ville, gastronomie, plages.',
        'cover_url' => 'https://example.com/abj-cover.jpg',
        'duration_days' => 3,
        'min_persons' => 1,
        'max_persons' => 20,
        'cities' => 'Abidjan, Plateau, Cocody, Yopougon',
        'rating' => 4.2,
        'ratings_count' => 15,
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
