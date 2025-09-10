<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateChatGroupRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return !!auth()->id();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'chat_name' => ['required', 'string'],
      'users' => ['array', 'nullable'],
      'users[]*' => [
        'user_id' => ['required', 'exists:users,uuid']
      ]
    ];
  }
  protected function passedValidation(): void
  {
    if ($this->has('users')) {
      $this->validatedUsers = User::whereIn('uuid', $this->input('users'))->get();
    }
  }
}