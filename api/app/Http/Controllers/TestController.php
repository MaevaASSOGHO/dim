<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    public function destinations(): JsonResponse
    {
        try {
            $destinations = Destination::all();
            return response()->json([
                'success' => true,
                'data' => $destinations,
                'count' => $destinations->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
