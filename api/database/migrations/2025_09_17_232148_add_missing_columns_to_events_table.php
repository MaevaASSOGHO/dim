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
        Schema::table('events', function (Blueprint $table) {
            $table->string('location')->nullable()->after('city')->comment('Lieu de l\'événement');
            $table->string('duration')->nullable()->after('end_date')->comment('Durée de l\'événement');
            $table->integer('capacity')->nullable()->after('duration')->comment('Capacité maximale');
            $table->string('category')->nullable()->after('capacity')->comment('Catégorie de l\'événement');
            $table->boolean('featured')->default(false)->after('ratings_count')->comment('Événement mis en avant');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'location',
                'duration',
                'capacity',
                'category',
                'featured'
            ]);
        });
    }
};
