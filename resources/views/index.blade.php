<!DOCTYPE html>
<html>

  <head>
    <title>优拾课堂 · 办公与数字生活指南 </title>
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

              <a class="logo_link" href="/" title="积优课堂">

                <svg class="icon icon-logo"><use xlink:href="#icon-logo"></use></svg>

              </a>

            </section>

            <section class="ui vertical labeled icon menu">

              <ul>

                <!-- items of the main navigation will be cloned here -->

              </ul>

              <section class="login_register_buttons">

                <div class="login_button">

                  <!-- chrome浏览器需要四个文字，负责圆角无法正常显示 -->
                  <div class="ui secondary login button">登录</div>

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

                      <svg class="icon icon-logo"><use xlink:href="#icon-logo"></use></svg>

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

                    <a class="ui yellow right corner label"><i class="star icon"></i></a>

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

                <div class="promotion-cards">

                  <div class="ui center aligned grid">

                    <div class="doubling four column row">

                        <div class="column">

                          <div class="ui fluid card">

                            <a class="card-area" href="#">

                              <div class="card-image banner1">

                                <div class="overlay"></div>

                                <div class="header">

                                  <div class="title">全新的思维导图利器xMind：Zen</div>

                                  <p class="description">桌面端 + 移动端1年高级账户</p>

                                </div>

                              </div>

                            </a>

                          </div>

                        </div>

                        <div class="column">

                          <div class="ui fluid card">

                            <a class="card-area" href="#">

                              <div class="card-image banner2">

                                <div class="overlay"></div>

                                <div class="header">

                                  <div class="title">全新的思维导图利器xMind：Zen</div>

                                  <p class="description">桌面端 + 移动端1年高级账户</p>

                                </div>

                              </div>

                            </a>

                          </div>

                        </div>

                        <div class="column">

                          <div class="ui fluid card">

                            <a class="card-area" href="#">

                              <div class="card-image banner3">

                                <div class="overlay"></div>

                                <div class="header">

                                  <div class="title">全新的思维导图利器xMind：Zen</div>

                                  <p class="description">桌面端 + 移动端1年高级账户</p>

                                </div>

                              </div>

                            </a>

                          </div>

                        </div>

                        <div class="column">

                          <div class="ui fluid card">

                            <a class="card-area" href="#">

                              <div class="card-image banner4">

                                <div class="overlay"></div>

                                <div class="header">

                                  <div class="title">全新的思维导图利器xMind：Zen</div>

                                  <p class="description">桌面端 + 移动端1年高级账户</p>

                                </div>

                              </div>

                            </a>

                          </div>

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
