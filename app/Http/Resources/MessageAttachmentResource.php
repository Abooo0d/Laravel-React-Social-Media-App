<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MessageAttachmentResource extends JsonResource
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
      'mime' => $this->mime,
      'size' => $this->size,
      'name' => $this->name,
      'url' => Storage::url($this->path),
      'created_at' => $this->created_at
    ];
  }
}
