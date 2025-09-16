<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $primaryKey = 'accommodation_id';

    protected $fillable = [
        'name',
        'description',
        'location',
        'room_count',
        'reviews_count',
        'amenities',
        'price_per_night',
        'rating'
    ];

    protected $casts = [
        'price_per_night' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    /**
     * Accesseur pour obtenir les équipements sous forme de tableau
     */
    public function getAmenitiesArrayAttribute(): array
    {
        return explode(',', $this->amenities);
    }

    /**
     * Mutateur pour définir les équipements
     */
    public function setAmenitiesAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['amenities'] = implode(',', $value);
        } else {
            $this->attributes['amenities'] = $value;
        }
    }

    /**
     * Accesseur pour le prix formaté par nuit
     */
    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->price_per_night, 2, ',', ' ') . ' €/nuit';
    }

    /**
     * Accesseur pour les étoiles de notation (pleines, demi, vides)
     */
    public function getStarRatingAttribute(): array
    {
        $fullStars = floor($this->rating);
        $halfStar = ($this->rating - $fullStars) >= 0.5;
        $emptyStars = 5 - $fullStars - ($halfStar ? 1 : 0);

        return [
            'full' => $fullStars,
            'half' => $halfStar,
            'empty' => $emptyStars
        ];
    }
}
