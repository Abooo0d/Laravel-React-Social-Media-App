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
    Schema::create('chats_statuses', function (Blueprint $table) {
      $table->id();
      $table->foreignId('chat_id')->constrained()->onDelete('cascade');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->boolean('mute')->default(false);
      $table->boolean('blocked')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migration
   */
  public function down(): void
  {
    Schema::dropIfExists('chats_statuses');
  }
};
