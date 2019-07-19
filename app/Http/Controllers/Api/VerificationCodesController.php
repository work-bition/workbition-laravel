<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Overtrue\EasySms\EasySms;
use Validator;
use App\Handlers\YunpianCaptchaVerification;

class VerificationCodesController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jsonThrottle:10:1');
    }

    //增加了 store 方法，利用 DingoApi 的 Helpers trait，我们可以使用 $this->response->array 返回一个测试用的响应。
    public function store(Request $request, EasySms $easySms)
    {

        $rules;

        $messages;

        $rules = [

            'phone' => ['required', 'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/', 'unique:users'],

            'captcha_token' => ['required'],

            'captcha_authenticate' => ['required']

        ];

        $messages = [

            'phone.required' =>  '请输入手机号。',

            'phone.regex'    =>  '请输入正确的手机号。',

            'phone.unique'   =>  '此手机号已经注册。',

            'captcha_token'  =>  'captcha token的值不能为空。',

            'captcha_authenticate'  =>  'captcha authenticate的值不能为空。'

        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {

          return response()->json(['errors' => $validator->errors(), 'success' => false, 'status' => 422]);

        }


        if (\Cache::has($request->phone)) {

          \Cache::increment($request->phone, 1);

        }

        else {

          \Cache::put($request->phone, 1, now()->addMinutes(1));

        }

        if (\Cache::get($request->phone) > 3) {

            return $this->response->error('同一手机号在1分钟内只能发送3次验证码', 429);

        }


//        $captchaData = \Cache::get($request->captcha_key);

//        if (!$captchaData) {

//            return $this->response->error('图片验证码已失效', 422);

//        }

//        if (!hash_equals($captchaData['code'], $request->captcha_code)) {

//            // 验证错误就清除缓存
//            \Cache::forget($request->captcha_key);

//            return $this->response->errorUnauthorized('验证码错误');

//        }

//        $phone = $captchaData['phone'];

        $isCaptchaVerified = app(YunpianCaptchaVerification::class)->isVerified($request->captcha_token, $request->captcha_authenticate);

        if ($isCaptchaVerified) {

          if (!app()->environment('local')) {

              $code = '1234';

          }

          else {

              // 生成4位随机数，左侧补0
              $code = str_pad(random_int(1, 9999), 4, 0, STR_PAD_LEFT);

              try {

                  $result = $easySms->send($request->phone, [

                      'content'  =>  "【王振东】您的验证码是{$code}。如非本人操作，请忽略本短信"

                  ]);

              }

              catch (\Overtrue\EasySms\Exceptions\NoGatewayAvailableException $exception) {

                  $message = $exception->getException('yunpian')->getMessage();

                  $code = $exception->getException('yunpian')->getCode();

                  //return $this->response->errorInternal('错误代码' . $code. ':' . $message ?? '短信发送异常');

                  return response()->json(['errors' => ['global' => [$message]], 'success' => false, 'status' => 500, 'code' => $code ]);


              }

          }

          $key = 'verificationCode_'.str_random(15);

          $expiredAt = now()->addMinutes(10);

          // 缓存验证码 10分钟过期。
          \Cache::put($key, ['phone' => $request->phone, 'code' => $code], $expiredAt);

          // 清除图片验证码缓存
          \Cache::forget($request->captcha_key);

          return $this->response->array([

              'key' => $key,

              'expired_at' => $expiredAt->toDateTimeString(),

          ])->setStatusCode(201);


        }

        else {

          return response()->json(['errors' => ['global' => ['图片验证码已失效']], 'success' => false, 'status' => 422]);

        }



    }

}
