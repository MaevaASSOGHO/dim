<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = [
            [
                "id" => 1,
                "name" => "Festival des Masques de Man",
                "description" => "Célébration traditionnelle des masques sacrés dans la région montagneuse",
                "date" => "15-17 Mars 2025",
                "location" => "Man, Région des Montagnes",
                "price" => "25 000 FCFA",
                "image" => "/sculpture-koko.jpg",
                "category" => "culturel",
                "duration" => "3 jours",
                "capacity" => "500 personnes",
                "highlights" => ["Danses traditionnelles", "Artisanat local", "Gastronomie Dan"],
                "rating" => 4.9,
                "featured" => true,
            ],
            [
                "id" => 2,
                "name" => "Festival International de Jazz d'Abidjan",
                "description" => "Grande rencontre musicale avec des artistes internationaux",
                "date" => "20-22 Avril 2025",
                "location" => "Abidjan, Palais de la Culture",
                "price" => "35 000 FCFA",
                "image" => "/jazz-festival.jpg",
                "category" => "musical",
                "duration" => "3 jours",
                "capacity" => "2000 personnes",
                "highlights" => ["Concerts internationaux", "Ateliers musicaux", "Jam sessions"],
                "rating" => 4.7,
                "featured" => false,
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    public function featured(): JsonResponse
    {
        return $this->index();
    }

    public function upcoming(): JsonResponse
    {
        return $this->index();
    }

    public function categories(): JsonResponse
    {
        $categories = [
            ["id" => "culturel", "label" => "Culturels", "count" => 1],
            ["id" => "musical", "label" => "Musicaux", "count" => 1],
        ];

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function show($id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => ['id' => $id, 'name' => 'Test Event'],
        ]);
    }

    public function store(): JsonResponse
    {
        return response()->json(['success' => false, 'message' => 'Not implemented'], 501);
    }

    public function update(): JsonResponse
    {
        return response()->json(['success' => false, 'message' => 'Not implemented'], 501);
    }

    public function destroy(): JsonResponse
    {
        return response()->json(['success' => false, 'message' => 'Not implemented'], 501);
    }
}
