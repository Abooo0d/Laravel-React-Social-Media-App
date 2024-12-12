<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupUsers extends Model
{
  use HasFactory;
  const UPDATED_AT = null;
  protected $fillable = [
    'user_id',
    'group_id',
    'created_by',
    'status',
    'role'
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}