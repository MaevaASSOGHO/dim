<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TripController extends Controller
{
    public function index(Request $r) {
        $q          = $r->query('q','');
        $status     = $r->query('status','');         // planned|available|full|cancelled
        $destId     = $r->query('destinationId','');  // filtre destination
        $dateFrom   = $r->query('dateFrom');
        $dateTo     = $r->query('dateTo');
        $minPrice   = $r->query('minPrice');
        $maxPrice   = $r->query('maxPrice');
        $pageSize   = min((int)$r->query('pageSize',20), 100);

        $query = Trip::with('destination')
            ->when($q, fn($qq)=>$qq->where('title','like',"%$q%"))
            ->when($status, fn($qq)=>$qq->where('status',$status))
            ->when($destId, fn($qq)=>$qq->where('destination_id',$destId))
            ->when($dateFrom, fn($qq)=>$qq->whereDate('start_date','>=',$dateFrom))
            ->when($dateTo, fn($qq)=>$qq->whereDate('end_date','<=',$dateTo))
            ->when($minPrice, fn($qq)=>$qq->where('price','>=',$minPrice))
            ->when($maxPrice, fn($qq)=>$qq->where('price','<=',$maxPrice))
            ->orderByDesc('created_at');

        $p = $query->paginate($pageSize)->appends($r->query());
        return response()->json([
            'data'=>$p->items(), 'page'=>$p->currentPage(),
            'pageSize'=>$p->perPage(), 'total'=>$p->total(), 'totalPages'=>$p->lastPage(),
        ]);
    }

    public function show($idOrSlug) {
        $trip = Trip::with('destination')
            ->where('id',$idOrSlug)
            ->orWhere('slug',$idOrSlug)
            ->first();

        if(!$trip) return response()->json(['message'=>'Not found'],404);
        return response()->json(['data'=>$trip]);
    }

    public function store(Request $r) {
        $data = $r->validate([
            'destination_id'=>'required|exists:destinations,id',
            'title'=>'required|string',
            'slug'=>'required|string|unique:trips,slug',
            'start_date'=>'nullable|date','end_date'=>'nullable|date|after_or_equal:start_date',
            'price'=>'nullable|numeric','currency'=>'nullable|string|size:3',
            'seats_total'=>'nullable|integer|min:0','seats_left'=>'nullable|integer|min:0',
            'status'=>'nullable|in:planned,available,full,cancelled',
            'summary'=>'nullable|string','details'=>'nullable|string','cover_url'=>'nullable|url'
        ]);
        $trip = Trip::create($data);
        return response()->json(['data'=>$trip],201);
    }

    public function update(Request $r, Trip $trip) {
        $data = $r->validate([
            'destination_id'=>'sometimes|exists:destinations,id',
            'title'=>'sometimes|string',
            'slug'=>"sometimes|string|unique:trips,slug,$trip->id",
            'start_date'=>'nullable|date','end_date'=>'nullable|date|after_or_equal:start_date',
            'price'=>'nullable|numeric','currency'=>'nullable|string|size:3',
            'seats_total'=>'nullable|integer|min:0','seats_left'=>'nullable|integer|min:0',
            'status'=>'nullable|in:planned,available,full,cancelled',
            'summary'=>'nullable|string','details'=>'nullable|string','cover_url'=>'nullable|url'
        ]);
        $trip->update($data);
        return response()->json(['data'=>$trip]);
    }

    public function destroy(Trip $trip) {
        $trip->delete();
        return response()->json(['ok'=>true]);
    }
}
