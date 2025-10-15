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
        Schema::create('scrap_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_id')->nullable()->constrained('sources')->cascadeOnDelete();
            $table->foreignId('comic_id')->nullable()->constrained('comics')->cascadeOnDelete();
            $table->foreignId('chapter_id')->nullable()->constrained('chapters')->cascadeOnDelete();
            $table->enum('status', ['success', 'failed', 'skipped']);
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scrap_logs');
    }
};
