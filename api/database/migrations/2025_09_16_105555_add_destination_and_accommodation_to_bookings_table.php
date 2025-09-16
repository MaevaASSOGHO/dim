<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Ajouter les colonnes destination_id et accommodation_id
            $table->foreignId('destination_id')->nullable()->after('trip_id')
                  ->constrained('destinations')->onDelete('set null');

            $table->foreignId('accommodation_id')->nullable()->after('destination_id')
                  ->constrained('accommodations')->onDelete('set null');

            // Ajouter un index composite pour optimiser les recherches
            $table->index(['user_id', 'destination_id', 'accommodation_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Supprimer les contraintes de clé étrangère
            $table->dropForeign(['destination_id']);
            $table->dropForeign(['accommodation_id']);

            // Supprimer les colonnes
            $table->dropColumn(['destination_id', 'accommodation_id']);
        });
    }
};
