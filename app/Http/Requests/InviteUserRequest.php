<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class InviteUserRequest extends FormRequest
{
  public ?User $user = null;
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return ['email' => ['required', function ($attribute, $value, \Closure $fail) {
      $this->user = User::query()->where('email', $value)
        ->orWhere('username', $value)
        ->first();
      if (!$this->user) {
        $fail('User Don`t Exist');
      }
    }]];
  }
}
