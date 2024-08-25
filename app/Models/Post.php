<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
  use HasFactory;
  use SoftDeletes;
  public $fillable = [
    'body',
    'user_id'
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function group()
  {
    return $this->belongsTo(Group::class);
  }
  public function attachments()
  {
    return $this->hasMany(PostAttachments::class);
  }
}