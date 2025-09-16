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
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id');
            $table->string('name', 255);
            $table->text('description');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('city', 100);
            $table->integer('expected_attendees')->nullable();
            $table->text('highlights')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('rating', 2, 1)->default(0.0);
            $table->integer('ratings_count')->default(0);
            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index('start_date');
            $table->index('city');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
