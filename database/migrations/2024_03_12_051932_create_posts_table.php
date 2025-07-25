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
    Schema::create('posts', function (Blueprint $table) {
      $table->id();
      $table->longText('body')->nullable();
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('group_id')->nullable()->constrained('groups')->onDelete('set null');
      $table->foreignId('deleted_by')->nullable()->constrained('users')->onDelete('set null');
      $table->timestamp('deleted_at')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('posts');
  }
};
