<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    public function destinations(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Test API working',
            'data' => [
                'test' => 'API is working correctly'
            ]
        ]);
    }
}
