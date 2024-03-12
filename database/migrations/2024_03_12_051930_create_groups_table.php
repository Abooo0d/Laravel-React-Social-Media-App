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
    Schema::create('groups', function (Blueprint $table) {
      $table->id();
      $table->string('name', 255);
      $table->string('slug', 255);
      $table->boolean('auto_approval')->default('true');
      $table->text('about')->nullable();
      $table->foreignId('user_id')->constrained('users');
      $table->timestamp('deleted_at')->nullable();
      $table->foreignId('deleted_by')->nullable()->constrained('users');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('groups');
  }
};
