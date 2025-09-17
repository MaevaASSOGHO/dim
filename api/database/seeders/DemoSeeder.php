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
            'price' => 0,               // prix du séjour
            'duration_days' => 3,       // durée du séjour en jours
            'min_persons' => 1,         // nombre minimum de personnes
            'max_persons' => 10,        // nombre maximum de personnes
            'highlights' => 'Plages, gastronomie, vie nocturne', // points forts
            'rating' => 0.0,            // note moyenne initiale
            'ratings_count' => 0,       // nombre d’évaluations initial

        ]);


        $trip = \App\Models\Trip::create([
            'destination_id' => 1,
            'title' => 'Weekend à Abidjan',
            'slug' => 'weekend-a-abidjan',
            'start_date' => '2025-09-27 00:12:47',
            'end_date' => '2025-09-29 00:12:47',
            'price' => 120000,
            'currency' => 'XOF',
            'seats_total' => 20,
            'seats_left' => 20,
            'status' => 'available',
            'summary' => 'Découverte de la ville, gastronomie, plages.',
            'cover_url' => 'https://example.com/abj-cover.jpg',
            'duration_days' => 2, // 👈 ajouter la valeur
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
