<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostReactions extends Model
{
  use HasFactory;
  protected $fillable = [
    'post_id',
    'user_id',
    'type'
  ];
  const UPDATED_AT = null;
}