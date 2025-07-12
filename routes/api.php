<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthUserMobileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
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

Route::middleware('guest')->group(function () {
  Route::post('/login-mobile', [AuthUserMobileController::class, 'loginMobile']);
  Route::post('/signup-mobile', [AuthUserMobileController::class, 'signUpMobile']);
});