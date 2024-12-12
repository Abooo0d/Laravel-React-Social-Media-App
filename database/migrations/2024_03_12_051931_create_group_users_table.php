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
    Schema::create('group_users', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained('users');
      $table->foreignId('group_id')->constrained('groups');
      $table->foreignId('created_by')->constrained('users');
      $table->string('status', 25); // approved | pending
      $table->string('role'); // admin | user
      $table->string('token', 1024)->nullable();
      $table->timestamp('token_expire_date')->nullable();
      $table->timestamp('token_used')->nullable();
      $table->timestamp('created_at')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('group_users');
  }
};