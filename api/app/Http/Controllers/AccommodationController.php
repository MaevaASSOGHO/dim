<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class AccommodationController extends Controller
{
    public function index(): JsonResponse
    {
        $accommodations = [
            [
                "id" => 1,
                "name" => "Hôtel Ivoire InterContinental",
                "description" => "Luxueux hôtel 5 étoiles au cœur du Plateau avec vue panoramique sur la lagune",
                "location" => "Abidjan, Plateau",
                "price" => "85 000 FCFA",
                "pricePerNight" => true,
                "image" => "/1659cc75227694996edfedee430cb4a4_XL.jpg",
                "type" => "hotel",
                "rating" => 4.8,
                "reviews" => 324,
                "amenities" => ["Wifi", "Piscine", "Restaurant", "Spa", "Parking", "Climatisation"],
                "rooms" => "250 chambres",
                "featured" => true,
                "gallery" => ["/1659cc75227694996edfedee430cb4a4_XL.jpg", "/assinie-6.jpg"],
            ],
            [
                "id" => 2,
                "name" => "Résidence Les Cocotiers",
                "description" => "Résidence moderne avec piscine et jardin tropical",
                "location" => "Cocody, Abidjan",
                "price" => "45 000 FCFA",
                "pricePerNight" => true,
                "image" => "/assinie-6.jpg",
                "type" => "residence",
                "rating" => 4.5,
                "reviews" => 156,
                "amenities" => ["Wifi", "Piscine", "Cuisine équipée", "Parking", "Climatisation"],
                "rooms" => "12 appartements",
                "featured" => false,
                "gallery" => ["/assinie-6.jpg"],
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $accommodations,
        ]);
    }

    public function featured(): JsonResponse
    {
        return $this->index();
    }

    public function types(): JsonResponse
    {
        $types = [
            ["id" => "hotel", "label" => "Hôtels", "count" => 1],
            ["id" => "residence", "label" => "Résidences", "count" => 1],
        ];

        return response()->json([
            'success' => true,
            'data' => $types,
        ]);
    }

    public function amenities(): JsonResponse
    {
        $amenities = ["Wifi", "Piscine", "Restaurant", "Spa", "Parking", "Climatisation"];

        return response()->json([
            'success' => true,
            'data' => $amenities,
        ]);
    }

    public function show($id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => ['id' => $id, 'name' => 'Test Accommodation'],
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
