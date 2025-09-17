<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccomodationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'accommodation_id' => $this->accommodation_id,
            'name' => $this->name,
            'description' => $this->description,
            'location' => $this->location,
            'room_count' => $this->room_count,
            'reviews_count' => $this->reviews_count,
            'amenities' => $this->amenities ? explode(',', $this->amenities) : [],
            'price_per_night' => $this->price_per_night,
            'rating' => $this->rating,
        ];
    }
}
