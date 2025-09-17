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
        Schema::table('destinations', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->after('description')->comment('Prix du séjour en euros')->nullable();
            $table->integer('duration_days')->after('price')->comment('Durée du séjour en jours')->nullable();
            $table->integer('min_persons')->after('duration_days')->comment('Nombre minimum de personnes')->nullable();
            $table->integer('max_persons')->after('min_persons')->comment('Nombre maximum de personnes')->nullable();
            $table->text('highlights')->after('max_persons')->comment('Points forts de la destination')->nullable();
            $table->decimal('rating', 2, 1)->default(0.0)->after('highlights')->comment('Note moyenne (0 à 5)')->nullable();
            $table->integer('ratings_count')->after('rating')->comment('Nombre d\'évaluations')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn([
                'price',
                'duration_days',
                'min_persons',
                'max_persons',
                'highlights',
                'rating',
                'ratings_count'
            ]);
        });
    }
};
