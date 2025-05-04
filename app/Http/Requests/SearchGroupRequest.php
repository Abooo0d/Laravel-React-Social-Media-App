<?php

namespace App\Http\Requests;

use App\Models\Group;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SearchGroupRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  /** @var Group[] $group */
  public $group = null;
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
          $this->group = Group::query()
            ->where('name', 'LIKE', "%{$value}%")
            ->orWhere('slug', 'LIKE', "%{$value}%")
            ->get();
          if (!$this->group) {
            $fail('User Don`t Exist');
          }
        }
      ]
    ];
  }
}