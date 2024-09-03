<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostAttachments extends Model
{
  use HasFactory;
  const UPDATED_AT = null;
  public $fillable = [
    'post_id',
    'name',
    'path',
    'mime',
    'size',
    'created_by'
  ];
}
