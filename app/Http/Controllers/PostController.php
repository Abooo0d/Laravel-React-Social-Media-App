<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\post;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePostRequest $request)
  {
    $data = $request->validated();
    Post::create($data);
    return back();
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePostRequest $request, post $post)
  {
    $post->update($request->validated());
    return back();
  }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
      $id = Auth::id();
      if($id !== $post->user_id){
        return response(['message'=> 'You Don`t have Permission To Delete This Post']);
      }
      $post->delete();
    }
}