<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'name' => 'Festival des Masques de Man',
                'description' => 'Celebration traditionnelle des masques sacres dans la region montagneuse',
                'start_date' => Carbon::create(2025, 3, 15),
                'end_date' => Carbon::create(2025, 3, 17),
                'city' => 'Man',
                'location' => 'Man, Region des Montagnes',
                'price' => 25000.00,
                'image_url' => '/sculpture-koko.jpg',
                'category' => 'culturel',
                'duration' => '3 jours',
                'expected_attendees' => 500,
                'highlights' => 'Danses traditionnelles, Artisanat local, Gastronomie Dan',
                'rating' => 4.9,
                'ratings_count' => 89,
                'featured' => true,
            ],
            [
                'name' => 'Abissa d\'Abidjan',
                'description' => 'Grande fete traditionnelle N\'Zima marquant la fin de l\'annee',
                'start_date' => Carbon::create(2025, 10, 25),
                'end_date' => Carbon::create(2025, 10, 31),
                'city' => 'Grand-Bassam',
                'location' => 'Grand-Bassam',
                'price' => 15000.00,
                'image_url' => '/assinie-6.jpg',
                'category' => 'culturel',
                'duration' => '7 jours',
                'expected_attendees' => 2000,
                'highlights' => 'Processions, Musique traditionnelle, Purification',
                'rating' => 4.8,
                'ratings_count' => 156,
                'featured' => true,
            ],
            [
                'name' => 'Festival de Jazz d\'Abidjan',
                'description' => 'Rendez-vous incontournable des amateurs de jazz en Afrique de l\'Ouest',
                'start_date' => Carbon::create(2025, 4, 20),
                'end_date' => Carbon::create(2025, 4, 25),
                'city' => 'Abidjan',
                'location' => 'Abidjan, Plateau',
                'price' => 35000.00,
                'image_url' => '/1659cc75227694996edfedee430cb4a4_XL.jpg',
                'category' => 'musical',
                'duration' => '5 jours',
                'expected_attendees' => 1500,
                'highlights' => 'Artistes internationaux, Concerts nocturnes, Master classes',
                'rating' => 4.7,
                'ratings_count' => 234,
                'featured' => false,
            ],
            [
                'name' => 'Fete du Dipri',
                'description' => 'Rituel de purification et de renouveau du peuple Abidji',
                'start_date' => Carbon::create(2025, 4, 10),
                'end_date' => Carbon::create(2025, 4, 12),
                'city' => 'Gomon',
                'location' => 'Gomon, pres d\'Abidjan',
                'price' => 20000.00,
                'image_url' => '/gagnoa-danse-traditionnelle.jpg',
                'category' => 'culturel',
                'duration' => '3 jours',
                'expected_attendees' => 800,
                'highlights' => 'Ceremonie nocturne, Danses rituelles, Tradition ancestrale',
                'rating' => 4.6,
                'ratings_count' => 67,
                'featured' => false,
            ],
            [
                'name' => 'Festival Reggae de Bouake',
                'description' => 'Celebration de la musique reggae et de la culture rastafari',
                'start_date' => Carbon::create(2025, 6, 5),
                'end_date' => Carbon::create(2025, 6, 7),
                'city' => 'Bouake',
                'location' => 'Bouake, Centre',
                'price' => 30000.00,
                'image_url' => '/Bouaké_Collage.jpg',
                'category' => 'musical',
                'duration' => '3 jours',
                'expected_attendees' => 3000,
                'highlights' => 'Concerts live, Sound systems, Village rastafari',
                'rating' => 4.5,
                'ratings_count' => 189,
                'featured' => false,
            ],
            [
                'name' => 'Salon du Chocolat d\'Abidjan',
                'description' => 'Decouverte du cacao ivoirien et de ses transformations',
                'start_date' => Carbon::create(2025, 11, 12),
                'end_date' => Carbon::create(2025, 11, 15),
                'city' => 'Abidjan',
                'location' => 'Abidjan, Sofitel',
                'price' => 10000.00,
                'image_url' => '/image-AM-423-424-page-72-73.jpg',
                'category' => 'gastronomique',
                'duration' => '4 jours',
                'expected_attendees' => 1000,
                'highlights' => 'Degustation, Ateliers, Rencontres producteurs',
                'rating' => 4.4,
                'ratings_count' => 123,
                'featured' => false,
            ],
        ];

        foreach ($events as $eventData) {
            Event::create($eventData);
        }
    }
}
