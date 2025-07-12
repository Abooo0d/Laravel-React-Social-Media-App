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
    Schema::create('messages', function (Blueprint $table) {
      $table->id();
      $table->foreignId('chat_id')->constrained()->onDelete('cascade');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->longText('body')->nullable();
      $table->string('attachment_path')->nullable();
      $table->boolean('edited')->nullable()->default(false);
      $table->boolean('deleted')->nullable()->default(false);
      $table->string('from')->default('');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('messages');
  }
};