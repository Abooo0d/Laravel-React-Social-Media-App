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
    'role',
    'token',
    'token_expire_date'
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function adminUser()
  {
    return $this->belongsTo(User::class, 'created_by');
  }
  public function group()
  {
    return $this->belongsTo(Group::class);
  }
}