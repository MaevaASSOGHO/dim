<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    protected $fillable = [
        'trip_id','destination_id','accommodation_id','user_id','reference',
        'full_name','email','phone','seats','amount_total','status'
    ];
    public function user(){ return $this->belongsTo(User::class); }
    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }

    /**
     * Relation avec le modèle Destination
     */
    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Relation avec le modèle Accommodation
     */
    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }

    /**
     * Accesseur pour le statut formaté
     */
    public function getFormattedStatusAttribute(): string
    {
        $statuses = [
            'pending' => 'En attente',
            'paid' => 'Payé',
            'cancelled' => 'Annulé'
        ];

        return $statuses[$this->status] ?? $this->status;
    }

    /**
     * Accesseur pour le montant formaté
     */
    public function getFormattedAmountAttribute(): string
    {
        return number_format($this->amount_total, 2, ',', ' ') . ' €';
    }
}

