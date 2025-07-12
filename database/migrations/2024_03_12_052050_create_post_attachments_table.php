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
    Schema::create('post_attachments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('post_id')->constrained('posts')->onDelete('cascade');
      $table->string('mime', 25);
      $table->integer('size');
      $table->string('name', 255);
      $table->string('path', 255);
      $table->foreignId('created_by')->constrained('users');
      $table->timestamp('created_at')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('post_attachments');
  }
};
