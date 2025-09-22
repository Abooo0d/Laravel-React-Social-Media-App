<?php

namespace App\Http\Requests;
use App\Models\User;

use Illuminate\Foundation\Http\FormRequest;

class ChangeRoleForChatRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return (bool) $this->chat->isCurrentUserAdmin();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'user_id' => ['required', 'exists:users,uuid'],
      'role' => ['string', 'required']
    ];
  }
    protected function passedValidation(): void
  {
    if ($this->has('user_id')) {
      $this->validatedUsers = User::where('uuid', $this->input('user_id'))->first();
    }
  }
}