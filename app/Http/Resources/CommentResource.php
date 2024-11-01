<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CommentResource extends JsonResource
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
      'comment' => $this->comment,
      'user' => [
        'id' => $this->user->id,
        'name' => $this->user->name,
        'username' => $this->user->username,
        'avatar_url' => Storage::url($this->user->avatar_path)
      ],
      'updated_at' => $this->updated_at->format('Y-m-d H:i')
    ];
  }
}