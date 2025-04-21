<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MessageResource extends JsonResource
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
      // 'user_id' => $this->user_id,
      'body' => $this->body,
      'attachment' => $this->attachment_path,
      'created_at' => $this?->created_at->format('M:d - H:i'),
      'user' => [
        'id' => $this->user->id,
        'name' => $this->user->name,
        'username' => $this->user->username,
        'avatar_url' => $this->user->avatar_path
          ? Storage::url($this->user->avatar_path)
          : asset('images/default_avatar_image.png'),
      ],
    ];
  }
}
