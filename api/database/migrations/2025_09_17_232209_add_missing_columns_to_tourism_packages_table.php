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
        Schema::table('tourism_packages', function (Blueprint $table) {
            $table->string('duration')->nullable()->after('description')->comment('Durée du package');
            $table->decimal('price', 10, 2)->nullable()->after('duration')->comment('Prix du package');
            $table->string('image_url')->nullable()->after('price')->comment('Image du package');
            $table->string('category')->nullable()->after('image_url')->comment('Catégorie du package');
            $table->text('highlights')->nullable()->after('category')->comment('Points forts du package');
            $table->decimal('rating', 2, 1)->default(0.0)->after('highlights')->comment('Note moyenne (0 à 5)');
            $table->integer('ratings_count')->default(0)->after('rating')->comment('Nombre d\'évaluations');
            $table->string('group_size')->nullable()->after('ratings_count')->comment('Taille du groupe recommandée');
            $table->boolean('featured')->default(false)->after('group_size')->comment('Package mis en avant');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tourism_packages', function (Blueprint $table) {
            $table->dropColumn([
                'duration',
                'price',
                'image_url',
                'category',
                'highlights',
                'rating',
                'ratings_count',
                'group_size',
                'featured'
            ]);
        });
    }
};
