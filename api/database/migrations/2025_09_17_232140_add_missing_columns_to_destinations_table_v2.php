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
            $table->text('long_description')->nullable()->after('description')->comment('Description détaillée de la destination');
            $table->string('category')->nullable()->after('ratings_count')->comment('Catégorie de la destination');
            $table->string('group_size')->nullable()->after('category')->comment('Taille du groupe recommandée');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn(['long_description', 'category', 'group_size']);
        });
    }
};
