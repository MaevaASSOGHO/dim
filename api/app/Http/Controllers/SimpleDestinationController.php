<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SimpleDestinationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                [
                    'id' => 1,
                    'name' => 'Abidjan',
                    'description' => 'Métropole moderne, centre économique et culturel ivoirien',
                    'price' => '120 000 FCFA',
                    'image' => '/1659cc75227694996edfedee430cb4a4_XL.jpg',
                    'category' => 'ville',
                    'duration' => '3 jours',
                    'groupSize' => '2-8 personnes',
                    'rating' => 4.8,
                    'highlights' => ['Plateau des affaires', 'Marché de Cocody', 'Lagune Ébrié']
                ],
                [
                    'id' => 2,
                    'name' => 'Grand-Bassam',
                    'description' => 'Première capitale de Côte d\'Ivoire, patrimoine mondial de l\'UNESCO',
                    'price' => '85 000 FCFA',
                    'image' => '/assinie-6.jpg',
                    'category' => 'plage',
                    'duration' => '2 jours',
                    'groupSize' => '2-6 personnes',
                    'rating' => 4.6,
                    'highlights' => ['Architecture coloniale', 'Plages paradisiaques', 'Musée du costume']
                ]
            ]
        ]);
    }
}
