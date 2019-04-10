<?php

namespace App\Http\Middleware;

use Closure;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

      // 三个判断：
      // 1. 如果用户已经登录
      // 2. 并且还未认证 Email
      // 3. 并且访问的不是 email 验证相关 URL 或者退出登录的 URL。
      if ( $request -> user() && ! $request -> user() -> hasVerifiedEmail() && ! $request -> is('email/*', 'logout')) {

        //expectsJson方法判断是否是Ajax请求
        //403错误表示没有权限访问资源
        //redirect()->route('verification.notice')跳转到通知验证邮箱的页面
        return $request -> expectsJson() ? abort(403, 'Your email address is not verified.') : redirect() -> route('verification.notice');


      }

        return $next($request);
    }
}