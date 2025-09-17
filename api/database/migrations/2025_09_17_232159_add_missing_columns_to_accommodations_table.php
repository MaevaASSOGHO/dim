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
        Schema::table('accommodations', function (Blueprint $table) {
            $table->string('type')->nullable()->after('price_per_night')->comment('Type d\'hébergement');
            $table->string('rooms')->nullable()->after('amenities')->comment('Nombre et type de chambres');
            $table->boolean('featured')->default(false)->after('rooms')->comment('Hébergement mis en avant');
            $table->json('gallery')->nullable()->after('featured')->comment('Galerie d\'images');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accommodations', function (Blueprint $table) {
            $table->dropColumn([
                'type',
                'rooms',
                'featured',
                'gallery'
            ]);
        });
    }
};
