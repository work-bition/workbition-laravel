<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Handlers\ImageUploadHandler;


class UsersController extends Controller
{
    // /users/{user} @show users.show GET
    public function show(User $user)
    {

      return view('users.show', compact('user'));

    }

    // /users/{user}/edit @edit users.edit GET
    public function edit(User $user)
    {

      return view('users.edit', compact('user'));

    }

    // /users/{user} @update users.update PUT/PATDH
    public function update(UserRequest $request, ImageUploadHandler $uploader, User $user)
    {

      //dd($request->avatar);

      $data = $request->all();

      if ($request->avatar) {

        $result = $uploader->save($request->avatar, 'avatars', $user->id);

        if ($result) {

          $data['avatar'] = $result['path'];

        }

      }

      $user->update($data);

      //with方法写入session
      return redirect()->route('users.show', $user->id)->with('success','个人资料更新成功！');

    }
}
