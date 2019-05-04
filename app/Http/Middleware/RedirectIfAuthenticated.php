<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {


        /* 这个类被guest中间件调用，因为我们采用ajax登录，所以我们不需要跳转 */
        if ($request -> ajax() || $request -> expectsJson() ) {

            return $next($request);

        }

        if (Auth::guard($guard)->check()) {

            return redirect('/');

        }

        return $next($request);
    }
}
