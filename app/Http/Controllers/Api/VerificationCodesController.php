<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

        //字段验证

        $rules;

        $messages;

        $rules = [

            //'phone' => ['required', 'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/', 'unique:users'],
            
            //对手机号的验证，来自https://github.com/VincentSit/ChinaMobilePhoneNumberRegex
            'phone' => ['required', 'regex:/^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/', 'unique:users'],

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

        //结束验证



        //验证同一手机号短信发送频次限制
        //同一手机号在1分钟内只能发送1次验证码

        if (Cache::has($request->phone)) {

          Cache::increment($request->phone, 1);

        }

        else {

          //在Cache中以phone为key，初始值为1，1分钟以后过期
          Cache::put($request->phone, 1, now()->addMinutes(1));

        }

        if (Cache::get($request->phone) > 1) {

            return response()->json(['errors' => ['global' => ['同一个手机号1分钟内只能获取 1 条验证码']], 'success' => false, 'status' => 429]);

        }

        //结束验证



        //云片行为验证码二次验证
        $isCaptchaVerified = app(YunpianCaptchaVerification::class)->isVerified($request->captcha_token, $request->captcha_authenticate);

        //若验证通过
        if ($isCaptchaVerified) {

          if (!app()->environment('local')) {

              $code = '1234';

          }



          //使用云片发送验证码

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

                  Cache::forget($request->phone);

                  //云片设置
                  switch ($code) {

                    case 22:

                      $message = '同一个手机号1小时内只能获取 3 条验证码';

                      break;

                    case 17:

                      $message = '同一个手机号24小时内只能获取10条验证码';

                      break;

                    default:

                      $message = '获取验证码时遇到错误，请稍后再试';

                      break;
                  }

                  return response()->json(['errors' => ['global' => [$message]], 'success' => false, 'status' => 500, 'code' => $code ]);


              }

          }

          //结束发送



          $key = 'verificationCode_'.str_random(15);

          $expiredAt = now()->addMinutes(10);

          // 缓存验证码 10分钟过期。
          Cache::put($key, ['phone' => $request->phone, 'code' => $code], $expiredAt);

          return $this->response->array([

              'key' => $key,

              'expired_at' => $expiredAt->toDateTimeString(),

              'success' => true

          ])->setStatusCode(201);


        }

        else {

          return response()->json(['errors' => ['global' => ['验证码已失效。']], 'success' => false, 'status' => 422]);

        }

    }

}
