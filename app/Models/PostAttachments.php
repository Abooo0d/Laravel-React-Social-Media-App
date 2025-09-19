<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
    'created_by',
    'thumbnail_path',
  ];

  protected static function boot()
  {
    parent::boot();
    static::deleted(function (self $model) {
      Storage::disk('public')->delete($model->path);
    });
  }
}
