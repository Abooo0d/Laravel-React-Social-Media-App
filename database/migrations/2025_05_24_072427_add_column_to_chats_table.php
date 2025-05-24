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
    Schema::table('chats', function (Blueprint $table) {
      $table->foreignId('owner')->constrained('users', 'id')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('chats', function (Blueprint $table) {
      $table->dropColumn('owner');
    });
  }
};