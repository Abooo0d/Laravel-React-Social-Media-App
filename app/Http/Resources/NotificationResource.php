<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class NotificationResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    $user = User::find($this->data['actor_id']);
    return [
      'id' => $this->id,
      'read_at' => $this->read_at,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'type' => $this->data['type'],
      'message' => $this->data['message'],
      'link' => $this->data['link'],
      'actor' => [
        'id' => $user?->uuid,
        'name' => $user?->name,
        'avatar_url' => !!$user->avatar_path
          ? asset(Storage::url($user->avatar_path))
          : asset(path: 'images/default_avatar_image.png'),
      ]
    ];
  }
}
