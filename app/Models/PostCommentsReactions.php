<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCommentsReactions extends Model
{
  use HasFactory;
  protected $fillable = [
    'post_comments_id',
    'user_id',
    'type'
  ];
  const UPDATED_AT = null;
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}