<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TourismPackage;

class TourismPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Circuit Decouverte',
                'description' => 'Tour complet des principales attractions de Cote d\'Ivoire',
                'duration' => '7 jours',
                'price' => 450000.00,
                'image_url' => '/gagnoa-danse-traditionnelle.jpg',
                'category' => 'Culturel',
                'highlights' => 'Abidjan, Yamoussoukro, Grand-Bassam, Bouake',
                'rating' => 4.8,
                'ratings_count' => 89,
                'group_size' => '4-12 personnes',
                'featured' => true,
            ],
            [
                'name' => 'Aventure Nature',
                'description' => 'Exploration des parcs nationaux et reserves naturelles',
                'duration' => '5 jours',
                'price' => 380000.00,
                'image_url' => '/Massif-de-Denguele.jpg',
                'category' => 'Nature',
                'highlights' => 'Parc de Tai, Parc de la Comoé, Reserve d\'Azagny',
                'rating' => 4.6,
                'ratings_count' => 67,
                'group_size' => '2-8 personnes',
                'featured' => false,
            ],
            [
                'name' => 'Detente Cotiere',
                'description' => 'Sejour relaxant sur les plus belles plages du pays',
                'duration' => '4 jours',
                'price' => 320000.00,
                'image_url' => '/la-baie-des-sirenes.jpg',
                'category' => 'Plage',
                'highlights' => 'San Pedro, Sassandra, Grand-Bereby',
                'rating' => 4.9,
                'ratings_count' => 123,
                'group_size' => '2-6 personnes',
                'featured' => true,
            ],
            [
                'name' => 'Patrimoine Historique',
                'description' => 'Voyage a travers l\'histoire et la culture ivoirienne',
                'duration' => '3 jours',
                'price' => 250000.00,
                'image_url' => '/assinie-6.jpg',
                'category' => 'Historique',
                'highlights' => 'Grand-Bassam, Kong, Bondoukou',
                'rating' => 4.5,
                'ratings_count' => 45,
                'group_size' => '2-15 personnes',
                'featured' => false,
            ],
        ];

        foreach ($packages as $packageData) {
            TourismPackage::create($packageData);
        }
    }
}
