<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
  // Redirect to provider
  public function redirect($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  // Callback from provider
  public function callback($provider)
  {
    $socialUser = Socialite::driver($provider)->user();
    // $avatarUrl = $socialUser->getAvatar();
    $name = $socialUser->getName() ?? $socialUser->getNickname();
    $email = $socialUser->getEmail();
    $user = User::where('email', $email)->first();
    if ($user) {
      // 2. If user exists, attach provider ID if not already set
      $column = $provider . '_id';
      if (!$user->$column) {
        $user->$column = $socialUser->getId();
        $user->save();
      }
    } else {
      // 3. If no user exists with this email, create a new one
      $user = User::create([
        'name' => $name,
        'email' => $email,
        $provider . '_id' => $socialUser->getId(),
        'avatar' => $socialUser->getAvatar(),
      ]);
    }
    Auth::login($user);
    return redirect('/'); // redirect to React/Inertia app home
  }
}