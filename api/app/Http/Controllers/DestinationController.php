<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $r) {
        $q = $r->query('q','');
        $pageSize = min((int)$r->query('pageSize',20), 100);

        $query = Destination::query()
            ->when($q, fn($qq)=>$qq->where(function($w) use($q){
                $w->where('name','like',"%$q%")
                  ->orWhere('city','like',"%$q%")
                  ->orWhere('country','like',"%$q%");
            }))
            ->orderBy('name');

        $p = $query->paginate($pageSize)->appends($r->query());
        return response()->json([
            'data'=>$p->items(), 'page'=>$p->currentPage(),
            'pageSize'=>$p->perPage(), 'total'=>$p->total(), 'totalPages'=>$p->lastPage(),
        ]);
    }

    public function show(Destination $destination) {
        return response()->json(['data'=>$destination->load('trips')]);
    }
}
