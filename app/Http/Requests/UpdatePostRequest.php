<?php

namespace App\Http\Requests;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use PHPUnit\TextUI\Configuration\Merger;

class UpdatePostRequest extends StorePostRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    // dd($this->input());
    $post = Post::where('uuid', $this->input('id'))->where('user_id', Auth::id())->first();
    return !!$post;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return array_merge(parent::rules(), [
      'deletedFilesIds' => ['array'],
      'deletedFilesIds.*' => ['numeric']
    ]);
  }
  public function messages()
  {
    return parent::messages();
  }
}
