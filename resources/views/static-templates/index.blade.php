<!DOCTYPE html>
<html>

  <head>
    <title>优拾课堂 · 办公与数字生活指南 </title>
    <link rel="stylesheet" href="{{ mix('css/main.css') }}">
    <meta charset="utf-8">
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
                       <a target="_blank" href="/forget">忘记密码？</a>
                    </section>

                    <section class="submit">
                      <button class="ui primary button" type="submit">登录</button>
                    </section>

                  </form>

                </section>

                <!-- third login section will be cloned here -->

              </section>

              <section class="register-link">
                <p>还没有账号?<a class="switch-register">立即注册</a></p>
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
                    <a target="_blank" href="/getcode">获取短信验证码</a>
                  </section>
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

          </section>

          <section class="login-link">
            <p>已有账号?<a class="switch-login">立即登录</a></p>
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

                      <div class="authentication-links">

                        <a class="login text button">登录</a>

                        <span class="divider_item"> / </span>

                        <div class="register_button">

                         <div class="ui primary register button">注册账号</div>

                        </div>

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

                           <h6 class="red">办公专家系列</h6>

                           <p class="description"><span>零基础入门 AI，跟随硅谷导师迈出高薪第一步</span></p>

                         </div>

                      </a>

                    </div>

                    <div class="corner_banner corner_banner2">

                      <a class="card_area" href="#">

                         <div class="image_holder">

                            <div class="card_image banner2"></div>

                         </div>

                         <div class="card_content">

                           <h6 class="red">效率高手系列</h6>

                           <p class="description"><span>零基础入门 AI，跟随硅谷导师迈出高薪第一步</span></p>

                         </div>

                      </a>

                    </div>

                    <div class="corner_banner corner_banner3">

                      <a class="card_area" href="#">

                         <div class="image_holder banner3">

                            <div class="card_image banner3"></div>

                         </div>

                         <div class="card_content">

                           <h6 class="red">P图达人系列</h6>

                           <p class="description"><span>零基础入门 AI，跟随硅谷导师迈出高薪第一步</span></p>

                         </div>

                      </a>

                    </div>

                  </div>

                </div>

                <div class="promotion-cards">

                  <div class="ui grid">

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

                <div class="articles-feed">

                  <div class="ui grid">

                    <div class="doubling two column row">

                        <div class="twelve wide articles column">

                          <div class="articles-list">

                            <div class="ui items">

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner1"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">微信深夜放大招！小游戏群聊<span>分享</span>又有新套路，小程序实现全面布局</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">1小时前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>

                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>微信或将通过小程序的成功，建立一种新的系统。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span><span>20000赞</span></span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span><span>20000评论</span></span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span><span>收藏</span></span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                  <div class="ui top left attached category label">高效之选</div>

                                  <a href="#"><div class="image-holder banner2"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span><span>分享</span></span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                  <div class="ui top left attached category label">高效之选</div>

                                  <a href="#"><div class="image-holder banner3"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>
                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner4"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                  <div class="ui top left attached category label">高效之选</div>

                                  <a href="#"><div class="image-holder banner5"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner6"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                  <div class="ui top left attached category label">高效之选</div>

                                  <a href="#"><div class="image-holder banner7"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner8"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                  <div class="ui top left attached category label">高效之选</div>

                                  <a href="#"><div class="image-holder banner9"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner10"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner11"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                              <div class="item">

                                <div class="item-image">

                                   <div class="ui top left attached category label">高效之选</div>

                                   <a href="#"><div class="image-holder banner12"></div></a>

                                </div>

                                <div class="content">

                                  <a href="#" class="header">漫威影业宣布新片计划：梁朝伟、安吉丽娜·朱莉、马赫沙拉·阿里等知名演员加盟，二维码是最流行的移动支付方式</a>

                                  <div class="meta">

                                    <span class="author">
                                      <span class="avatar"><img class="ui avatar image" src="/images/logo.svg"></span>
                                      <span class="name">官方内容组</span>
                                    </span>

                                    <span class="publish-date">
                                      <span class="vertical-divider"> | </span>
                                      <span class="date-diff">5天前发布</span>
                                    </span>

                                    <span class="authorization">
                                      <span class="vertical-divider"> | </span>
                                      <span class="popup-icon-wrapper"><svg class="icon icon-auth"><use xlink:href="#icon-auth"></use></svg></span>

                                      <div class="ui auth popup">

                                        「优拾课堂官方认证用户」

                                      </div>
                                    </span>

                                  </div>

                                  <div class="description">
                                    <p>国内有 5.7 亿人在使用手机支付。</p>
                                  </div>

                                  <div class="extra">
                                    <section class="article-options">
                                      <span class="like option"><i class="ui red heart outline icon"></i><span>20000赞</span></span>
                                      <span class="comment option"><i class="ui green comment alternate icon"></i><span>20000评论</span></span>
                                      <span class="bookmark option"><i class="ui yellow bookmark outline icon"></i><span>收藏</span></span>
                                      <span class="share option"><i class="ui blue share square icon"></i><span>分享</span></span>

                                      <div class="ui social-share popup">

                                        <div class="ui social-share list">

                                          <div class="item">
                                            <svg class="icon icon-weibo"><use xlink:href="#icon-weibo"></use></svg>
                                            <div class="content">
                                              <span>微博</span>
                                            </div>
                                          </div>

                                          <div class="item">
                                            <svg class="icon icon-wechat"><use xlink:href="#icon-wechat"></use></svg>
                                            <div class="content">
                                              <span>微信</span>
                                            </div>
                                          </div>

                                        </div>

                                      </div>

                                    </section>

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div class="four wide asides column">

                          <div class="ui sticky asides-wrapper">

                            <div class="aside1">

                              <h3 class="ui header">

                                <svg class="icon icon-hot"><use xlink:href="#icon-hot"></use></svg>

                                <div class="content">

                                  <span>热门精选</span>

                                </div>

                              </h3>

                              <div class="ui list">

                                <div class="item">

                                  <!--   <svg class="icon icon-num01"><use xlink:href="#icon-num01"></use></svg> -->

                                  <h3 class="ui header">01</h3>

                                  <div class="content">

                                    <a class="header">皮克斯创始人：创新之前，你需要先重新理解失败这件事</a>

                                    <div class="description">5小时前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num02"><use xlink:href="#icon-num02"></use></svg> -->

                                  <h3 class="ui header">02</h3>

                                  <div class="content">

                                    <a class="header">十八年，中国在线音乐沉浮录</a>

                                    <div class="description">1星期前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num03"><use xlink:href="#icon-num03"></use></svg> -->

                                  <h3 class="ui header">03</h3>

                                  <div class="content">

                                    <a class="header">抖音回应无法用微信账号登录：应是微信开放平台登录服务问题</a>

                                    <div class="description">2星期前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num04"><use xlink:href="#icon-num04"></use></svg> -->

                                  <h3 class="ui header">04</h3>

                                  <div class="content">

                                    <a class="header">锤子员工自述：被变相强制离职 罗永浩一直活在梦里</a>

                                    <div class="description">1月前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num05"><use xlink:href="#icon-num05"></use></svg> -->

                                  <h3 class="ui header">05</h3>

                                  <div class="content">

                                    <a class="header">星巴克2019财年第一季度营收66亿美元，同比增长9.2%</a>

                                    <div class="description">3月前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!--   <svg class="icon icon-num01"><use xlink:href="#icon-num01"></use></svg> -->

                                  <h3 class="ui header">06</h3>

                                  <div class="content">

                                    <a class="header">视频会议软件公司Zoom提交IPO招股书 拟融资1亿美元</a>

                                    <div class="description">4月前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num02"><use xlink:href="#icon-num02"></use></svg> -->

                                  <h3 class="ui header">07</h3>

                                  <div class="content">

                                    <a class="header">苹果CEO库克参加“中国发展高层论坛2019年会”并发表演讲</a>

                                    <div class="description">1年前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num03"><use xlink:href="#icon-num03"></use></svg> -->

                                  <h3 class="ui header">08</h3>

                                  <div class="content">

                                    <a class="header">恒大健康去年亏损14.28亿元 与法拉第未来重组协议有关</a>

                                    <div class="description">1年前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num04"><use xlink:href="#icon-num04"></use></svg> -->

                                  <h3 class="ui header">09</h3>

                                  <div class="content">

                                    <a class="header">于谦真是一个窝囊废吗？</a>

                                    <div class="description">1年前</div>

                                  </div>

                                </div>

                                <div class="item">

                                  <!-- <svg class="icon icon-num05"><use xlink:href="#icon-num05"></use></svg> -->

                                  <h3 class="ui header">10</h3>

                                  <div class="content">

                                    <a class="header">Pinterest终于要上市了，但它已经讲不好社交故事</a>

                                    <div class="description">1年前</div>

                                  </div>

                                </div>

                              </div>

                            </div>

                            <div class="aside2">

                              <h3 class="ui header">

                                <svg class="icon icon-favourite"><use xlink:href="#icon-favourite"></use></svg>

                                <div class="content"><span>推荐标签</span></div>

                              </h3>

                              <div class="ui list">

                                <div class="item">Windows</div>

                                <div class="item">效率工具</div>

                                <div class="item">PPT</div>

                                <div class="item">Excel</div>

                                <div class="item">Mac</div>

                                <div class="item">P图</div>

                                <div class="item">Office</div>

                              </div>

                            </div>

                          </div>

                        </div>

                    </div>

                  </div>

                </div>

                <div class="promotion-cards">

                  <div class="ui grid">

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

    </div>

    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>

  </body>

</html>
