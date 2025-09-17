<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Accommodation;

class AccommodationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accommodations = [
            [
                'name' => 'Hotel Ivoire InterContinental',
                'description' => 'Luxueux hotel 5 etoiles au cœur du Plateau avec vue panoramique sur la lagune',
                'location' => 'Abidjan, Plateau',
                'room_count' => 250,
                'price_per_night' => 85000.00,
                'image_url' => '/1659cc75227694996edfedee430cb4a4_XL.jpg',
                'type' => 'hotel',
                'rating' => 4.8,
                'reviews_count' => 324,
                'amenities' => 'Wifi, Piscine, Restaurant, Spa, Parking, Climatisation',
                'rooms' => '250 chambres',
                'featured' => true,
                'gallery' => '["/1659cc75227694996edfedee430cb4a4_XL.jpg", "/assinie-6.jpg", "/la-baie-des-sirenes.jpg"]',
            ],
            [
                'name' => 'Residence Les Cocotiers',
                'description' => 'Appartements meubles dans un cadre tropical avec jardin et piscine',
                'location' => 'Grand-Bassam',
                'room_count' => 24,
                'price_per_night' => 45000.00,
                'image_url' => '/assinie-6.jpg',
                'type' => 'residence',
                'rating' => 4.6,
                'reviews_count' => 156,
                'amenities' => 'Wifi, Piscine, Jardin, Parking, Cuisine equipee, Climatisation',
                'rooms' => '24 appartements',
                'featured' => true,
                'gallery' => '["/assinie-6.jpg", "/la-baie-des-sirenes.jpg", "/Massif-de-Denguele.jpg"]',
            ],
            [
                'name' => 'Auberge du Parc Tai',
                'description' => 'Hebergement ecologique au cœur de la foret primaire',
                'location' => 'Parc National de Tai',
                'room_count' => 12,
                'price_per_night' => 25000.00,
                'image_url' => '/Massif-de-Denguele.jpg',
                'type' => 'auberge',
                'rating' => 4.4,
                'reviews_count' => 89,
                'amenities' => 'Restaurant, Guide nature, Randonnee, Observation faune, Parking',
                'rooms' => '12 bungalows',
                'featured' => false,
                'gallery' => '["/Massif-de-Denguele.jpg", "/pont-arcade-de-Tiassale.jpg", "/Fleuve traversant le parc National de la comoé.jpg"]',
            ],
            [
                'name' => 'Villa Assinie Paradise',
                'description' => 'Villa privee en bord de mer avec acces direct a la plage',
                'location' => 'Assinie-Mafia',
                'room_count' => 4,
                'price_per_night' => 120000.00,
                'image_url' => '/assinie-6.jpg',
                'type' => 'villa',
                'rating' => 4.9,
                'reviews_count' => 67,
                'amenities' => 'Plage privee, Piscine, Wifi, Cuisine equipee, Jardin, Parking',
                'rooms' => '4 chambres',
                'featured' => true,
                'gallery' => '["/la-baie-des-sirenes.jpg", "/assinie-6.jpg", "/San-Pedro-Balmer.jpg"]',
            ],
            [
                'name' => 'Hotel des Cascades',
                'description' => 'Hotel boutique pres des chutes de la Comoé',
                'location' => 'Man, Region des Montagnes',
                'room_count' => 18,
                'price_per_night' => 35000.00,
                'image_url' => '/CascadeMan.jpg',
                'type' => 'hotel',
                'rating' => 4.5,
                'reviews_count' => 134,
                'amenities' => 'Restaurant, Wifi, Randonnee, Vue montagne, Parking, Climatisation',
                'rooms' => '18 chambres',
                'featured' => false,
                'gallery' => '["/Massif-de-Denguele.jpg", "/pont-arcade-de-Tiassale.jpg", "/Fleuve traversant le parc National de la comoé.jpg"]',
            ],
            [
                'name' => 'Gite Traditionnel Baoule',
                'description' => 'Hebergement authentique dans un village traditionnel baoule',
                'location' => 'Bouake, Centre',
                'room_count' => 8,
                'price_per_night' => 20000.00,
                'image_url' => '/gagnoa-danse-traditionnelle.jpg',
                'type' => 'gite',
                'rating' => 4.3,
                'reviews_count' => 78,
                'amenities' => 'Cuisine locale, Artisanat, Danse traditionnelle, Parking, Jardin',
                'rooms' => '8 chambres',
                'featured' => false,
                'gallery' => '["/Massif-de-Denguele.jpg", "/pont-arcade-de-Tiassale.jpg", "/Fleuve traversant le parc National de la comoé.jpg"]',
            ],
        ];

        foreach ($accommodations as $accommodationData) {
            Accommodation::create($accommodationData);
        }
    }
}
