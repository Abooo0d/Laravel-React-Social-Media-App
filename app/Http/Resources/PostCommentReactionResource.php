<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostCommentReactionResource extends JsonResource
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
      'user' => [
        'id' => $this->user->uuid,
        'name' => $this->user->name,
        'username' => $this->user->username,
        'avatar_url' => Storage::url($this->user->avatar_path)
      ],
      'type' => $this->type
    ];
  }
}
