<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostComments extends Model
{
  use HasFactory;
  protected $fillable = [
    'post_id',
    'user_id',
    'comment'
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function post()
  {
    return $this->belongsTo(Post::class);
  }
}