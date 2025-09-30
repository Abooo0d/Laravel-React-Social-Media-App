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
    Schema::table('users', function (Blueprint $table) {
      $table->string('password')->nullable()->change();
      $table->string('google_id')->nullable()->unique();
      $table->string('github_id')->nullable()->unique();
    });
  }

    /**
     * Reverse the migrations.
     */
  public function down(): void
  {
    Schema::table('users', function (Blueprint $table) {
      $table->string('password')->change();
      $table->dropColumn('google_id');
      $table->dropColumn('github_id');
    });
  }
};
