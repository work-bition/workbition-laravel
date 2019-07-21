<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

  <head>
    <title>@yield('title', '优拾课堂 · 办公与数字生活指南') - {{ setting('site_name', '优涵课堂')}}</title>
    <link rel="stylesheet" href="{{ mix('css/main.css') }}">

    @yield('styles')

    <meta charset="utf-8">
    <meta name="description" content="@yield('description', setting('seo_description', '办公与数字生活指南'))" />
    <meta name="keyword" content="@yield('keyword', setting('seo_keyword', '职场,提升,工作,技能,办公,office, word,excel,ppt'))" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Start favicon in different devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico">
    <link rel="manifest" href="/favicons/site.webmanifest">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    <!-- End -->
  </head>

  <body class="{{ route_class() }}-page">

    @guest

      @include('layouts._account-modal')

    @endguest

    @include('layouts._main-sidebar')

    <div class="pusher">

          @include('layouts._header')

          @include('layouts._main-navigation')

          <div id="main_content">

              @include('shared._messages')

              @yield('content')

          </div>

          @include('layouts._footer')

    </div>

    @if (app()->isLocal())

      @include('sudosu::user-selector')

    @endif

    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>

    <!-- 云片行为验证 -->
    <script src="https://www.yunpian.com/static/official/js/libs/riddler-sdk-0.2.2.js"></script>
    <script src="https://cdn.bootcss.com/babel-polyfill/7.4.3/polyfill.min.js"></script>

    <script>

      window.onload = function () {

        $('#account_modal .login-register-box .account-register .content .form-box .ui.form .input-box .get-phone-code a').click(function(event) {

          // 初始化云片图片验证码
          var YpCaptcha =  new YpRiddler({

              expired: 10,

              mode: 'external',

              winWidth: 334,

              lang: 'zh-cn', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
              // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang

              container: document.getElementById('yunpian-captcha'),

              appId: '2d797943d96348c8922e375c7c4fbdaa',

              version: 'v1',

              onError: function (param) {

                  if (param.code == 429) {

                      alert('请求过于频繁，请稍后再试！')

                      return

                  }

                  // 异常回调
                  console.error('验证服务异常')

              },

              onSuccess: function (validInfo, close) {

                  // 成功回调

                  console.log(validInfo.token)

                  console.log(validInfo.authenticate)

                  getVerificationCode(validInfo.token, validInfo.authenticate)

                  close()

              },

              onFail: function (code, msg, retry) {

                  // 失败回调
                  alert('出错啦：' + msg + ' code: ' + code)

                  retry()



              },

              beforeStart: function (next) {

                  console.log('验证马上开始')

                  next()

              },

              onExit: function () {

                  // 退出验证 （仅限dialog模式有效）
                  console.log('退出验证')

              }

          })

        });

      };

    </script>


    @yield('scripts')

  </body>

</html>
