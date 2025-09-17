<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model {
    protected $fillable = ['name','country','city','description','long_description','image_url','price','duration_days','min_persons',
                            'max_persons','highlights','rating','ratings_count','category','group_size'];
                            
    public function trips(){ return $this->hasMany(Trip::class); }

    protected $casts = [
        'price' => 'decimal:2',
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
     * Accesseur pour formater le prix
     */
    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->price, 2, ',', ' ') . ' €';
    }
}
