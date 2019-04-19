<?php

function route_class()
{

  /* 将字符串中的'.'替换为'-' */
  /* 获取当前请求的路由名称 */
  return str_replace('.', '-', Route::currentRouteName());

}

function make_excerpt($value, $length = 200)
{

  //先将$value去除html标记，然后再将其中的回车、换行符替换为空格
  $excerpt = trim(preg_replace('/\r\n|\r|\n+/', ' ', strip_tags($value)));

  return str_limit($excerpt, $length);

}
