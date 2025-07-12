<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('post_comments_reactions', function (Blueprint $table) {
      $table->id();
      $table->foreignId('post_comments_id')->constrained('post_comments')->onDelete('cascade');
      $table->string('type');
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->timestamp('created_at')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('post_comments_reactions');
  }
};
