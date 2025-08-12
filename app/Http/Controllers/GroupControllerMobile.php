<?php

namespace App\Http\Controllers;

use App\Events\GroupDeleted;
use App\Http\Enums\GroupUserRuleEnum;
use App\Http\Enums\GroupUserStatusEnum;
use App\Http\Requests\InviteUserRequest;
use App\Http\Requests\SearchGroupRequest;
use App\Http\Resources\PostAttachmentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Jobs\DeleteGroup;
use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\GroupUserResource;
use App\Models\GroupUsers;
use App\Models\Post;
use App\Models\PostAttachments;
use App\Models\User;
use App\Notifications\GroupDeletedNotification;
use App\Notifications\GroupInvitationNotification;
use App\Notifications\GroupUpdateNotification;
use App\Notifications\GroupUsersActionNotification;
use App\Notifications\InvitationApprovedNotification;
use App\Notifications\JoinRequestNotification;
use App\Notifications\RequestActionNotification;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;
use \Illuminate\Http\UploadedFile;

class GroupControllerMobile extends Controller
{
  public function index(Request $request, Group $group)
  {
    try {
      $users = User::query()
        ->select(['users.*', 'gu.role', 'gu.status', 'gu.group_id'])
        ->join('group_users AS gu', 'gu.user_id', 'users.id')
        ->orderBy('users.name')
        ->where('group_id', $group->id)
        ->get();
      return response([
        'group' => new GroupResource(resource: $group),
        'requests' => UserResource::collection($group->requestUsers()->get()),
        'users' => GroupUserResource::collection($users),
        'isAdmin' => $group->isAdmin(Auth::id()),
      ], 200);
    } catch (e) {
      return response(['error', 'Some Thing Wrong Happened'], 405);
    }
  }
  public function getPostsForGroup(Group $group)
  {
    try {
      $posts = Post::PostsForTimeLine(Auth::id())
        ->where('group_id', $group->id)
        ->latest()
        ->paginate(perPage: 15);
      $posts_ids = Post::where('group_id', $group->id)->pluck('id')->toArray();
      $photos = PostAttachments::whereIn('post_id', $posts_ids)->where('mime', 'like', 'image/%')->get();
      return response([
        'posts' => [
          'data' => PostResource::collection($posts),
          'links' => [
            'first' => $posts->url(1),
            'last' => $posts->url($posts->lastPage()),
            'prev' => $posts->previousPageUrl(),
            'next' => $posts->nextPageUrl(),
          ],
          'meta' => [
            'current_page' => $posts->currentPage(),
            'last_page' => $posts->lastPage(),
            'per_page' => $posts->perPage(),
            'total' => $posts->total(),
          ]
        ],
        'photos' => PostAttachmentResource::collection($photos),
      ], 200);
    } catch (e) {
      return response(['error', 'Some Thing Wrong Happened'], 405);
    }
  }
  public function store(StoreGroupRequest $request)
  {
    try {
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
      return response(['message' => 'Group Created Successfully'], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Went Wrong'], 200);
    }
  }
  public function update(UpdateGroupRequest $request, Group $group)
  {
    try {
      $group->update($request->validated());
      $user = User::where('id', AUth::id())->first();
      $admins = $group->adminUsers()->where('user_id', '!=', Auth::id())->get();
      Notification::send($admins, new GroupUpdateNotification($user, $group));
      return response([
        'message' => 'Group Updated Successfully',
        'group' => new GroupResource($group)
      ], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function changeImages(Request $request)
  {
    try {
      $message = '';
      $image = '';
      $data = $request->validate([
        'coverImage' => ['nullable', 'file', 'mimes:jpg,png'],
        'avatarImage' => ['nullable', 'file', 'mimes:jpg,png'],
        'group_id' => ['required']
      ]);
      $group = Group::query()
        ->with('currentUserGroups')
        ->where('id', $data['group_id'])->first();
      if ($group->currentUserGroups['role'] !== 'admin') {
        return response(['message' => 'You do not have permission to change images.'], 403);
      }
      /**
       * @var UploadedFile $cover
       */
      $cover = $data['coverImage'] ?? null;
      /**
       * @var UploadedFile $thumbnail
       */
      $thumbnail = $data['avatarImage'] ?? null;
      if ($cover) {
        $image = 'cover';
        if ($group->cover_path) {
          Storage::disk('public')->delete($group->cover_path);
        }
        $coverPath = $cover->store("groups/{$group->id}", 'public');
        $group->update(['cover_path' => $coverPath]);
        $message = 'Cover Changed Image Updated Successfully';
      }
      if ($thumbnail) {
        $image = 'thumbnail';
        if ($group->thumbnail_path) {
          Storage::disk('public')->delete($group->thumbnail_path);
        }
        $thumbnail_path = $thumbnail->store("groups/{$group->id}", 'public');
        $group->update(['thumbnail_path' => $thumbnail_path]);
        $message = 'Thumbnail Image Updated Successfully';
      }
      DB::beginTransaction();
      $attachment = $cover ?: $thumbnail;
      $user = User::where('id', AUth::id())->first();
      $post = Post::create(
        [
          'user_id' => $user->id,
          'attachments' => $cover ?: $thumbnail,
          'body' => $cover ?
            "{$user->name} Changed The Group Cover Image" :
            "{$user->name} Changed The Group Thumbnail Image",
          'group_id' => $group->id
        ]
      );
      $path = $attachment->store("attachments/{$post->id}", 'public');
      PostAttachments::create([
        'post_id' => $post->id,
        'name' => $attachment->getClientOriginalName(),
        'path' => $path,
        'mime' => $attachment->getMimeType(),
        'size' => $attachment->getSize(),
        'created_by' => $user->id,
      ]);
      DB::commit();
      $group->refresh();
      $admins = $group->adminUsers()->where('user_id', '!=', Auth::id())->get();
      Notification::send($admins, new GroupUpdateNotification($user, $group, $image));
      return response(['message' => $message, 'group' => new GroupResource($group)], 200);

    } catch (e) {
      return response(['message' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function inviteUser(InviteUserRequest $request, Group $group)
  {
    try {
      $data = $request->validated();
      $user = $request->user;
      $groupUser = $request->groupUser;
      if ($groupUser) {
        $groupUser->delete();
      }
      $hours = 24;
      $token = Str::random(265);
      $groupUser = GroupUsers::create([
        'user_id' => $user->id,
        'group_id' => $group->id,
        'created_by' => Auth::id(),
        'status' => GroupUserStatusEnum::PENDING->value,
        'role' => GroupUserRuleEnum::USER->value,
        'token' => $token,
        'token_expire_date' => Carbon::now()->addHours($hours),
        'token_used' => '',
        'created_at' => '',
      ]);
      $groupUser->user->notify(new GroupInvitationNotification($group, $user, $hours, $token));
      return response(['message' => "'{$user->name}' Was Invited Successfully"], 200);

    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function acceptInvitation(string $token)
  {
    try {
      $groupUser = GroupUsers::query()->where('token', $token)->first();
      $message = '';
      if (!$groupUser) {
        $message = 'This Link Isn`t Valid!';
      } elseif ($groupUser->status == GroupUserStatusEnum::APPROVED->value || $groupUser->token_used) {
        $message = 'This Link Is Already Used!';
      } elseif ($groupUser->token_expire_date < Carbon::now()) {
        $message = 'This Link Is Expired!';
      }
      if ($message !== '') {
        return response(['message' => $message], 405);
      }
      $groupUser->status = GroupUserStatusEnum::APPROVED->value;
      $groupUser->token_used = Carbon::now();
      $groupUser->save();
      $adminUser = $groupUser->adminUser;
      $group = $groupUser->group;
      $adminUser->notify(new InvitationApprovedNotification($group, $groupUser->user));
      return response(['success' => "You Are New A Member Of {$group->name} Group"], 200);

    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function joinGroup(Request $request, Group $group)
  {
    try {
      $user = $request->user();
      $status = GroupUserStatusEnum::APPROVED->value;
      $join = true;
      $message = 'You Have Joined ' . $group->name . ' Successfully';
      $adminUsers = $group->adminUsers()->get();
      if (!$group->auto_approval) {
        $join = false;
        $message = 'Your Request Has Been Received, You Will Be Notified When Accepted';
        $status = GroupUserStatusEnum::PENDING->value;
        Notification::send($adminUsers, new JoinRequestNotification($group, $user, $join));
      }
      GroupUsers::create([
        'user_id' => $user->id,
        'group_id' => $group->id,
        'created_by' => Auth::id(),
        'status' => $status,
        'role' => GroupUserRuleEnum::USER->value,
      ]);
      Notification::send($adminUsers, new JoinRequestNotification($group, $user, $join));
      return response([
        'message' => $message,
        'group' => new GroupResource($group)
      ], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function approveRequest(Request $request, Group $group)
  {
    try {
      $data = $request->validate([
        'user_id' => 'required'
      ]);
      $groupUser = GroupUsers::where('user_id', $data['user_id'])
        ->where('group_id', $group->id)
        ->where('status', GroupUserStatusEnum::PENDING->value)
        ->first();
      if (!$groupUser) {
        return response(['message' => "There IS An Error With The Request"], 404);
      }
      $groupUser->status = GroupUserStatusEnum::APPROVED->value;
      $groupUser->save();
      $groupUser->user->notify(new RequestActionNotification($group, 'approved', auth()->id()));
      return response(['message' => "The User Have Been Approved"], 200);

    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function reject(Request $request, Group $group)
  {
    try {
      $data = $request->validate([
        'user_id' => 'required'
      ]);
      $groupUser = GroupUsers::where('user_id', $data['user_id'])
        ->where('group_id', $group->id)
        ->where('status', GroupUserStatusEnum::PENDING->value)
        ->first();
      if ($groupUser) {
        $groupUser->status = GroupUserStatusEnum::REJECTED->value;
        $groupUser->save();
        $groupUser->user->notify(new RequestActionNotification($group, 'rejected', auth()->id()));
        return response(['message' => 'User Have Been Rejected'], 200);
      }
      return response(['message' => 'There Is An Error In The Request'], 400);

    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function changeRole(Request $request, Group $group): RedirectResponse|Response
  {
    try {
      $data = $request->validate([
        'user_id' => 'required|exists:users,id',
        'role' => Rule::enum(GroupUserRuleEnum::class)
      ]);
      $user_id = $data['user_id'];
      $groupUser = GroupUsers::where('user_id', $user_id)
        ->where('group_id', $group->id)
        ->first();
      if ($group->isOwner($user_id)) {
        return response(['message' => 'You Can`t Change The Role Of The Owner Of The Group'], 400);
      }
      if ($groupUser) {
        if ($group->isAdmin(Auth::id())) {
          $groupUser->role = $data['role'];
          $groupUser->save();
          $admin = User::where('id', Auth::id())->first();
          $groupUser->user->notify(new GroupUsersActionNotification($admin, $group, 'ChangeRole', $data['role']));
          return response(['message' => 'Role Changed Successfully'], 200);
        }
      }

      return response(['message' => 'there Is An Unexpected Error'], 400);

    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function kickOut(Request $request, Group $group)
  {
    try {
      $data = $request->validate([
        'user_id' => ['required', 'exists:users,id']
      ]);
      $user_id = $data['user_id'];
      $groupUser = GroupUsers::where('user_id', $user_id)
        ->where('group_id', $group->id)
        ->first();
      if ($group->isOwner($user_id)) {
        return response(['error' => 'You Can`t Kick Out The Owner Of The Group'], 403);
      }
      if ($groupUser) {
        $groupUser->delete();
        $admin = User::where('id', Auth::id())->first();
        $groupUser->user->notify(new GroupUsersActionNotification($admin, $group, 'KickOut'));
        return response(['message' => 'Member Kicked Out Successfully'], 200);
      }
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function searchForGroups(SearchGroupRequest $request)
  {
    try {
      $data = $request->Validated();
      $groupsData = $request->group;
      if ($request->wantsJson())
        return response(['groups' => GroupResource::collection($groupsData)], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
  public function downloadImage(Request $request, Group $group)
  {
    try {
      $image = $request->type === 'cover' ? $group->cover_path : $group->thumbnail_path;
      if (!$image || !Storage::disk('public')->exists($image)) {
        return response(['error' => 'Image not found.'], 404);
      }
      $filePath = Storage::disk('public')->path($image);
      return response()->download($filePath, basename($image));
    } catch (e) {
      return response(['error' => 'Something went wrong while downloading the image.']);

    }
  }
  public function destroy(Group $group)
  {
    try {
      $userId = auth()->id();
      if ($userId !== $group->user_id) {
        return response(['message' => 'Only The Owner Of The Group Can Delete It'], 403);
      }
      $posts = Post::where('group_id', $group->id)
        ->with('attachments')
        ->get();
      foreach ($posts as $post) {
        foreach ($post->attachments as $attachment) {
          Storage::disk('public')->delete($attachment->path);
          // Delete DB record
          $attachment->delete();
        }
      }
      $members = User::query()
        ->select(['users.*', 'gu.group_id'])
        ->join('group_users AS gu', 'gu.user_id', 'users.id')
        ->where('group_id', $group->id)
        ->get();
      Notification::send(
        $members,
        new GroupDeletedNotification($group, auth()->user())
      );
      $usersIds = collect($members)->map(
        fn($user) =>
        $user->id
      )->all();
      broadcast(new GroupDeleted($group, $usersIds));
      $group->delete();
      // DeleteGroup::dispatch($group)->delay(now()->addSeconds(2));
      return response(['message' => "Your Request Has Been Received, You Will Be Notified When The Group Is Deleted"], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
    }
  }
}
