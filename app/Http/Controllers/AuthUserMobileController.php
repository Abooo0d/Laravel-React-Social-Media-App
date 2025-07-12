<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
class AuthUserMobileController extends Controller
{
  public function loginMobile(LoginRequest $request)
  {
    try {
      if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
      }

      $user = Auth::user();

      $user->tokens()->delete();

      $token = $user->createToken('mobile-token')->plainTextToken;

      return response()->json([
        'user' => new UserResource($user),
        'token' => $token,
      ], 200);
    } catch (e) {
      return response(['message' => 'some Thin gWrong Happened'], 406);
    }
  }

  public function signUpMobile(Request $request)
  {
    try {
      $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
      ]);

      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);

      Auth::login($user);

      $token = $user->createToken('mobile-token')->plainTextToken;

      return response()->json([
        'user' => new UserResource($user),
        'token' => $token,
      ], 200);
    } catch (e) {
      return response(['message' => 'some Thin gWrong Happened'], 406);
    }
  }
  public function logoutMobile(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully']);
  }
}