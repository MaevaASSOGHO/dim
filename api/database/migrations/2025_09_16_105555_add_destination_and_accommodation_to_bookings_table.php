<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Destination
            $table->foreignId('destination_id')->nullable()->after('trip_id');
            $table->foreign('destination_id')
                ->references('id')
                ->on('destinations')
                ->nullOnDelete();

            // Accommodation
            $table->foreignId('accommodation_id')->nullable()->after('destination_id');
            $table->foreign('accommodation_id')
                ->references('accommodation_id') // <- clé primaire personnalisée
                ->on('accommodations')
                ->nullOnDelete();

            // Index composite
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
