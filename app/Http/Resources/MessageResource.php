<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
      'user_id' => $this->user_id,
      'body' => $this->body,
      'attachment' => $this->attachment_path,
      'updated_at' => $this->updated_at ? $this->updated_at->format('M:d - H:i') : null
    ];
  }
}