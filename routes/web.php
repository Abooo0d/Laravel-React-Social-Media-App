<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------

| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('Home');
Route::get('/profile', [ProfileController::class, 'index'])->name('profile.view');
Route::middleware('auth')->group(function () {
  Route::post('/profile/change_images', [ProfileController::class, 'changeImages'])->name('profile.changeImages');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::post('/post', [PostController::class, 'store'])->name('post.create');
  Route::post('/post/{post}', [PostController::class, 'update'])->name('post.update');
  Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.delete');
  Route::get('/post/download/{attachment}', [PostController::class, 'downloadAttachment'])->name('post.download');
  Route::post('/post/{post}/reaction', [PostController::class, 'postReaction'])->name('post.reaction');
  Route::post('/post/{post}/comment', [PostController::class, 'postCommentCreate'])->name('post.comment.create');
});

require __DIR__ . '/auth.php';