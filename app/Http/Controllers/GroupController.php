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
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
  public function index()
  {
    //
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
}