<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Destination;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'Abidjan',
                'country' => 'Cote d\'Ivoire',
                'city' => 'Abidjan',
                'description' => 'Metropole moderne, centre economique et culturel ivoirien',
                'long_description' => 'Decouvrez la capitale economique avec ses gratte-ciels, ses marches animes et sa vie nocturne vibrante.',
                'image_url' => '/1659cc75227694996edfedee430cb4a4_XL.jpg',
                'price' => 120000.00,
                'duration_days' => 3,
                'min_persons' => 2,
                'max_persons' => 8,
                'highlights' => 'Plateau des affaires, Marche de Cocody, Lagune Ebrie',
                'rating' => 4.8,
                'ratings_count' => 156,
                'category' => 'ville',
                'group_size' => '2-8 personnes',
            ],
            [
                'name' => 'Yamoussoukro',
                'country' => 'Cote d\'Ivoire',
                'city' => 'Yamoussoukro',
                'description' => 'Capitale politique avec la majestueuse Basilique Notre-Dame',
                'long_description' => 'Visitez la capitale politique et admirez la plus grande basilique du monde.',
                'image_url' => '/sculpture-koko.jpg',
                'price' => 85000.00,
                'duration_days' => 2,
                'min_persons' => 2,
                'max_persons' => 12,
                'highlights' => 'Basilique Notre-Dame, Palais presidentiel, Lac aux crocodiles',
                'rating' => 4.6,
                'ratings_count' => 89,
                'category' => 'culturel',
                'group_size' => '2-12 personnes',
            ],
            [
                'name' => 'Bouake',
                'country' => 'Cote d\'Ivoire',
                'city' => 'Bouake',
                'description' => 'Ville marchande, carrefour culturel au centre du pays',
                'long_description' => 'Explorez le cœur commercial de la Cote d\'Ivoire et sa riche culture.',
                'image_url' => '/Bouaké_Collage.jpg',
                'price' => 95000.00,
                'duration_days' => 2,
                'min_persons' => 2,
                'max_persons' => 10,
                'highlights' => 'Grand marche, Centre culturel, Artisanat local',
                'rating' => 4.4,
                'ratings_count' => 67,
                'category' => 'culturel',
                'group_size' => '2-10 personnes',
            ],
            [
                'name' => 'San Pedro',
                'country' => 'Cote d\'Ivoire',
                'city' => 'San Pedro',
                'description' => 'Port actif et belles plages au sud-ouest ivoirien',
                'long_description' => 'Detendez-vous sur les plus belles plages de Cote d\'Ivoire.',
                'image_url' => '/San-Pedro-Balmer.jpg',
                'price' => 110000.00,
                'duration_days' => 4,
                'min_persons' => 2,
                'max_persons' => 6,
                'highlights' => 'Plages de sable fin, Port de peche, Parc national',
                'rating' => 4.9,
                'ratings_count' => 134,
                'category' => 'plage',
                'group_size' => '2-6 personnes',
            ],
            [
                'name' => 'Grand-Bassam',
                'country' => 'Cote d\'Ivoire',
                'city' => 'Grand-Bassam',
                'description' => 'Ancienne capitale coloniale, patrimoine UNESCO',
                'long_description' => 'Plongez dans l\'histoire coloniale de la Cote d\'Ivoire.',
                'image_url' => '/assinie-6.jpg',
                'price' => 75000.00,
                'duration_days' => 1,
                'min_persons' => 2,
                'max_persons' => 15,
                'highlights' => 'Architecture coloniale, Musee national, Plage de Grand-Bassam',
                'rating' => 4.7,
                'ratings_count' => 98,
                'category' => 'culturel',
                'group_size' => '2-15 personnes',
            ],
            [
                'name' => 'Parc de Tai',
                'country' => 'Cote d\'Ivoire',
                'city' => 'Tai',
                'description' => 'Foret tropicale primaire, reserve de biosphere UNESCO',
                'long_description' => 'Aventure dans l\'une des dernieres forets primaires d\'Afrique de l\'Ouest.',
                'image_url' => '/Massif-de-Denguele.jpg',
                'price' => 180000.00,
                'duration_days' => 5,
                'min_persons' => 4,
                'max_persons' => 8,
                'highlights' => 'Faune sauvage, Foret primaire, Ecotourisme',
                'rating' => 4.5,
                'ratings_count' => 45,
                'category' => 'nature',
                'group_size' => '4-8 personnes',
            ],
        ];

        foreach ($destinations as $destinationData) {
            Destination::create($destinationData);
        }
    }
}
