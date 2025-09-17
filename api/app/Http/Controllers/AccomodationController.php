<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccomodationResource;
use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AccomodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AccomodationResource::collection(Accommodation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'location' => 'required|string|max:255',
                'room_count' => 'required|integer|min:1',
                'reviews_count' => 'nullable|integer|min:0',
                'amenities' => 'nullable', 
                'price_per_night' => 'required|numeric|min:0',
                'rating' => 'nullable|numeric|min:0|max:5',
            ]);
        } catch (ValidationException $e) {

            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }

        if (!empty($validated['amenities']) && is_array($validated['amenities'])) {
            $validated['amenities'] = implode(',', $validated['amenities']);
        }

        $accommodation = Accommodation::create($validated);

        return response()->json([
            'message' => 'Accommodation created successfully',
            'data' => new AccomodationResource($accommodation)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $accommodation = Accommodation::findOrFail($id);
        return new AccomodationResource($accommodation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|nullable|string',
                'location' => 'sometimes|required|string|max:255',
                'room_count' => 'sometimes|required|integer|min:1',
                'reviews_count' => 'sometimes|nullable|integer|min:0',
                'amenities' => 'sometimes|nullable', 
                'price_per_night' => 'sometimes|required|numeric|min:0',
                'rating' => 'sometimes|nullable|numeric|min:0|max:5',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }

        $accommodation = Accommodation::findOrFail($id);

        // Gérer amenities si tableau
        if (!empty($validated['amenities']) && is_array($validated['amenities'])) {
            $validated['amenities'] = implode(',', $validated['amenities']);
        }

        $accommodation->update($validated);

        return response()->json([
            'message' => 'Accommodation updated successfully',
            'data' => new AccomodationResource($accommodation)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $accommodation = Accommodation::findOrFail($id);
        $accommodation->delete();

        return response()->json([
            'message' => 'Accommodation deleted successfully'
        ], 200);
    }
}
