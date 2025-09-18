<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class SimpleTourismPackageController extends Controller
{
    /**
     * Récupérer tous les packages de tourisme
     */
    public function index(): JsonResponse
    {
        $packages = [
            [
                "id" => 1,
                "name" => "Circuit Découverte",
                "description" => "Tour complet des principales attractions de Côte d'Ivoire",
                "duration" => "7 jours",
                "price" => "450 000 FCFA",
                "image" => "/gagnoa-danse-traditionnelle.jpg",
                "category" => "Culturel",
                "highlights" => ["Abidjan", "Yamoussoukro", "Grand-Bassam", "Bouaké"],
                "rating" => 4.8,
                "groupSize" => "4-12 personnes",
            ],
            [
                "id" => 2,
                "name" => "Aventure Nature",
                "description" => "Exploration des parcs nationaux et réserves naturelles",
                "duration" => "5 jours",
                "price" => "320 000 FCFA",
                "image" => "/assinie-6.jpg",
                "category" => "Nature",
                "highlights" => ["Parc National de Taï", "Réserve de Lamto", "Cascades de Man"],
                "rating" => 4.6,
                "groupSize" => "2-8 personnes",
            ],
            [
                "id" => 3,
                "name" => "Séjour Plage",
                "description" => "Détente sur les plus belles plages de Côte d'Ivoire",
                "duration" => "4 jours",
                "price" => "280 000 FCFA",
                "image" => "/la-baie-des-sirenes.jpg",
                "category" => "Détente",
                "highlights" => ["Assinie", "Grand-Bassam", "San-Pédro"],
                "rating" => 4.7,
                "groupSize" => "2-6 personnes",
            ],
            [
                "id" => 4,
                "name" => "Expédition Montagne",
                "description" => "Randonnée et découverte des montagnes de l'ouest",
                "duration" => "6 jours",
                "price" => "380 000 FCFA",
                "image" => "/sculpture-koko.jpg",
                "category" => "Aventure",
                "highlights" => ["Mont Nimba", "Man", "Danané", "Touba"],
                "rating" => 4.9,
                "groupSize" => "3-10 personnes",
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $packages,
        ]);
    }

    /**
     * Récupérer les packages en vedette
     */
    public function featured(): JsonResponse
    {
        $packages = [
            [
                "id" => 1,
                "name" => "Circuit Découverte",
                "description" => "Tour complet des principales attractions de Côte d'Ivoire",
                "duration" => "7 jours",
                "price" => "450 000 FCFA",
                "image" => "/gagnoa-danse-traditionnelle.jpg",
                "category" => "Culturel",
                "highlights" => ["Abidjan", "Yamoussoukro", "Grand-Bassam", "Bouaké"],
                "rating" => 4.8,
                "groupSize" => "4-12 personnes",
            ],
            [
                "id" => 4,
                "name" => "Expédition Montagne",
                "description" => "Randonnée et découverte des montagnes de l'ouest",
                "duration" => "6 jours",
                "price" => "380 000 FCFA",
                "image" => "/sculpture-koko.jpg",
                "category" => "Aventure",
                "highlights" => ["Mont Nimba", "Man", "Danané", "Touba"],
                "rating" => 4.9,
                "groupSize" => "3-10 personnes",
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $packages,
        ]);
    }

    /**
     * Récupérer les catégories de packages
     */
    public function categories(): JsonResponse
    {
        $categories = [
            ["id" => "Culturel", "label" => "Culturels", "count" => 1],
            ["id" => "Nature", "label" => "Nature", "count" => 1],
            ["id" => "Aventure", "label" => "Aventure", "count" => 1],
            ["id" => "Détente", "label" => "Détente", "count" => 1],
        ];

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Récupérer un package spécifique
     */
    public function show($id): JsonResponse
    {
        $packages = [
            1 => [
                "id" => 1,
                "name" => "Circuit Découverte",
                "description" => "Tour complet des principales attractions de Côte d'Ivoire",
                "duration" => "7 jours",
                "price" => "450 000 FCFA",
                "image" => "/gagnoa-danse-traditionnelle.jpg",
                "category" => "Culturel",
                "highlights" => ["Abidjan", "Yamoussoukro", "Grand-Bassam", "Bouaké"],
                "rating" => 4.8,
                "groupSize" => "4-12 personnes",
            ],
        ];

        $package = $packages[$id] ?? null;

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package de tourisme non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
        ]);
    }

    /**
     * Créer un nouveau package
     */
    public function store(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Fonctionnalité non implémentée'
        ], 501);
    }

    /**
     * Mettre à jour un package
     */
    public function update(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Fonctionnalité non implémentée'
        ], 501);
    }

    /**
     * Supprimer un package
     */
    public function destroy(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Fonctionnalité non implémentée'
        ], 501);
    }
}
