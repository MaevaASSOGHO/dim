<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model {
    protected $fillable = [
        'destination_id','title','price','currency',
        'status','summary','cover_url',
        'duration_days','min_persons','max_persons','cities','rating','ratings_count'
    ];
     protected $casts = [
        'rating' => 'decimal:1',
    ];

    /**
     * Accesseur pour obtenir la plage de personnes
     */
    public function getPersonsRangeAttribute(): string
    {
        return "{$this->min_persons} à {$this->max_persons} personnes";
    }

    /**
     * Accesseur pour obtenir la liste des villes sous forme de tableau
     */
    public function getCitiesArrayAttribute(): array
    {
        return explode(',', $this->cities);
    }

    /**
     * Mutateur pour définir les villes
     */
    public function setCitiesAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['cities'] = implode(',', $value);
        } else {
            $this->attributes['cities'] = $value;
        }
    }
    public function destination(){ return $this->belongsTo(Destination::class); }
}
