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
        Schema::create('comics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('cover_url')->nullable();
            $table->enum('status', ['ongoing', 'completed', 'hiatus'])->default('ongoing');
            $table->text('description')->nullable();
            $table->string('author')->nullable();
            $table->string('artist')->nullable();
            $table->integer('release_year')->nullable();
            $table->enum('type', ['manga', 'manhwa', 'manhua']);
            $table->unsignedBigInteger('views')->default(0);
            $table->float('rating')->default(0); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comics');
    }
};
