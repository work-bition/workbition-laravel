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

    <!-- Start favicons in different devices -->
    <!-- from https://realfavicongenerator.net/ -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=9BPMMr2XBO">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=9BPMMr2XBO">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=9BPMMr2XBO">
    <link rel="manifest" href="/favicons/site.webmanifest?v=9BPMMr2XBO">
    <link rel="shortcut icon" href="/favicon.ico?v=9BPMMr2XBO">
    <!-- 用于Mac Touch Bar，目前测试会在Mac Safari标签栏上不正常显示，覆盖favicon.ico的设置 -->
    <!-- <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=9BPMMr2XBO" color="#2688b6"> -->
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=9BPMMr2XBO">
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

      var puzzleShowUpWatcher = setInterval(function(){

        if($('#register-yunpian-captcha .yp-riddler-win-masker').css('display')=='block'){

          $('#register-yunpian-captcha .yp-riddler-button_text').text('请完成拼图');

        }

      }, 100);

      function stopPuzzleWatcher() {

          clearInterval(puzzleWatcher);

      }

      function InitializingYpCaptcha(captcha_mode) {

        window.onload = function () {

          // 初始化云片图片验证码
          var YpCaptcha =  new YpRiddler({

              expired: 1,

              mode: captcha_mode,

              winWidth: 334,

              noButton: false,

              lang: 'zh-cn', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
              // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang

              container: document.getElementById('register-yunpian-captcha'),

              appId: '2d797943d96348c8922e375c7c4fbdaa',

              version: 'v1',

              onError: function (param) {

                $('#register-yunpian-captcha .yp-riddler-button_text').text('请点击按钮开始验证');

                //alert('bad')

                if (param.code == 429) {

                    alert('请求过于频繁，请稍后再试！')

                    return

                }

                showErrorBox({

                  tabName: '.account-register',

                  errorsBag: [['验证服务异常']],

                  formBox: {

                    marginTopDistance: '0'

                  }

                });

                // 异常回调
                //console.error('验证服务异常')

              },

              onSuccess: function (validInfo, close, useDefaultSuccess) {

                  //$('#register-yunpian-captcha .yp-riddler-button_text').text('请点击按钮开始验证');

                  // 成功回调

                  useDefaultSuccess(true)

                  getVerificationCode(validInfo.token, validInfo.authenticate)

                  close()

              },

              onFail: function (code, msg, retry) {

                  $('#register-yunpian-captcha .yp-riddler-button_text').text('请点击按钮开始验证');

                  // 失败回调
                  alert('出错啦：' + msg + ' code: ' + code)

                  retry()



              },

              beforeStart: function (next) {

                  console.log('验证马上开始')

                  $('#register-yunpian-captcha .yp-riddler-button_text').text('正在获取拼图...');

                  next()

              },

              onExit: function () {

                  $('#register-yunpian-captcha .yp-riddler-button_text').text('请点击按钮开始验证');

                  // 退出验证 （仅限dialog模式有效）
                  console.log('退出验证')

              }

          });

        };

      }

      if (!isIE11) {

        InitializingYpCaptcha('dialog');

      }

      else {

        InitializingYpCaptcha('float');

        $('#register-yunpian-captcha').mouseleave(function(event) {

          $('#register-yunpian-captcha .yp-riddler-button_text').text('请点击按钮开始验证');

        });

      }

    </script>


    @yield('scripts')

  </body>

</html>
