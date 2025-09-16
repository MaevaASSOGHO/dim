<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'event_id';

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'city',
        'expected_attendees',
        'highlights',
        'price',
        'rating',
        'ratings_count'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    /**
     * Accesseur pour la durée formatée de l'événement
     */
    public function getFormattedDurationAttribute(): string
    {
        $start = $this->start_date->format('d M');
        $end = $this->end_date->format('d M Y');

        return "Du $start au $end";
    }

    /**
     * Accesseur pour obtenir les points forts sous forme de tableau
     */
    public function getHighlightsArrayAttribute(): array
    {
        return explode(',', $this->highlights);
    }

    /**
     * Mutateur pour définir les points forts
     */
    public function setHighlightsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['highlights'] = implode(',', $value);
        } else {
            $this->attributes['highlights'] = $value;
        }
    }

    /**
     * Accesseur pour le prix formaté
     */
    public function getFormattedPriceAttribute(): string
    {
        if ($this->price == 0) {
            return 'Gratuit';
        }

        return number_format($this->price, 2, ',', ' ') . ' €';
    }

    /**
     * Vérifie si l'événement est gratuit
     */
    public function getIsFreeAttribute(): bool
    {
        return $this->price == 0;
    }
}
