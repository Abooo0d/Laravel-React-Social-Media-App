<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
  protected $fillable = ['last_message_id', 'last_message'];

  use HasFactory;
  public function users()
  {
    return $this->belongsToMany(User::class)->withTimestamps();
  }
  public function messages()
  {
    return $this->hasMany(Message::class)->orderBy('created_at', 'desc');
  }
}