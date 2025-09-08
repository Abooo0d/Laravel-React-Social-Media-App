<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\AuthUserMobileController;
use App\Http\Controllers\GroupControllerMobile;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatsController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')
Route::middleware('auth:sanctum')->group(function () {
  Route::get(
    '/user',
    fn(Request $request) =>
    response(['user' => new UserResource(auth()->user())])
  );
  Route::post('/logout-mobile', [AuthUserMobileController::class, 'logoutMobile']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/get-posts', [HomeController::class, 'getPosts']);
  Route::get('/get-groups', [HomeController::class, 'getGroups']);
  Route::get('/get-notifications', [HomeController::class, 'getNotifications']);
  Route::get('/get-chat-groups', [HomeController::class, 'getChatGroups']);
  Route::post('/notification/read/{notificationId}', [HomeController::class, 'readNotification']);
  Route::post('/notification/readAll', [HomeController::class, 'readAllNotifications']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/user/search', [UserController::class, 'searchForUser']);
  Route::post('/user/invite/{user:id}', [UserController::class, 'addFriend']);
  Route::post('/user/acceptRequest', [UserController::class, 'acceptRequest_mobile']);
});
Route::middleware('auth:sanctum')->group(function () {
  Route::get('my-profile', [ProfileController::class, 'myProfileMobile']);
  Route::get('/profile/{user:username}', [ProfileController::class, 'ProfileMobile']);
  Route::post('/profile/change_images', [ProfileController::class, 'changeImagesMobile']);
  Route::patch('/profile', [ProfileController::class, 'update_mobile']);
  Route::delete('/profile', [ProfileController::class, 'destroy_mobile']);
  Route::post('/update-password', [PasswordController::class, 'update_mobile']);
  Route::get('profile/posts/{user:username}', [ProfileController::class, 'getPostsForUserMobile']);
  Route::get('/profile/download/{user:id}/{type}', [ProfileController::class, 'downloadImage']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/group', [GroupControllerMobile::class, 'store']);
  Route::get('/group/{group:slug}', [GroupControllerMobile::class, 'index']);
  Route::post('/group/change_images', [GroupControllerMobile::class, 'changeImages']);
  Route::post('/group/invite/{group:slug}', [GroupControllerMobile::class, 'inviteUser']);
  Route::get('/group/accept-invitation/{token}', [GroupControllerMobile::class, 'acceptInvitation']);
  Route::post('/group/join/{group:slug}', [GroupControllerMobile::class, 'joinGroup']);
  Route::post('/group/approve/{group:slug}', [GroupControllerMobile::class, 'approveRequest']);
  Route::post('/group/reject/{group:slug}', [GroupControllerMobile::class, 'reject']);
  Route::post('/group/change-role/{group:slug}', [GroupControllerMobile::class, 'changeRole']);
  Route::delete('/group/kick-out/{group:slug}', [GroupControllerMobile::class, 'kickOut']);
  Route::put('/group/{group:slug}', [GroupControllerMobile::class, 'update']);
  Route::get('/group/getPosts/{group:slug}', [GroupControllerMobile::class, 'getPostsForGroup']);
  Route::post('/group/search', [GroupControllerMobile::class, 'searchForGroups']);
  Route::get('/group/download/{group:id}/{type}', [GroupControllerMobile::class, 'downloadImage']);
  Route::delete('/group/{group:slug}/destroy', [GroupControllerMobile::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/post', [PostController::class, 'store']);
  Route::delete('/post/{post:id}', [PostController::class, 'destroy']);
  Route::post('/post/{post:id}', [PostController::class, 'update']);
  Route::get('/post/download/{attachment:id}', [PostController::class, 'downloadAttachment']);
  Route::post('/post/{post:id}/reaction', [PostController::class, 'postReaction']);
  Route::post('/post/{post:id}/comment', [PostController::class, 'postCommentCreate']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::delete('/comment/{comment}', [PostController::class, 'DeleteComment']);
  Route::put('/comment/{comment}', [PostController::class, 'EditComment']);
  Route::post('/comment/{comment}/reaction', [PostController::class, 'CommentReaction']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/ai-chats', [AIController::class, 'index']);
  Route::post('/post/aiPost/post', [AIController::class, 'aiPost']);
  Route::post('/ai-chat/new-message', [AIController::class, 'newMessage']);
});

Route::middleware('guest')->group(function () {
  Route::post('/login-mobile', [AuthUserMobileController::class, 'loginMobile']);
  Route::post('/signup-mobile', [AuthUserMobileController::class, 'signUpMobile']);
});
Route::middleware('auth:sanctum')->group(function () {
  Route::get('/chats', [ChatsController::class, 'index_mobile']);
  Route::post('/chats', [ChatsController::class, 'getChat']);
  Route::post('/chat/new_message/{chat:id}', [ChatsController::class, 'newMessage']);
  Route::post('/chat/read-message/{message:id}', [ChatsController::class, 'messageRead']);
  Route::get('/chat/get_more_messages/{message:id}', [ChatsController::class, 'getMoreMessages']);
  Route::post('/chat/search', [ChatsController::class, 'searchForChat']);
  Route::get('/chat/download/{attachment}', [ChatsController::class, 'downloadAttachment']);
  Route::post('/chat/update-message/{message:id}', [ChatsController::class, 'UpdateMessage']);
  Route::delete('/chat/delete-message/{message:id}', [ChatsController::class, 'deleteMessage']);
  Route::post('/chat/create-groupChat', [ChatsController::class, 'createChatGroup']);
  Route::post('/chat/{chat:id}/mute', [ChatsController::class, 'muteChat']);
  Route::post('/chat/{chat:id}/block', [ChatsController::class, 'blockChat']);
  Route::post('/chat/{chat:id}/leave', [ChatsController::class, 'leaveChatGroup']);
  Route::delete('/chat/{chat:id}/delete', action: [ChatsController::class, 'deleteChat']);
  Route::post('/chat/{chat:id}/change-image', [ChatsController::class, 'ChangeChatGroupImage']);
  Route::post('/chat/{chat:id}/change-name', [ChatsController::class, 'ChangeChatName']);
  Route::post('/chat/{chat:id}/add-users', [ChatsController::class, 'addUsersToChat']);
  Route::post('chat/{chat:id}/set-admin', [chatsController::class, 'ChangeRoleInChat']);
  Route::post('chat/{chat:id}/kick-out', [ChatsController::class, 'kickOut']);
  Route::post('/chat/{chat:id}/video-call', [ChatsController::class, 'videoCall']);
  Route::post('/chat/{chat:id}/voice-call', [ChatsController::class, 'voiceCall']);
  Route::post('/chat/{chat:id}/decline-call', [ChatsController::class, 'callDecline']);
});