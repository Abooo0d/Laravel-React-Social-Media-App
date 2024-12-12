<?php

namespace App\Http\Resources;

use App\Http\Enums\GroupUserStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupUserResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'user' => new UserResource($this->user),
      'status' => $this->status,
      'role' => $this->role,
      'excepted_at' => $this->created_at
    ];
  }
}