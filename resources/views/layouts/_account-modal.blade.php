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

            <section class="error-box">

              <div class="ui error message">

                <i class="close icon"></i>

                <ul class="list">
                  <!-- errors will be shown here  -->
                </ul>

              </div>

            </section>

            <!-- benifits bar section will be cloned here  -->

            <section class="form-box">

              <form class="ui password login form" method="post" action="{{ route('login.validate') }}">

                {{ csrf_field() }}

                <section class="input-box">

                  <section class="ui input">

                    <!-- if the name设置成email，safari密码填充框会偏移-->
                    <input name="email_name" type="text" placeholder="手机号/邮箱">

                  </section>

                </section>

                <section class="input-box">

                  <section class="ui input">

                    <input name="password" type="password" placeholder="密码">

                  </section>

                </section>

                <section class="forget-password-option">

                   <a target="_blank" href="/forget">忘记密码？</a>

                </section>

                <section class="submit">

                  <button class="ui primary button" type="submit">登录</button>

                </section>

              </form>

            </section>

            <!-- third login section will be cloned here -->

            <section class="register-link">
              <p>还没有账号?<a class="switch-register">立即注册</a></p>
            </section>

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
                    <a target="_blank" href="/getcode">获取短信验证码</a>
                  </section>
                </section>

                <section class="submit">
                  <button class="ui primary button" type="submit">登录</button>
                </section>

              </form>

            </section>

            <!-- third login section will be cloned here -->

            <!-- register link section will be cloned here -->

          </section>

        </section>

      </div>

    </section>


    <section class="account-register">

      <section class="header">

        <svg class="icon icon-register"><use xlink:href="#icon-register"></use></svg>

        <div class="title">注册账号</div>

      </section>

      <section class="content">

        <section class="error-box">

          <div class="ui error message">

            <i class="close icon"></i>

            <ul class="list">
              <!-- errors will be shown here  -->
            </ul>

          </div>

        </section>

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

          <form class="ui register form" method="post"  action="{{app('Dingo\Api\Routing\UrlGenerator')->version('v1')->route('api.verificationCodes.store')}}">

            {{ csrf_field() }}

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

                <a>获取短信验证码</a>

              </section>

            </section>

            <section id="yunpian-captcha">

            </section>

            <section class="submit">

              <button class="ui primary button" type="submit">下一步</button>

            </section>

          </form>

        </section>

        <section class="third-login">
          <div class="ui horizontal description divider">
            使用第三方账号登录
          </div>
          <section class="third-list">
            <section class="weibo item">
              <a target="_blank" href="/thirdlogin"><svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg></a>
            </section>
            <section class="weichat item">
                <a target="_blank" href="/thirdlogin"><svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg></a>
            </section>
          </section>
        </section>

        <section class="login-link">

          <p>已有账号?<a class="switch-login">立即登录</a></p>

        </section>

      </section>

    </section>

  </section>

</div>
