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
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id('accommodation_id');
            $table->string('name', 255);
            $table->text('description');
            $table->string('location', 255);
            $table->integer('room_count');
            $table->integer('reviews_count')->default(0);
            $table->text('amenities')->nullable();
            $table->decimal('price_per_night', 10, 2);
            $table->decimal('rating', 2, 1)->default(0.0);
            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index('location');
            $table->index('price_per_night');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
