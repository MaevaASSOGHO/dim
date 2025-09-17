<?php

namespace App\Http\Controllers;

use App\Models\TourismPackage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TourismPackageController extends Controller
{
    /**
     * Récupérer tous les packages de tourisme avec filtres
     */
    public function index(Request $request): JsonResponse
    {
        $query = TourismPackage::query();

        // Filtre par catégorie
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filtre par prix minimum
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        // Filtre par prix maximum
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filtre par note minimum
        if ($request->has('min_rating')) {
            $query->where('rating', '>=', $request->min_rating);
        }

        // Filtre par durée
        if ($request->has('duration')) {
            $query->where('duration', 'like', "%{$request->duration}%");
        }

        // Recherche par nom ou description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('highlights', 'like', "%{$search}%");
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 12);
        $packages = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Packages de tourisme récupérés avec succès'
        ]);
    }

    /**
     * Récupérer un package de tourisme par ID
     */
    public function show($id): JsonResponse
    {
        $package = TourismPackage::find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package de tourisme non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package de tourisme récupéré avec succès'
        ]);
    }

    /**
     * Récupérer les packages mis en avant
     */
    public function featured(): JsonResponse
    {
        $packages = TourismPackage::where('featured', true)
            ->orderBy('rating', 'desc')
            ->limit(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $packages,
            'message' => 'Packages mis en avant récupérés avec succès'
        ]);
    }

    /**
     * Récupérer les catégories disponibles
     */
    public function categories(): JsonResponse
    {
        $categories = TourismPackage::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->map(function ($category) {
                return [
                    'id' => $category,
                    'label' => $category,
                    'count' => TourismPackage::where('category', $category)->count()
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Catégories récupérées avec succès'
        ]);
    }

    /**
     * Créer un nouveau package de tourisme (admin)
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:100',
            'highlights' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'ratings_count' => 'nullable|integer|min:0',
            'group_size' => 'nullable|string|max:100',
            'featured' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $package = TourismPackage::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package de tourisme créé avec succès'
        ], 201);
    }

    /**
     * Mettre à jour un package de tourisme (admin)
     */
    public function update(Request $request, $id): JsonResponse
    {
        $package = TourismPackage::find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package de tourisme non trouvé'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'duration' => 'nullable|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'image_url' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:100',
            'highlights' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'ratings_count' => 'nullable|integer|min:0',
            'group_size' => 'nullable|string|max:100',
            'featured' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $package->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $package,
            'message' => 'Package de tourisme mis à jour avec succès'
        ]);
    }

    /**
     * Supprimer un package de tourisme (admin)
     */
    public function destroy($id): JsonResponse
    {
        $package = TourismPackage::find($id);

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package de tourisme non trouvé'
            ], 404);
        }

        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Package de tourisme supprimé avec succès'
        ]);
    }
}
