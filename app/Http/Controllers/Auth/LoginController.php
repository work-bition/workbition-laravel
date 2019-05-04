<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Validator;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

      /**
    * Handle a login request to the application.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function login(Request $request)
    {

      $rules = [

          $this->username() => 'required|email',

          'password' => 'required|string'

      ];

      $messages = [

          $this->username() . '.required' =>  '请输入邮箱账号。',

          $this->username() . '.email'    =>  '请输入正确的邮箱账号。',

          'password.required'             =>  '请输入密码。'

      ];

      $validator = Validator::make($request->all(), $rules, $messages);

      if ($validator->fails()) {

        return response()->json(['errors' => $validator->errors(), 'success' => false, 'status' => 422]);

      }

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {

            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);

        }

        if ($this->attemptLogin($request)) {

            return $this->sendLoginResponse($request);

        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
    * Get the failed login response instance.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Symfony\Component\HttpFoundation\Response
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    protected function sendFailedLoginResponse(Request $request)
    {

      return response()->json(['errors' => ['global' => ['邮箱账号和密码不匹配。']], 'success' => false, 'status' => 422]);

    }

    /**
    * Redirect the user after determining they are locked out.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return void
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    protected function sendLockoutResponse(Request $request)
    {

        return response()->json(['errors' => ['global' => ['尝试登录次数过多，请稍后再试。']], 'success' => false, 'status' => 429]);

    }

    /**
    * The user has been authenticated.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  mixed  $user
    * @return mixed
    */
    protected function authenticated(Request $request, $user)
    {

        return response()->json(['success' => true, 'status' => 200]);


    }

    /**
    * The user has logged out of the application.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return mixed
    */
    protected function loggedOut(Request $request)
    {

        return redirect()->back();

    }


    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
