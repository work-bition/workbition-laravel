<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Middleware\ThrottleRequests;

class jsonThrottle extends ThrottleRequests
{

  /**
  * Handle an incoming request.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \Closure  $next
  * @param  int|string  $maxAttempts
  * @param  float|int  $decayMinutes
  * @return \Symfony\Component\HttpFoundation\Response
  *
  * @throws \Illuminate\Http\Exceptions\ThrottleRequestsException
  */

  public function handle($request, Closure $next, $maxAttempts = 60, $decayMinutes = 1)
  {

      $key = $this->resolveRequestSignature($request);

      $maxAttempts = $this->resolveMaxAttempts($request, $maxAttempts);

      if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {

        return response()->json(['errors' => ['global' => ['请求次数过多，请稍后再试。']], 'success' => false, 'status' => 429]);

      }

      $this->limiter->hit($key, $decayMinutes);

      $response = $next($request);

      return $this->addHeaders(

          $response, $maxAttempts,

          $this->calculateRemainingAttempts($key, $maxAttempts)

      );

  }

}
