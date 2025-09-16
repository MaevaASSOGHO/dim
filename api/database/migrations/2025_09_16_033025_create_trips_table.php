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
        Schema::create('trips', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id'); // = $table->id();
            $table->foreignId('destination_id')->constrained()->cascadeOnDelete(); // BIGINT UNSIGNED
            $table->string('title');
            $table->string('slug')->unique();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->string('currency', 3)->default('XOF');
            $table->unsignedInteger('seats_total')->default(0);
            $table->unsignedInteger('seats_left')->default(0);
            $table->enum('status', ['planned','available','full','cancelled'])->default('available');
            $table->text('summary')->nullable();
            $table->longText('details')->nullable();
            $table->string('cover_url')->nullable();
            $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
