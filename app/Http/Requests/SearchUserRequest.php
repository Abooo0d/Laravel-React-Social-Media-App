<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SearchUserRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  /** @var User[] $user */
  public $user = null;
  public function authorize(): bool
  {

    return !!Auth::id();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => [
        'required',
        function ($attribute, $value, \Closure $fail) {
          $this->user = User::query()
            ->where('name', 'LIKE', "%{$value}%")
            ->orWhere('username', 'LIKE', "%{$value}%")
            ->orWhere('email', 'LIKE', "%{$value}%")
            ->get()->where('id', '!=', Auth::id());
          if (!$this->user) {
            $fail('User Don`t Exist');
          }
        }
      ]
    ];
  }
}