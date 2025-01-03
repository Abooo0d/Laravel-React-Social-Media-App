<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GroupResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    return [
      'id' => $this->id,
      'name' => $this->name,
      'slug' => $this->slug,
      'auto_approval' => $this->auto_approval,
      'about' => $this->about,
      'description' => Str::words($this->about, 20, '...'),
      'thumbnail_url' => Storage::url($this->thumbnail_path),
      'cover_url' => Storage::url($this->cover_path),
      'created_at' => $this->created_at,
      'owner' => $this->user_id,
      'role' => $this->currentUserGroups->role,
      'status' => $this->currentUserGroups->status,
    ];
  }
}