<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {

      //字段验证

      $rules = [

        //'phone' => ['required', 'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/', 'unique:users'],

        //对手机号的验证，来自https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
        'phone' => ['required', 'regex:/^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/', 'unique:users'],

        'password' => ['required', 'between:6,16', 'string'],

        'phoneCode' => ['required', 'digits:4']

      ];

      $messages = [

          'phone.required' =>  '请输入手机号',

          'phone.regex' =>  '请输入正确的手机号',

          'phone.unique' =>  '此手机号已被注册',

          'password.required' =>  '请输入密码',

          'password.between' =>  '请确保密码长度在8-16位之间',

          'phoneCode.required' =>  '请输入手机验证码',

          'phoneCode.digits' =>  '请输入4位数字的手机验证码'

      ];

      $validator = Validator::make($request->all(), $rules, $messages);

      if ($validator->fails()) {

        return response()->json(['errors' => $validator->errors(), 'success' => false, 'status' => 422]);

      }

      //结束验证



      $verifyData = \Cache::get($request->phone);

      if (!$verifyData) {

          return response()->json(['errors' => [['短信验证码已失效，请重新获取']], 'success' => false, 'status' => 422]);

      }

      if (!hash_equals($verifyData['code'], $request->phoneCode)) {

          return response()->json(['errors' => [['验证码错误']], 'success' => false, 'status' => 401]);

      }

      $user = User::create([

          'name' => 'hellomotor',

          'phone' => $request->phone,

          'password' => Hash::make($request->password)

      ]);

      // 清除验证码缓存
      \Cache::forget($request->phone);

      event(new Registered($user));

      $this->guard()->login($user);

      return $this->registered($request, $user)
                      ?: response()->json(['success' => true, 'status' => 200]);


    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'max:20', 'confirmed'],
            'captcha' => ['required', 'captcha']
        ],[
            'captcha.required' => '验证码不能为空',
            'captcha.captcha' => '请输入正确的验证码'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
