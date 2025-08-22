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
    Schema::create('chats', function (Blueprint $table) {
      $table->id();
      $table->string('name')->nullable();
      $table->boolean('is_group')->default(false);
      $table->string('avatar_path', 1024)->nullable();
      $table->string('last_message')->nullable();
      $table->string('last_message_id')->nullable();
      $table->string('last_message_date')->nullable();
      $table->integer('owner')->nullable();
      $table->boolean('withAI')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('chats');
  }
};