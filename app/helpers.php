<?php

function route_class()
{

  /* 将字符串中的'.'替换为'-' */
  /* 获取当前请求的路由名称 */
  return str_replace('.', '-', Route::currentRouteName());

}
