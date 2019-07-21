<?php

namespace App\Handlers;

class YunpianCaptchaVerification
{

  public function isVerified($token, $authenticate)
  {

      $params = array();

      $params["authenticate"] = $authenticate;//用户验证通过后，返回的参数

      $params["token"] = $token;//前端返回的 token

      $params["captchaId"] =config('yunpiancaptcha.sliding_puzzle.captcha_id');//验证产品 id

      $params["secretId"] =config('yunpiancaptcha.sliding_puzzle.secret_id');//验证产品 secretId

      $secretKey = config('yunpiancaptcha.sliding_puzzle.secret_key');//验证产品 secretKey

      $params["version"] = "1.0";//版本，固定值1.0

      $params["timestamp"] = sprintf("%d", round(microtime(true)*1000));// 当前时间戳的毫秒值，如1541064141441

      $params["nonce"] = sprintf("%d", rand(1,99999)); //随机正整数, 在 1-99999 之间

      ksort($params); // 参数排序

      $buff="";

      foreach($params as $key=>$value){
              $buff .=$key;
              $buff .=$value;
      }

      $buff .= $secretKey;

      //print_r($buff);

      $signature=md5($buff);

      $params["signature"] =$signature ;//签名信息，见签名计算方法

      $url="https://captcha.yunpian.com/v1/api/authenticate";

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);

      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

      /* 设置返回结果为流 */
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      /* 设置超时时间*/
      curl_setopt($ch, CURLOPT_TIMEOUT, 10);

      /* 设置通信方式 */
      curl_setopt($ch, CURLOPT_POST, 1);

      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/x-www-form-urlencoded'));

      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));

      $result = curl_exec($ch);

      $code = json_decode ($result, true)['code'];

      if ($code === 0) {

        return true;

      }

      else {

        return false;

      }

  }

}
