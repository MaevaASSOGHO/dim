<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        // Seeders pour les 4 entités principales
        $this->call(DestinationSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(AccommodationSeeder::class);
        $this->call(TourismPackageSeeder::class);
        
        // Garder le DemoSeeder pour les données de test
        $this->call(DemoSeeder::class);
    }
}
