<header id="header">

    <div class="ui container">

      <div class="header_content">

        <section class="logo_section">

          <a class="logo_link" href="{{ url('/') }}" title="积优课堂">

            <svg class="icon icon-logo"><use xlink:href="#icon-logo"></use></svg>

          </a>

        </section>

        <section class="right_wrap">

          <div class="right menu">

            <div class="wechat-official-platform">

              <a href="#" class="text button">

                <svg class="icon icon-wechat" style="width:1.5rem;height:1.5rem;"><use xlink:href="#icon-wechat"></use></svg>

                <span>微信公众号</span>

              </a>

              <span class="divider_item"> / </span>

              <a href="#" class="text button">

                <svg class="icon icon-wechat-mini-program" style="width:1.5rem;height:1.5rem;"><use xlink:href="#icon-wechat-mini-program"></use></svg>

                <span>小程序</span>

              </a>

            </div>

            <span class="divider_item"> | </span>

            <!-- Authentication Links -->

            <div class="authentication-links">

              @guest

                  <a class="login text button" href="{{ route('login') }}" target="_blank">登录</a>

                  <span class="divider_item"> / </span>

                  <div class="register_button">

                    <div class="ui primary register button"><a class="register-button-link" href="{{ route('register') }}" target="_blank">注册账号</a></div>

                  </div>

              @else

                    <div class="avatar-container">

                      <div class="ui pointing avatar dropdown">

                        <span class="avatar-link"><img class="ui avatar image" src="/images/avatar.jpg" data-object-fit="cover" /></span>

                        <div class="menu">

                          <a class="item" href="{{ route('users.show', Auth::id()) }}"><svg class="icon icon-profile"><use xlink:href="#icon-profile"></use></svg><span>个人主页</span></a>

                          <a class="item" href="#"><svg class="icon icon-settings"><use xlink:href="#icon-settings"></use></svg><span>设置</span></a>

                          <a class="item" href="#"><svg class="icon icon-courses"><use xlink:href="#icon-courses"></use></svg><span>我的课程</span></a>

                          <div class="logout item">

                              <form class="logout-form" action="{{ route('logout') }}" method="POST">

                                {{ csrf_field() }}

                                <button class="ui small basic red button" type="submit" name="button"><svg class="icon icon-logout"><use xlink:href="#icon-logout"></use></svg><span>退出登录</span></button>

                              </form>

                          </div>

                        </div>

                      </div>

                    </div>

                    <a href="#" class="notification-link"><svg class="icon icon-notification"><use xlink:href="#icon-notification"></use></svg></a>

              @endguest

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
