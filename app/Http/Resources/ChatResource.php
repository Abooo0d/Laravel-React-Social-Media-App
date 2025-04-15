<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class ChatResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $image = '';
    if (!!$this->is_group) {
      $image = $this->avatar_path
        ? Storage::url($this->avatar_path)
        : asset('images/default_avatar_image.png');
    } else
      $image = !!$this->users->firstWhere('id', '!=', auth()->id())?->avatar_path
        ? Storage::url($this->users->firstWhere('id', '!=', auth()->id())?->avatar_path)
        : asset('images/default_avatar_image.png');
    return [
      'id' => $this->id,
      'name' => !!$this->is_group
        ? $this->name
        : $this->users->firstWhere('id', '!=', auth()->id())?->name,
      'users' => $this->users->map(
        fn($user) => [
          'id' => $user->id,
          'name' => $user->name,
          'avatar' => $user->avatar_path ? Storage::url($user->avatar_path) : asset('images/default_avatar_image.png'),
        ]
      ),
      'avatar_url' => $image,
      'is_group' => !!$this->is_group,
      'messages' => MessageResource::collection($this->messages),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    ];
  }
}