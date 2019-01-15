<!DOCTYPE html>
<html>

  <head>
    <title>积优课堂 · 办公与数字生活指南 </title>
    <link rel="stylesheet" href="{{ mix('css/main.css') }}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
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

  <body>

    <div id="account_modal" class="ui modal">
      <section class="close_button">

        <i class="close link icon"></i>

      </section>
      <section class="login-register-box">



        <section class="account-login">

          <div class="tabs-control account-login-tabs">

            <section class="header">

              <svg class="icon icon-login"><use xlink:href="#icon-login"></use></svg>

              <div class="password-login-title">密码登录</div>

              <div class="phone-code-login-title not-active-tab-title">手机验证码登录</div>

            </section>

          </div>

          <div class="ui active tab" data-tab="password-login-tab">

            <section class="password-login">

              <section class="content">

                <!-- benifits bar section will be cloned here  -->

                <section class="form-box">

                  <form class="ui password login form">

                    <section class="input-box">
                      <section class="ui input">
                        <input type="text" name="phone" placeholder="手机号/邮箱">
                      </section>
                    </section>

                    <section class="input-box">
                      <section class="ui input">
                        <input type="text" name="phoneCode" placeholder="密码">
                      </section>
                    </section>

                    <section class="forget-password-option">
                       <a href="#">忘记密码？</a>
                    </section>

                    <section class="submit">
                      <button class="ui primary button" type="submit">登录</button>
                    </section>

                  </form>

                </section>

                <!-- third login section will be cloned here -->

              </section>

              <section class="register-link">
                <p>还没有账号?<a class="switch-register" href="#">立即注册</a></p>
              </section>

            </section>

          </div>

          <div class="ui tab" data-tab="phone-code-login-tab">
            <section class="phone-code-login">

              <section class="content">

                <!-- benifits bar section will be cloned here -->

                <section class="form-box">

                  <form class="ui phone-code login form">

                    <section class="input-box">
                      <section class="ui input">
                        <input type="text" name="phone" placeholder="手机号">
                      </section>
                    </section>

                    <section class="input-box">
                      <section class="ui input">
                        <input type="text" name="phoneCode" placeholder="短信验证码">
                      </section>
                      <section class="get-phone-code">
                        <a href="#">获取短信验证码</a>
                      </section>
                    </section>

                    <section class="submit">
                      <button class="ui primary button" type="submit">登录</button>
                    </section>

                  </form>

                </section>

                <!-- third login section will be cloned here -->

              </section>

                <!-- register link section will be cloned here -->

            </section>
          </div>

        </section>


        <section class="account-register">

          <section class="header">

            <svg class="icon icon-register"><use xlink:href="#icon-register"></use></svg>

            <div class="title">注册账号</div>

          </section>

          <section class="content">

            <section class="benifits_bar">

              <div class="benifit_wrapper">
                <svg class="icon icon-study"><use xlink:href="#icon-study"></use></svg>
                <span>学习课程</span>
              </div>

              <div class="benifit_wrapper">
                <svg class="icon icon-sync"><use xlink:href="#icon-sync"></use></svg>
                <span>同步信息</span>
              </div>

              <div class="benifit_wrapper">
                <svg class="icon icon-discussion"><use xlink:href="#icon-discussion"></use></svg>
                <span>参与讨论</span>
              </div>

            </section>

            <section class="form-box">

              <form class="ui register form">

                <section class="input-box">
                  <section class="ui input">
                    <input type="text" name="phone" placeholder="手机号">
                  </section>
                </section>

                <section class="input-box">
                  <section class="ui input">
                    <input type="text" name="phoneCode" placeholder="短信验证码">
                  </section>
                  <section class="get-phone-code">
                    <a href="#">获取短信验证码</a>
                  </section>
                </section>

                <section class="submit">
                  <button class="ui primary button" type="submit">继续</button>
                </section>

              </form>

            </section>

            <section class="third-login">
              <div class="ui horizontal description divider">
                使用社交账号登录
              </div>
              <section class="third-list">
                <section class="weibo item">
                  <a href="#"><svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg></a>
                </section>
                <section class="weixin item">
                    <a href="#"><svg class="icon icon-weixin"><use xlink:href="#icon-weixin"></use></svg></a>
                </section>
              </section>
            </section>

          </section>

          <section class="login-link">
            <p>已有账号?<a class="switch-login" href="#">立即登录</a></p>
          </section>

        </section>

      </section>
    </div>

    <div id="main_sidebar" class="ui top sidebar">

          <div class="content_wrapper">

            <section class="sidebar_header">
              <!-- logo link will be cloned here -->
            </section>

            <section class="ui vertical labeled icon menu">

              <ul>

                <!-- items of the main navigation will be cloned here -->

              </ul>

              <section class="login_register_buttons">

                <div class="login_button">

                  <!-- chrome浏览器需要四个文字，负责圆角无法正常显示 -->
                  <div class="ui secondary button">登录</div>

                </div>
                <!-- Register button will be cloned here -->
              </section>

            </section>

            <section class="close_layer">

              <a href="#">关闭</a>

            </section>

          </div>

        </div>
    <div class="pusher">

          <header id="header">

              <div class="ui container">

                <div class="header_content">

                  <section class="logo_section">

                    <a class="logo_link" href="/" title="积优课堂">

                      <svg class="logo" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32">
                        <path fill="#2a6ea8" d="M32 16c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z"></path>
                        <path fill="#fff" d="M22.083 14.719h2.917v3.235c0 1.566-0.007 2.748-0.237 3.545s-0.513 1.461-0.85 1.992c-0.337 0.53-0.75 1.004-1.238 1.423-1.621 1.391-3.74 2.086-6.357 2.086-2.666 0-4.805-0.691-6.416-2.072-0.488-0.428-0.901-0.907-1.238-1.437s-0.615-1.179-0.835-1.948c-0.22-0.768-0.33-1.975-0.33-3.618v-9.258h3v9.287c0 1.916 0.164 3.249 0.604 3.998s1.108 1.35 2.007 1.802c0.898 0.452 1.958 0.678 3.179 0.678 1.738 0 3.154-0.452 4.248-1.357 0.576-0.486 0.991-1.060 1.245-1.722s0.301-1.795 0.301-3.399v-3.235z"></path>
                        <path fill="#fff" d="M9 7h0.042c0.805 0 1.458 0.653 1.458 1.458 0 0 0 0 0 0 0 0.403 0 0.806 0 1.208v0c0 0.828-0.672 1.5-1.5 1.5v0c-0.828 0-1.5-0.672-1.5-1.5v-1.167c0-0.828 0.672-1.5 1.5-1.5z"></path>
                        <path fill="#fff" d="M23.75 13.25c0.69 0 1.25 0.56 1.25 1.25v4.167c0 0.69-0.56 1.25-1.25 1.25s-1.25-0.56-1.25-1.25v-4.167c0-0.69 0.56-1.25 1.25-1.25z"></path>
                        <path fill="#fff" d="M14.5 7h9c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5h-9c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5z"></path>
                        <path fill="#fff" d="M14.5 13h9c0.828 0 1.5 0.672 1.5 1.5s-0.672 1.5-1.5 1.5h-9c-0.828 0-1.5-0.672-1.5-1.5s0.672-1.5 1.5-1.5z"></path>
                        <path fill="#000" d="M39.105 9.551c-1.992 0.138-3.084 0.207-3.278 0.207s-0.29-0.031-0.29-0.093c0-0.062 0.131-0.128 0.394-0.197 1.051-0.263 2.255-0.667 3.61-1.214s2.379-1.075 3.071-1.587c0.263 0.221 0.664 0.636 1.203 1.245s0.809 0.986 0.809 1.131c0 0.145-0.107 0.207-0.322 0.187s-0.477-0.031-0.788-0.031c-0.311 0-0.896 0.041-1.753 0.124-0.028 0.235-0.152 0.408-0.373 0.519v3.050h0.581c0.332-0.567 0.577-0.965 0.737-1.193s0.28-0.342 0.363-0.342c0.083 0 0.163 0.028 0.239 0.083s0.304 0.249 0.685 0.581c0.38 0.332 0.716 0.657 1.006 0.975v-3.631c0-0.609-0.021-1.21-0.062-1.805 0.982 0.249 1.798 0.574 2.448 0.975h3.091c0.124-0.304 0.266-0.581 0.425-0.83s0.266-0.398 0.322-0.446c0.055-0.048 0.111-0.073 0.166-0.073 0.138 0 0.488 0.183 1.048 0.55s0.996 0.667 1.307 0.903c0.311 0.235 0.467 0.456 0.467 0.664 0 0.277-0.242 0.491-0.726 0.643v5.042c0 0.733 0.007 1.203 0.021 1.411l0.021 0.581c0 0.069-0.028 0.135-0.083 0.197s-0.201 0.142-0.436 0.239c-0.235 0.097-0.557 0.19-0.965 0.28s-0.688 0.135-0.84 0.135c-0.152 0-0.242-0.035-0.27-0.104s-0.041-0.194-0.041-0.373v-0.581h-3.61v0.498c0 0.097-0.028 0.173-0.083 0.228s-0.19 0.131-0.405 0.228c-0.214 0.097-0.494 0.173-0.84 0.228s-0.636 0.083-0.871 0.083c-0.111 0-0.166-0.055-0.166-0.166l0.041-0.913c0.028-0.415 0.041-0.795 0.041-1.141v-2.241h-3.61v1.286c2.061 0.539 3.091 1.39 3.091 2.552 0 0.332-0.118 0.64-0.353 0.923s-0.508 0.425-0.819 0.425c-0.311 0-0.557-0.055-0.737-0.166s-0.297-0.245-0.353-0.405c-0.055-0.159-0.083-0.411-0.083-0.757 0-0.982-0.249-1.722-0.747-2.22v9.813c0 0.138-0.055 0.245-0.166 0.322s-0.346 0.156-0.705 0.239c-0.36 0.083-0.768 0.124-1.224 0.124-0.166 0-0.249-0.083-0.249-0.249l0.021-0.851c0.028-0.567 0.041-1.189 0.041-1.867v-4.689c-0.512 0.885-1.193 1.701-2.044 2.448s-1.345 1.12-1.483 1.12c-0.028 0-0.041-0.014-0.041-0.041 0-0.055 0.076-0.18 0.228-0.373 0.899-1.189 1.566-2.348 2.002-3.475s0.799-2.514 1.089-4.16h-2.012c-0.277 0-0.526 0.076-0.747 0.228l-0.539-0.975c0.332 0.041 0.678 0.062 1.037 0.062h2.51v-3.34zM50.889 16.087v-6.867h-3.237c-0.069 0.166-0.194 0.277-0.373 0.332v6.535h3.61zM49.167 18.514c0.221 0 0.868 0.225 1.94 0.674s1.978 1.068 2.718 1.857c0.74 0.788 1.11 1.584 1.11 2.386 0 0.526-0.152 0.958-0.456 1.297s-0.688 0.508-1.151 0.508c-0.463 0-0.806-0.121-1.027-0.363s-0.367-0.612-0.436-1.11c-0.207-1.342-0.491-2.362-0.851-3.060s-0.934-1.331-1.722-1.898c-0.138-0.097-0.207-0.169-0.207-0.218s0.028-0.073 0.083-0.073zM46.512 18.701c0.526 0.166 1.11 0.422 1.753 0.768s0.999 0.557 1.068 0.633c0.069 0.076 0.104 0.156 0.104 0.239 0 0.152-0.107 0.235-0.322 0.249s-0.394 0.062-0.539 0.145c-0.145 0.083-0.391 0.29-0.737 0.622-1.397 1.314-2.708 2.331-3.932 3.050s-1.912 1.079-2.064 1.079c-0.055 0-0.083-0.028-0.083-0.083s0.055-0.131 0.166-0.228c1.19-0.982 2.106-1.957 2.749-2.925s1.255-2.151 1.836-3.548zM59.633 15.029c-0.29 0.443-0.809 1.079-1.556 1.909s-1.183 1.245-1.307 1.245c-0.041 0-0.062-0.028-0.062-0.083s0.048-0.159 0.145-0.311c1.992-3.209 3.195-6.923 3.61-11.141 0.954 0.235 1.722 0.456 2.303 0.664s0.899 0.335 0.954 0.384c0.055 0.048 0.083 0.107 0.083 0.176 0 0.138-0.080 0.228-0.239 0.27s-0.294 0.149-0.405 0.322c-0.111 0.173-0.342 0.643-0.695 1.411s-0.75 1.566-1.193 2.396c0.678 0.152 1.089 0.266 1.234 0.342s0.218 0.152 0.218 0.228c0 0.076-0.028 0.142-0.083 0.197 0.318 0.041 0.65 0.062 0.996 0.062h2.697c0.055-1.203 0.083-2.369 0.083-3.496s-0.021-2.133-0.062-3.019c0.705 0.097 1.369 0.218 1.992 0.363s0.992 0.252 1.11 0.322c0.118 0.069 0.176 0.145 0.176 0.228s-0.097 0.18-0.29 0.29c-0.194 0.111-0.297 0.429-0.311 0.954-0.014 0.954-0.131 2.407-0.353 4.357h3.797c0.18-0.373 0.363-0.705 0.55-0.996s0.311-0.47 0.373-0.539c0.062-0.069 0.135-0.104 0.218-0.104 0.166 0 0.612 0.273 1.338 0.819s1.089 0.934 1.089 1.162c0 0.228-0.214 0.342-0.643 0.342h-3.403c0.014 0.18-0.138 0.339-0.456 0.477v8.382c0 0.456 0.239 0.685 0.716 0.685s0.84-0.083 1.089-0.249c0.249-0.166 0.477-0.494 0.685-0.985s0.456-1.283 0.747-2.376c0.041-0.166 0.097-0.249 0.166-0.249s0.104 0.076 0.104 0.228l-0.041 0.809c0 1.259 0.339 2.095 1.017 2.51 0.332 0.194 0.498 0.422 0.498 0.685 0 0.373-0.28 0.771-0.84 1.193s-1.739 0.633-3.537 0.633c-1.3 0-2.13-0.142-2.49-0.425s-0.539-0.951-0.539-2.002v-9.315h-0.539c-0.18 1.632-0.367 2.877-0.56 3.734s-0.474 1.736-0.84 2.635c-0.367 0.899-0.775 1.677-1.224 2.334s-0.968 1.241-1.556 1.753c-0.588 0.512-1.134 0.896-1.639 1.151s-0.785 0.384-0.84 0.384c-0.055 0-0.083-0.021-0.083-0.062s0.062-0.104 0.187-0.187c1.203-0.83 2.203-2.216 2.998-4.16s1.228-4.471 1.297-7.583h-2.427c-0.277 0-0.526 0.076-0.747 0.228l-0.519-0.934c-0.152 0.124-0.27 0.201-0.353 0.228v11.12c0 0.221-0.076 0.387-0.228 0.498s-0.46 0.218-0.923 0.322c-0.463 0.104-0.84 0.156-1.131 0.156s-0.436-0.138-0.436-0.415l0.062-1.95c0.014-0.609 0.021-1.183 0.021-1.722v-6.286zM70.255 7.829c0.346 0 0.858 0.083 1.535 0.249s1.179 0.398 1.504 0.695c0.325 0.297 0.488 0.667 0.488 1.11s-0.131 0.802-0.394 1.079c-0.263 0.277-0.602 0.415-1.017 0.415s-0.712-0.107-0.892-0.322c-0.18-0.214-0.27-0.494-0.27-0.84 0-0.899-0.318-1.604-0.954-2.116-0.124-0.097-0.187-0.166-0.187-0.207s0.062-0.062 0.187-0.062zM87.546 7.497h5.934c0.235-0.47 0.418-0.799 0.55-0.986s0.252-0.28 0.363-0.28c0.111 0 0.474 0.176 1.089 0.529s1.034 0.629 1.255 0.83c0.221 0.201 0.332 0.349 0.332 0.446 0 0.221-0.249 0.401-0.747 0.539v3.776l0.041 1.909c0 0.138-0.035 0.242-0.104 0.311s-0.342 0.166-0.82 0.29c-0.477 0.124-0.93 0.187-1.359 0.187-0.111 0-0.187-0.031-0.228-0.093s-0.062-0.176-0.062-0.342v-0.394h-2.137v2.427h2.635c0.512-0.747 0.816-1.176 0.913-1.286s0.19-0.166 0.28-0.166c0.090 0 0.353 0.152 0.788 0.456s0.813 0.598 1.131 0.882c0.318 0.284 0.477 0.481 0.477 0.591 0 0.138-0.138 0.207-0.415 0.207h-5c0.47 0.941 1.21 1.808 2.22 2.604s2.026 1.352 3.050 1.67c0.18 0.055 0.27 0.111 0.27 0.166s-0.097 0.111-0.29 0.166c-0.733 0.235-1.39 0.74-1.971 1.515-0.152 0.207-0.277 0.311-0.373 0.311-0.18 0-0.598-0.367-1.255-1.1s-1.172-1.542-1.546-2.427c-0.373-0.885-0.588-1.853-0.643-2.905h-0.27v5.228c0 0.456 0.007 0.941 0.021 1.452l0.041 0.705c0 0.111-0.024 0.19-0.073 0.239s-0.315 0.131-0.799 0.249c-0.484 0.118-0.854 0.176-1.11 0.176s-0.398-0.021-0.425-0.062c-0.028-0.041-0.041-0.124-0.041-0.249l0.041-0.934c0.014-0.636 0.021-1.217 0.021-1.743v-2.884c-1.328 1.604-2.687 2.822-4.077 3.651s-2.196 1.245-2.417 1.245c-0.055 0-0.083-0.014-0.083-0.041 0-0.055 0.104-0.159 0.311-0.311 1.176-0.885 2.199-1.926 3.071-3.122s1.466-2.396 1.784-3.6h-2.822c-0.277 0-0.526 0.076-0.747 0.228l-0.539-0.975c0.332 0.041 0.678 0.062 1.037 0.062h4.481v-2.427h-2.075v0.643c0 0.111-0.038 0.201-0.114 0.27s-0.342 0.156-0.799 0.259c-0.456 0.104-0.851 0.156-1.183 0.156-0.111 0-0.166-0.055-0.166-0.166l0.041-1.017c0.028-0.456 0.041-0.892 0.041-1.307v-4.627c0-0.609-0.021-1.21-0.062-1.805 0.927 0.277 1.77 0.567 2.531 0.871zM89.331 8.182h-1.763c-0.069 0.138-0.173 0.228-0.311 0.27v2.178h2.075v-2.448zM93.791 10.63v-2.448h-1.743c-0.055 0.18-0.187 0.311-0.394 0.394v2.054h2.137zM89.331 11.315h-2.075v2.22h2.075v-2.22zM93.791 13.535v-2.22h-2.137v2.22h2.137zM79.58 6.854c0.595 0 1.234 0.093 1.919 0.28s1.203 0.47 1.556 0.851c0.353 0.38 0.529 0.806 0.529 1.276s-0.152 0.858-0.456 1.162c-0.304 0.304-0.685 0.456-1.141 0.456-0.678 0-1.044-0.373-1.1-1.12s-0.173-1.304-0.353-1.67c-0.18-0.367-0.425-0.643-0.737-0.83s-0.467-0.301-0.467-0.342c0-0.042 0.083-0.062 0.249-0.062zM83.044 20.423c1.591-1.010 2.555-1.611 2.894-1.805s0.532-0.29 0.581-0.29c0.048 0 0.073 0.021 0.073 0.062s-0.055 0.118-0.166 0.228c-0.484 0.539-1.221 1.442-2.21 2.707s-1.732 2.251-2.23 2.956c-0.097 0.138-0.183 0.207-0.259 0.207s-0.142-0.024-0.197-0.073c-0.055-0.048-0.194-0.273-0.415-0.674s-0.463-0.854-0.726-1.359c-0.263-0.505-0.394-0.785-0.394-0.84 0-0.097 0.062-0.187 0.187-0.27 0.36-0.263 0.539-0.539 0.539-0.83v-6.473h-1.286c-0.277 0-0.526 0.076-0.747 0.228l-0.539-0.975c0.332 0.041 0.678 0.062 1.037 0.062h1.245c0.318-0.636 0.508-0.999 0.571-1.089s0.173-0.135 0.332-0.135c0.159 0 0.602 0.225 1.328 0.674s1.089 0.764 1.089 0.944c0 0.18-0.235 0.339-0.705 0.477v6.266zM107.971 11.854v-3.506c0-0.636-0.014-1.293-0.041-1.971 1.425 0.124 2.334 0.225 2.728 0.301s0.591 0.19 0.591 0.342c0 0.152-0.194 0.353-0.581 0.602v4.232h1.369c0.526-1.508 0.913-3.084 1.162-4.73 0.595 0.207 1.186 0.45 1.774 0.726s0.986 0.474 1.193 0.591c0.207 0.118 0.311 0.225 0.311 0.322s-0.142 0.18-0.425 0.249c-0.284 0.069-0.609 0.249-0.975 0.539s-1.221 1.058-2.562 2.303h2.718c0.401-0.664 0.643-1.058 0.726-1.183s0.18-0.187 0.29-0.187c0.111 0 0.353 0.111 0.726 0.332s0.792 0.501 1.255 0.84c0.463 0.339 0.74 0.567 0.83 0.685s0.135 0.242 0.135 0.373c0 0.131-0.055 0.242-0.166 0.332s-0.28 0.128-0.508 0.114c-0.228-0.014-0.363-0.021-0.405-0.021-1.189 0-2.172 0.408-2.946 1.224 0.304 0.166 0.456 0.329 0.456 0.488s-0.256 0.315-0.768 0.467v2.261c0 0.235 0.007 0.443 0.021 0.622l0.041 0.456c0 0.083-0.024 0.145-0.073 0.187s-0.221 0.118-0.519 0.228c-0.297 0.111-0.622 0.183-0.975 0.218s-0.591 0.052-0.716 0.052c-0.124 0-0.204-0.021-0.239-0.062s-0.052-0.124-0.052-0.249v-0.498h-1.307c-0.014 0.083-0.131 0.201-0.353 0.353v2.158h2.863c0.622-1.079 1.013-1.618 1.172-1.618s0.595 0.297 1.307 0.892c0.712 0.595 1.068 0.979 1.068 1.151s-0.118 0.259-0.353 0.259h-6.058v2.925h4.419c0.235-0.373 0.481-0.761 0.737-1.162s0.415-0.636 0.477-0.705c0.062-0.069 0.128-0.104 0.197-0.104 0.166 0 0.671 0.356 1.515 1.068s1.266 1.155 1.266 1.328c0 0.173-0.138 0.259-0.415 0.259h-17.801c-0.277 0-0.526 0.076-0.747 0.228l-0.539-0.975c0.332 0.041 0.678 0.062 1.037 0.062h7.096v-2.925h-4.627c-0.277 0-0.526 0.076-0.747 0.228l-0.539-0.975c0.332 0.041 0.678 0.062 1.037 0.062h4.876v-2.51h-1.639v0.415c0 0.083-0.017 0.145-0.052 0.187s-0.176 0.104-0.425 0.187c-0.249 0.083-0.571 0.156-0.965 0.218s-0.723 0.093-0.986 0.093c-0.097 0-0.138-0.069-0.124-0.207 0.028-0.318 0.041-0.83 0.041-1.535v-2.697c0-0.581-0.021-1.169-0.062-1.764 0.858 0.235 1.674 0.519 2.448 0.851h5.768c0.387-0.622 0.619-0.972 0.695-1.048s0.163-0.114 0.259-0.114c0.207 0 0.858 0.339 1.95 1.017 0.152-0.36 0.325-0.892 0.519-1.598h-12.241c0.041 0.678-0.121 1.259-0.488 1.743s-0.82 0.726-1.359 0.726c-0.36 0-0.647-0.104-0.861-0.311s-0.322-0.494-0.322-0.861c0-0.367 0.207-0.73 0.622-1.089s0.712-0.671 0.892-0.934c0.18-0.263 0.27-0.595 0.27-0.996l-0.021-0.519c0-0.138 0.035-0.207 0.104-0.207s0.228 0.187 0.477 0.56c0.249 0.373 0.436 0.775 0.56 1.203h4.979zM112.348 17.85v-2.884h-5.602c-0.097 0.166-0.249 0.29-0.456 0.373v2.51h6.058zM103.095 7.684c1.162 0 2.064 0.211 2.707 0.633s0.965 0.916 0.965 1.483c0 0.456-0.163 0.84-0.488 1.151s-0.66 0.467-1.006 0.467c-0.346 0-0.619-0.093-0.82-0.28s-0.315-0.446-0.342-0.778c-0.041-0.636-0.149-1.134-0.322-1.494s-0.453-0.657-0.84-0.892c-0.166-0.111-0.249-0.187-0.249-0.228s0.131-0.062 0.394-0.062z"></path>
                      </svg>

                    </a>

                  </section>

                  <section class="right_wrap">

                    <div class="right menu">

                      <a class="login button" href="#">登录</a>

                      <span class="divider_item"> / </span>

                      <div class="register_button">

                       <div class="ui primary register button">注册账号</div>

                      </div>

                      <div class="ui search item">

                        <div class="ui left icon input">

                          <i class="search link icon"></i>

                          <input class="prompt" type="text" placeholder="搜索内容" autocorrect="off" autocapitalize="off" maxlength="30">

                        </div>

                        <i class="close link icon"></i>

                        <div class="results"></div>

                      </div>

                      <div class="menu_button"><i class="large align justify link icon"></i></div>

                    </div>

                  </section>

                </div>

              </div>

          </header>

          <nav id="main_nav">

            <div class="ui container">

              <div class="content">

                <div class="left menu">

                    <a href="#" class="item"><i class="large compass outline icon"></i> 课程 </a>

                    <a href="#" class="item"><i class="large newspaper outline icon"></i> 专栏 </a>

                    <a href="#" class="active item"><i class="large bullseye icon"></i> 1分钟有用功 </a>

                    <a href="#" class="item"><i class="large file alternate outline icon"></i> Bigger 文章 </a>

                    <a href="#" class="item"><i class="large star outline icon"></i> 内容选荐 </a>

                    <a href="#" class="item"><i class="large window restore outline icon"></i> 知识框架 </a>

                    <a href="#" class="item"><i class="large bell outline icon"></i> 限时免费课程 </a>

                </div>

              </div>

            </div>

          </nav>

          <div id="main_content">

              <div class="ui container">

                <div class="page_banners">

                  <div class="ui top left attached blue label featured_label">招牌课程</div>

                  <div class="main_banner featured_carousel">

                    <div class="item">

                     <a href="http://www.sspai.com" target="_blank" class="image_holder banner1">

                       <div class="overlay"></div>

                       <div class="header">数字管理密码工具1Password完全使用指南</div>

                     </a>

                    </div>

                    <div class="item">

                      <a href="#" target="_blank" class="image_holder banner2">

                        <div class="overlay"></div>

                        <div class="header">樱花树与机械姬：DIOR 2019 早秋男装系列东京发布秀有够劲！</div>

                      </a>

                    </div>

                    <div class="item">

                      <a href="#" target="_blank" class="image_holder banner3">

                        <div class="overlay"></div>

                        <div class="header">樱花树与机械姬：DIOR 2019 早秋男装系列东京发布秀有够劲！</div>

                      </a>

                    </div>

                    <div class="item">

                      <a href="#" target="_blank" class="image_holder banner4">

                        <div class="overlay"></div>

                        <div class="header">樱花树与机械姬：DIOR 2019 早秋男装系列东京发布秀有够劲！</div>

                      </a>

                    </div>

                    <div class="item">

                      <a href="#" target="_blank" class="image_holder banner5">

                        <div class="overlay"></div>

                        <div class="header">樱花树与机械姬：DIOR 2019 早秋男装系列东京发布秀有够劲！</div>

                      </a>

                    </div>

                    <div class="item">

                      <a href="#" target="_blank" class="image_holder banner6">

                        <div class="overlay"></div>

                        <div class="header">樱花树与机械姬：DIOR 2019 早秋男装系列东京发布秀有够劲！</div>

                      </a>

                    </div>

                  </div>

                  <div class="corner_banners">

                    <!-- <a class="ui red right ribbon label">热门</a> -->

                    <div class="corner_banner corner_banner1">

                      <a class="card_area" href="#">

                         <div class="image_holder">

                            <div class="card_image banner1"></div>

                         </div>

                         <div class="card_content">

                           <h6 class="red">人气口碑课程</h6>

                           <p class="card__content--h5 slate strong">零基础入门 AI，跟随硅谷导师迈出高薪第一步</p>

                         </div>

                      </a>

                    </div>

                    <div class="corner_banner corner_banner2">

                      <a class="card_area" href="#">

                         <div class="image_holder">

                            <div class="card_image banner2"></div>

                         </div>

                         <div class="card_content">

                           <h6 class="red">人气口碑课程</h6>

                           <p class="card__content--h5 slate strong">零基础入门 AI，跟随硅谷导师迈出高薪第一步</p>

                         </div>

                      </a>

                    </div>

                    <div class="corner_banner corner_banner3">

                      <a class="card_area" href="#">

                         <div class="image_holder banner3">

                            <div class="card_image banner3"></div>

                         </div>

                         <div class="card_content">

                           <h6 class="red">人气口碑课程</h6>

                           <p class="card__content--h5 slate strong">零基础入门 AI，跟随硅谷导师迈出高薪第一步</p>

                         </div>

                      </a>

                    </div>

                  </div>

                </div>

              </div>

          </div>

      </div>

    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>

  </body>

</html>
