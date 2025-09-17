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
        Schema::table('trips', function (Blueprint $table) {
            $table->integer('duration_days')->after('summary')->comment('Durée du circuit en jours')->nullable();
            $table->integer('min_persons')->after('duration_days')->comment('Nombre minimum de personnes')->nullable();
            $table->integer('max_persons')->after('min_persons')->comment('Nombre maximum de personnes')->nullable();
            $table->text('cities')->after('max_persons')->comment('Villes parcourues durant le trip (séparées par des virgules)')->nullable();
            $table->decimal('rating', 2, 1)->default(0.0)->after('cities')->comment('Note moyenne (0 à 5)')->nullable();
            $table->integer('ratings_count')->default(0)->after('rating')->comment('Nombre d\'évaluations')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->dropColumn([
                'duration_days',
                'min_persons',
                'max_persons',
                'cities',
                'rating',
                'ratings_count'
            ]);
        });
    }
};
