<?php

namespace App\Http\Controllers;

use App\Http\Enums\GroupUserRuleEnum;
use App\Http\Enums\GroupUserStatusEnum;
use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\GroupUserResource;
use App\Models\GroupUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GroupController extends Controller
{
  public function index(Group $group)
  {
    return Inertia::render('Group/View', ['group' => new GroupResource($group)]);
  }
  public function store(StoreGroupRequest $request)
  {
    $data = $request->validated();
    $user_id = Auth::id();
    $group = Group::create([
      'name' => $data['name'],
      'auto_approval' => $data['autoApproval'],
      'about' => $data['about'],
      'user_id' => $user_id,
    ]);
    $groupUser = GroupUsers::create([
      'user_id' => $user_id,
      'group_id' => $group->id,
      'created_by' => $user_id,
      'status' => GroupUserStatusEnum::APPROVED->value,
      'role' => GroupUserRuleEnum::ADMIN->value,
    ]);
    $group['role'] = 'admin';
    $group['status'] = 'approved';
    return response(
      [
        'group' => new GroupResource($group),
      ],
      201
    );
  }
  public function update(UpdateGroupRequest $request, Group $group)
  {
    //
  }
  public function destroy(Group $group)
  {
    //
  }
  public function changeImages(Request $request, Group $group)
  {
    $data = $request->validate([
      'coverImage' => ['nullable', 'file', 'mimes:jpg,png'],
      'avatarImage' =>  ['nullable', 'file', 'mimes:jpg,png'],
      'group_id' => ['required']
    ]);
    $group = Group::where('id', $data['group_id'])->first();
    /**
     * @var UploadedFile $cover
     */
    $cover = $data['coverImage'] ?? null;
    /**
     * @var UploadedFile $thumbnail
     */
    $thumbnail = $data['avatarImage'] ?? null;
    if ($cover) {
      if ($group->cover_path) {
        Storage::disk('public')->delete($group->cover_path);
      }
      $coverPath = $cover->store("group-{$group->id}", 'public');
      $group->update(['cover_path' => $coverPath]);
    }
    if ($thumbnail) {
      if ($group->thumbnail_path) {
        Storage::disk('public')->delete($group->thumbnail_path);
      }
      $thumbnail_path = $thumbnail->store("group-{$group->id}", 'public');
      $group->update(['thumbnail_path' => $thumbnail_path]);
    }
    return back();
  }
}