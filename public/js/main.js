(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/main"],{

/***/ "./resources/js/index/accountModal.js":
/*!********************************************!*\
  !*** ./resources/js/index/accountModal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

/**
* header - account modal
**/
$('#account_modal').modal({
  closable: false,
  transition: 'zoom',
  duration: 100
}).modal('attach events', '#header .register.button', 'show').modal('attach events', '#header .login.button', 'show');
$('#account_modal .close_button').click(function () {
  $('#account_modal').modal('hide');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/detectBrowsers.js":
/*!**********************************************!*\
  !*** ./resources/js/index/detectBrowsers.js ***!
  \**********************************************/
/*! exports provided: isiOS, isAndroid, isIE11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isiOS", function() { return isiOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE11", function() { return isIE11; });
/*****************************************************************************************************************************

                                   Detect Browsers

******************************************************************************************************************************/

/** Mobile Device and IE11 Detection **/

/** detecting if it is iOS or Android devices **/
var u = navigator.userAgent; //iOS devices

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //Android devices

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
/** detecting if it is IE11 browser **/

var isIE11 = false;

if (window.matchMedia("screen and (-ms-high-contrast: active), (-ms-high-contrast: none)").matches) {
  isIE11 = true;
}



/***/ }),

/***/ "./resources/js/index/header.js":
/*!**************************************!*\
  !*** ./resources/js/index/header.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accountModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accountModal */ "./resources/js/index/accountModal.js");
/* harmony import */ var _accountModal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_accountModal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./searchBar */ "./resources/js/index/searchBar.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar */ "./resources/js/index/sidebar.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/




/***/ }),

/***/ "./resources/js/index/main.js":
/*!************************************!*\
  !*** ./resources/js/index/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../semantic-ui/dist/semantic.min.js */ "./semantic-ui/dist/semantic.min.js");
/* harmony import */ var _semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_semantic_ui_dist_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./resources/js/index/header.js");
/* harmony import */ var _pageBanners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageBanners */ "./resources/js/index/pageBanners.js");




/***/ }),

/***/ "./resources/js/index/pageBanners.js":
/*!*******************************************!*\
  !*** ./resources/js/index/pageBanners.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_0__);
/*****************************************************************************************************************************

                                                        Page Banners

******************************************************************************************************************************/

/**
* Page Banners - Main Banner(featured carousel)
**/

/** Solve the problem that the images after the first one show out there out of the carousel area **/

/** befre the slick component takes effect when you refresh the page in the Chrome browser **/

$(document).ready(function () {
  $('.featured_carousel .image_holder').css('visibility', 'visible');
  $('#main_content .page_banners').css('box-shadow', '0 8px 24px 0 rgba(82,94,102,.15)');
  $('#main_content .page_banners .corner_banners .corner_banner').css('visibility', 'visible');
});
/** Activating the functionality of the featured carousel with the customized previous and next arrow indicators **/

$('#main_content .page_banners .featured_carousel').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  cssEase: 'linear',
  dots: true,
  prevArrow: '<button type="button" class="prev circular ui icon button"><i class="chevron left icon"></i></button>',
  nextArrow: '<button type="button" class="next circular ui icon button"><i class="chevron right icon"></i></button>'
});
/** Fix the problem that the slide pictures get in stuck temporarily when resizing the browser window **/

$(window).resize(function (event) {
  var realtimeWidth = $('#main_content .page_banners .main_banner .slick-list').width();
  $('#main_content .page_banners .main_banner .item .image_holder').css('width', realtimeWidth);
});
/** Fix the problem that the arrows doesn't fade out, **/

/** when the mouse hovers on the carousel area, navigation dots and left and right arrows, making the left and right arrows showing out there with fade animation effects **/

/** and make the color of the overlay on the slick slides change between lighter and darker **/

function moveNavButtons(disToMove, buttonOpacity) {
  $('.featured_carousel .prev.button').css({
    'transform': "translate(".concat(disToMove, ", -50%)"),
    'opacity': "".concat(buttonOpacity)
  });
  $('.featured_carousel .next.button').css({
    'transform': "translate(-".concat(disToMove, ", -50%)"),
    'opacity': "".concat(buttonOpacity)
  });
}

$('.featured_carousel .slick-list, .featured_carousel .prev.button, .featured_carousel .next.button, .featured_carousel .slick-dots').hover(
/** When the mouse enters into the carousel area, making the arrows fade in **/
function () {
  moveNavButtons('1.2rem', 1);
},
/** When the mouse leaves the carousel area, making the arrows fade out **/
function () {
  moveNavButtons('0.4rem', 0);
});
/**
* Page Banners - Corner Banners
**/

/** When hovering on the corner banner, chaging the shape of the image in it by using CSS commands **/

$('#main_content .corner_banners .corner_banner').hover(
/** When the mouse enters into the corner banner area, turning the shape of the image into cornered square from circle **/
function (event) {
  $(event.currentTarget).find('.card_image').css({
    'border-radius': '15%'
  });
},
/** When the mouse leave the corner banner area, turning the shape of the image into circle from cornered square **/
function (event) {
  $(event.currentTarget).find('.card_image').css({
    'border-radius': '50%'
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/searchBar.js":
/*!*****************************************!*\
  !*** ./resources/js/index/searchBar.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

/**
* header - search bar
**/

/** When using Chinese input, do not show search results before Chinese characters are spell out **/

/** flag showing whether Chinese characters are spell out **/

var chineseInput_flag = true;
/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/

/** but Chinese words are not generated **/

$('#header .right.menu .ui.search input.prompt').on('compositionstart', function () {
  /** the state of combining Chinese words is not finished **/
  chineseInput_flag = false;
});
/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/

/** and all the relative Chinese words are generated **/

$('#header .right.menu .ui.search input.prompt').on('compositionend', function () {
  /** the state of combining Chinese words is finished **/
  chineseInput_flag = true;
});
/** the message that needs to be passed when there's no search result returned **/

$.fn.search.settings.error.noResults = '抱歉～您的搜索没匹配到任何结果。';
/** the html code generated when there's no search result returned **/

$.fn.search.settings.templates.message = function (message, type) {
  var html = '';

  if (message !== undefined && type !== undefined) {
    html += '' + '<div class="message ' + type + '">'; // when there's no result returned, the html code that should be generated

    if (type == 'empty') {
      html += '' + '<div class="header">没找到“<span>' + $('#header .right.menu .ui.search').search('get value') + '</span>”的搜索结果</div>' + '<br />' + '<div class="description">' + message + '</div>' + '<br />' + '<div class="description"><a href="http://www.pingwest.com">告诉我们</a>您感兴趣的话题，根据反馈，我们有可能在将来增加相关的内容。</div>';
    }
    /** other circumstances **/
    else {
        html += ' <div class="description">' + message + '</div>';
      }

    html += '</div>';
  }

  return html;
};
/** local search data **/


var content = [{
  title: '还要啥男朋友？！白领自拍指南'
}, {
  title: '不学你就out啦！财务工作必须掌握的20个Excel函数'
}, {
  title: '1Password——密码管理的终极解决方案'
}, {
  title: '5分钟设计出Excel的花式图表'
}, {
  title: '精通Word排版艺术'
}, {
  title: 'Word PowerPoint Excel基础教程'
}, {
  title: 'Armenia'
}, {
  title: 'Netherlands Antilles'
}, {
  title: 'Angola'
}, {
  title: 'Argentina'
}, {
  title: 'American Samoa'
}, {
  title: 'Austria'
}, {
  title: 'Australia'
}, {
  title: 'Aruba'
}, {
  title: 'Aland Islands'
}, {
  title: 'Azerbaijan'
}, {
  title: 'Bosnia'
}, {
  title: 'Barbados'
}, {
  title: 'Bangladesh'
}, {
  title: 'Belgium'
}, {
  title: 'Burkina Faso'
}, {
  title: 'Bulgaria'
}, {
  title: 'Bahrain'
}, {
  title: 'Burundi'
}];
/** activate the search feature **/

$('#header .right.menu .ui.search').search({
  source: content,
  fullTextSearch: true,
  transition: 'fade',
  maxResults: 10,
  onResultsOpen: function onResultsOpen() {
    $('#main_content .page_banners')[0].style.zIndex = -1;
    $('#main_content .page_banners')[0].style.zIndex = -1;
  },
  onResultsClose: function onResultsClose() {
    $('#main_content .page_banners')[0].style.zIndex = 'auto';
    $('#main_content .page_banners')[0].style.zIndex = 'auto';
  },
  onSearchQuery: function onSearchQuery(query) {
    if ($.trim(query) === '') {
      $('#header .right.menu .ui.search .results').addClass('hide_results');
    } else {
      setTimeout(function () {
        /** if the state of combining Chinese words is not finished, do not show any search results **/
        if (!chineseInput_flag) {
          $('#header .right.menu .ui.search .results').addClass('hide_results');
        }
        /** if the state of combining Chinese words is finished, showing the relative search results **/
        else {
            $('#header .right.menu .ui.search .results').removeClass('hide_results');
            $('#header .right.menu .ui.search').search('search local', $.trim(query));
          }
      }, 0);
    }
  }
});
/** when clicking on the search icon, make the search box visible **/

$('#header .right.menu .ui.search i.search.icon').click(function (event) {
  /** if Android devices are detected, making the close icon a little bit larger **/

  /** the reason why doing this is because the small close icon on Android devices is very hard to click **/
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    /** the 'large' class can make the icon become large **/
    $('#header .right.menu .ui.search .close.icon').addClass('large');
    /** making the close icon in the correct position after adjusting its size **/

    $('#header .right.menu .ui.search .close.icon')[0].style.transform = 'translateY(-0.05rem)';
  }
  /** making search box visible **/


  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  search_input.style.visibility = 'visible';
  /** making search input get foucs **/

  if (!_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isIE11"]) {
    search_input.focus();
  }
  /** making login and register buttons invisible **/


  var login_button = $('#header .right.menu .login.button');
  var divider = $('#header .right.menu .divider_item');
  var register_button = $('#header .right.menu .register_button');
  login_button[0].style.display = 'none';
  divider[0].style.display = 'none';
  register_button[0].style.display = 'none';
  /** removing 'link' class via jQuery **/

  $(event.currentTarget).removeClass('link');
  /** making the close icon visible **/

  $('#header .right.menu .ui.search i.close.icon')[0].style.display = 'inline-block';
  /** adding class to search icon for negative margin **/

  $(event.currentTarget).addClass('negative_mg_lft');
  /** stopping the propagation **/

  event.stopPropagation();
});
/** when click on the close icon, closing the search results panels in two steps **/

$('#header .right.menu .ui.search i.close.icon').click(function (event) {
  /** if search results panel is open, just close it and do nothing else **/
  if ($('#header .right.menu .ui.search').search('is visible')) {
    $('#header .right.menu .ui.search').search('hide results');
    /** clear the input in the search box **/

    $('#header .right.menu .ui.search input.prompt').val('');
  }
  /** if search results panel is not open, make the search box invisble **/
  else {
      /* making search input invisible */
      var search_input = $('#header .right.menu .ui.search input.prompt')[0];
      search_input.style.visibility = 'hidden';
      search_input.style.width = '0';
      /* making close icon invisible */

      var close_icon = event.currentTarget;
      close_icon.style.display = 'none';
      /* making login and register buttons visible */

      var login_button = $('#header .right.menu .login.button');
      var divider = $('#header .right.menu .divider_item');
      var register_button = $('#header .right.menu .register_button');
      login_button[0].style.display = 'inline-block';
      divider[0].style.display = 'inline-block';
      register_button[0].style.display = 'inline-block';
      /* adding 'link' class to search icon via jQuery */

      $('#header .right.menu .ui.search i.search.icon').addClass('link');
      /* removing class from search icon for negative margin */

      $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft');
    }
});
/** preventing the body click event when click on search input **/

$('#header .right.menu .ui.search .prompt').click(function (event) {
  /* stopping the propagation */
  event.stopPropagation();
});
/** When the keyboard is close, resize the height of the sidebar for Android devices **/

$('#header .right.menu .ui.search .prompt').blur(function () {
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    /** delay the display of the sidebar after resizing the height of it **/

    /** the reason why doing this is becasue only when the keyboard is close can you resize the height of the sidebar **/
    setTimeout("$('#main_sidebar .content_wrapper').css('height', $(window).height())", 200);
  }
});
/** when clicking the menu button, making the search bar invisible **/

$('#header .right.menu .menu_button .align.justify.icon').click(function (event) {
  /* making search input invisible */
  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  search_input.style.visibility = 'hidden';
  search_input.style.width = '0';
  /* making close icon invisible */

  var close_icon = $('#header .right.menu .ui.search .close.icon')[0];
  close_icon.style.display = 'none';
  /* making login and register buttons visible */

  var login_button = $('#header .right.menu .login.button');
  var divider = $('#header .right.menu .divider_item');
  var register_button = $('#header .right.menu .register_button');
  login_button[0].style.display = 'inline-block';
  divider[0].style.display = 'inline-block';
  register_button[0].style.display = 'inline-block';
  /* adding 'link' class to search icon via jQuery */

  $('#header .right.menu .ui.search i.search.icon').addClass('link');
  /* removing class from search icon for negative margin */

  $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft');
});
/** when clicking in the viewport, making the search input get focus **/

$('body').click(function (event) {
  /** clear the input in the search box **/
  $('#header .right.menu .ui.search input.prompt').val('');
  /** making search input get foucs **/

  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  /** in IE11, when the input is focused, placeholder can not be displayed **/

  if (!_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isIE11"]) {
    search_input.focus();
  }
});
/** hiding results panel of the search box when clicking on it **/

$('#header .right.menu .ui.search .results').click(function (event) {
  /** hiding the results panel of the search bar **/
  $('#header .right.menu .ui.search').search('hide results');
  /** making search input get foucs **/

  var search_input = $('#header .right.menu .ui.search input.prompt')[0];
  /** clear the input **/

  $(search_input).val('');
  search_input.focus();
  /* stopping the propagation */

  event.stopPropagation();
});
/** Solve the problem of when the 'esc' key is pressed, SUI search component does not work **/

$(window).on('keyup', function (evt) {
  if (evt.which == 27) {
    $(".prompt").blur();
    $('#header .right.menu .ui.search i.close.icon').click();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/index/sidebar.js":
/*!***************************************!*\
  !*** ./resources/js/index/sidebar.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detectBrowsers */ "./resources/js/index/detectBrowsers.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! enquire.js */ "./node_modules/enquire.js/src/index.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(enquire_js__WEBPACK_IMPORTED_MODULE_1__);
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/


/**
* header - sidebar
**/

/** Clone Some Html Codes for Reducing the Page Size **/

/** Cloning the logo section into sidebar **/

$('#header .logo_section a.logo_link').clone()
/** optional parameter: includeEvents **/
.appendTo('#main_sidebar section.sidebar_header');
/** Cloning the items of the main navigation into sidebar **/

$('#main_nav .left.menu a.item').clone()
/** optional parameter: includeEvents **/
.appendTo('#main_sidebar section.ui.menu ul').wrap('<li></li>');
/** Cloning the register button into sidebar **/

$('#header .right.menu .register_button').clone()
/** optional parameter: includeEvents **/
.appendTo('#main_sidebar .ui.menu .login_register_buttons');
/** Resizing the height for iOS and Android devices **/

var resizeSidebarHeight = function resizeSidebarHeight() {
  /* resizing the height of the sidebar when the ios device is detected */
  if (_detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isiOS"] || _detectBrowsers__WEBPACK_IMPORTED_MODULE_0__["isAndroid"]) {
    $('#main_sidebar .content_wrapper').css('height', $(window).height());
  }
};
/** When chaging the orientation of the devices, closing the sidebar **/


$(window).on('orientationchange', function (event) {
  /* making the sidebar invisible */
  $('#main_sidebar .close_layer a').click();
  /** making the results panel of the search box to be close **/

  $('#header .right.menu .ui.search').search('hide results');
});
/** toggling the display of the sidebar **/

$('#main_sidebar').sidebar({
  transition: 'overlay',
  mobileTransition: 'overlay',
  dimPage: false,
  onVisible: function onVisible() {
    /** Resizing the height for iOS devices **/
    resizeSidebarHeight();
    /** when opening the sidebar, preventing the body layer from moving **/

    $('body').addClass('fixed_layer');
  },
  onHidden: function onHidden() {
    /** when closing the sidebar, releasing the original state of the body layer **/
    $('body').removeClass('fixed_layer');
  }
}).sidebar('attach events', '#header .right.menu .menu_button .align.justify.icon');
/** making the sidebar invisible **/

$('#main_sidebar .close_layer a').click(function (event) {
  $('#main_sidebar').sidebar('hide');
});
/** when the width of the screen is greater than 768px, close the sidebar if it is open **/

enquire_js__WEBPACK_IMPORTED_MODULE_1___default.a.register("screen and (min-width: 768px)", {
  match: function match() {
    if ($('#main_sidebar').sidebar('is visible')) {
      $('#main_sidebar .close_layer a').click();
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/sass/index/main.scss":
/*!****************************************!*\
  !*** ./resources/sass/index/main.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./semantic-ui/dist/semantic.min.js":
/*!******************************************!*\
  !*** ./semantic-ui/dist/semantic.min.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* # Semantic UI - 2.4.2
* https://github.com/Semantic-Org/Semantic-UI
* http://www.semantic-ui.com/
*
* Copyright 2014 Contributors
* Released under the MIT license
* http://opensource.org/licenses/MIT
*
*/
!function (p, h, b, v) {
  p.site = p.fn.site = function (e) {
    var a,
        c,
        i = new Date().getTime(),
        o = [],
        n = e,
        t = "string" == typeof n,
        l = [].slice.call(arguments, 1),
        u = p.isPlainObject(e) ? p.extend(!0, {}, p.site.settings, e) : p.extend({}, p.site.settings),
        r = u.namespace,
        d = u.error,
        s = "module-" + r,
        m = p(b),
        f = this,
        g = m.data(s);
    return a = {
      initialize: function initialize() {
        a.instantiate();
      },
      instantiate: function instantiate() {
        a.verbose("Storing instance of site", a), g = a, m.data(s, a);
      },
      normalize: function normalize() {
        a.fix.console(), a.fix.requestAnimationFrame();
      },
      fix: {
        console: function (_console) {
          function console() {
            return _console.apply(this, arguments);
          }

          console.toString = function () {
            return _console.toString();
          };

          return console;
        }(function () {
          a.debug("Normalizing window.console"), console !== v && console.log !== v || (a.verbose("Console not available, normalizing events"), a.disable.console()), void 0 !== console.group && void 0 !== console.groupEnd && void 0 !== console.groupCollapsed || (a.verbose("Console group not available, normalizing events"), h.console.group = function () {}, h.console.groupEnd = function () {}, h.console.groupCollapsed = function () {}), void 0 === console.markTimeline && (a.verbose("Mark timeline not available, normalizing events"), h.console.markTimeline = function () {});
        }),
        consoleClear: function consoleClear() {
          a.debug("Disabling programmatic console clearing"), h.console.clear = function () {};
        },
        requestAnimationFrame: function requestAnimationFrame() {
          a.debug("Normalizing requestAnimationFrame"), h.requestAnimationFrame === v && (a.debug("RequestAnimationFrame not available, normalizing event"), h.requestAnimationFrame = h.requestAnimationFrame || h.mozRequestAnimationFrame || h.webkitRequestAnimationFrame || h.msRequestAnimationFrame || function (e) {
            setTimeout(e, 0);
          });
        }
      },
      moduleExists: function moduleExists(e) {
        return p.fn[e] !== v && p.fn[e].settings !== v;
      },
      enabled: {
        modules: function modules(e) {
          var t = [];
          return e = e || u.modules, p.each(e, function (e, n) {
            a.moduleExists(n) && t.push(n);
          }), t;
        }
      },
      disabled: {
        modules: function modules(e) {
          var t = [];
          return e = e || u.modules, p.each(e, function (e, n) {
            a.moduleExists(n) || t.push(n);
          }), t;
        }
      },
      change: {
        setting: function setting(o, r, e, s) {
          e = "string" == typeof e ? "all" === e ? u.modules : [e] : e || u.modules, s = s === v || s, p.each(e, function (e, n) {
            var t,
                i = !a.moduleExists(n) || p.fn[n].settings.namespace || !1;
            a.moduleExists(n) && (a.verbose("Changing default setting", o, r, n), p.fn[n].settings[o] = r, s && i && 0 < (t = p(":data(module-" + i + ")")).length && (a.verbose("Modifying existing settings", t), t[n]("setting", o, r)));
          });
        },
        settings: function settings(i, e, o) {
          e = "string" == typeof e ? [e] : e || u.modules, o = o === v || o, p.each(e, function (e, n) {
            var t;
            a.moduleExists(n) && (a.verbose("Changing default setting", i, n), p.extend(!0, p.fn[n].settings, i), o && r && 0 < (t = p(":data(module-" + r + ")")).length && (a.verbose("Modifying existing settings", t), t[n]("setting", i)));
          });
        }
      },
      enable: {
        console: function console() {
          a.console(!0);
        },
        debug: function debug(e, n) {
          e = e || u.modules, a.debug("Enabling debug for modules", e), a.change.setting("debug", !0, e, n);
        },
        verbose: function verbose(e, n) {
          e = e || u.modules, a.debug("Enabling verbose debug for modules", e), a.change.setting("verbose", !0, e, n);
        }
      },
      disable: {
        console: function console() {
          a.console(!1);
        },
        debug: function debug(e, n) {
          e = e || u.modules, a.debug("Disabling debug for modules", e), a.change.setting("debug", !1, e, n);
        },
        verbose: function verbose(e, n) {
          e = e || u.modules, a.debug("Disabling verbose debug for modules", e), a.change.setting("verbose", !1, e, n);
        }
      },
      console: function console(e) {
        if (e) {
          if (g.cache.console === v) return void a.error(d.console);
          a.debug("Restoring console function"), h.console = g.cache.console;
        } else a.debug("Disabling console function"), g.cache.console = h.console, h.console = {
          clear: function clear() {},
          error: function error() {},
          group: function group() {},
          groupCollapsed: function groupCollapsed() {},
          groupEnd: function groupEnd() {},
          info: function info() {},
          log: function log() {},
          markTimeline: function markTimeline() {},
          warn: function warn() {}
        };
      },
      destroy: function destroy() {
        a.verbose("Destroying previous site for", m), m.removeData(s);
      },
      cache: {},
      setting: function setting(e, n) {
        if (p.isPlainObject(e)) p.extend(!0, u, e);else {
          if (n === v) return u[e];
          u[e] = n;
        }
      },
      internal: function internal(e, n) {
        if (p.isPlainObject(e)) p.extend(!0, a, e);else {
          if (n === v) return a[e];
          a[e] = n;
        }
      },
      debug: function debug() {
        u.debug && (u.performance ? a.performance.log(arguments) : (a.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), a.debug.apply(console, arguments)));
      },
      verbose: function verbose() {
        u.verbose && u.debug && (u.performance ? a.performance.log(arguments) : (a.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), a.verbose.apply(console, arguments)));
      },
      error: function error() {
        a.error = Function.prototype.bind.call(console.error, console, u.name + ":"), a.error.apply(console, arguments);
      },
      performance: {
        log: function log(e) {
          var n, t;
          u.performance && (t = (n = new Date().getTime()) - (i || n), i = n, o.push({
            Element: f,
            Name: e[0],
            Arguments: [].slice.call(e, 1) || "",
            "Execution Time": t
          })), clearTimeout(a.performance.timer), a.performance.timer = setTimeout(a.performance.display, 500);
        },
        display: function display() {
          var e = u.name + ":",
              t = 0;
          i = !1, clearTimeout(a.performance.timer), p.each(o, function (e, n) {
            t += n["Execution Time"];
          }), e += " " + t + "ms", (console.group !== v || console.table !== v) && 0 < o.length && (console.groupCollapsed(e), console.table ? console.table(o) : p.each(o, function (e, n) {
            console.log(n.Name + ": " + n["Execution Time"] + "ms");
          }), console.groupEnd()), o = [];
        }
      },
      invoke: function invoke(i, e, n) {
        var o,
            r,
            t,
            s = g;
        return e = e || l, n = f || n, "string" == typeof i && s !== v && (i = i.split(/[\. ]/), o = i.length - 1, p.each(i, function (e, n) {
          var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
          if (p.isPlainObject(s[t]) && e != o) s = s[t];else {
            if (s[t] !== v) return r = s[t], !1;
            if (!p.isPlainObject(s[n]) || e == o) return s[n] !== v ? r = s[n] : a.error(d.method, i), !1;
            s = s[n];
          }
        })), p.isFunction(r) ? t = r.apply(n, e) : r !== v && (t = r), p.isArray(c) ? c.push(t) : c !== v ? c = [c, t] : t !== v && (c = t), r;
      }
    }, t ? (g === v && a.initialize(), a.invoke(n)) : (g !== v && a.destroy(), a.initialize()), c !== v ? c : this;
  }, p.site.settings = {
    name: "Site",
    namespace: "site",
    error: {
      console: "Console cannot be restored, most likely it was overwritten outside of module",
      method: "The method you called is not defined."
    },
    debug: !1,
    verbose: !1,
    performance: !0,
    modules: ["accordion", "api", "checkbox", "dimmer", "dropdown", "embed", "form", "modal", "nag", "popup", "rating", "shape", "sidebar", "state", "sticky", "tab", "transition", "visit", "visibility"],
    siteNamespace: "site",
    namespaceStub: {
      cache: {},
      config: {},
      sections: {},
      section: {},
      utilities: {}
    }
  }, p.extend(p.expr[":"], {
    data: p.expr.createPseudo ? p.expr.createPseudo(function (n) {
      return function (e) {
        return !!p.data(e, n);
      };
    }) : function (e, n, t) {
      return !!p.data(e, t[3]);
    }
  });
}(jQuery, window, document), function (q, D, E, O) {
  "use strict";

  D = void 0 !== D && D.Math == Math ? D : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), q.fn.search = function (c) {
    var w,
        x = q(this),
        S = x.selector || "",
        k = new Date().getTime(),
        T = [],
        A = c,
        R = "string" == typeof A,
        F = [].slice.call(arguments, 1);
    return q(this).each(function () {
      var m,
          l = q.isPlainObject(c) ? q.extend(!0, {}, q.fn.search.settings, c) : q.extend({}, q.fn.search.settings),
          f = l.className,
          u = l.metadata,
          d = l.regExp,
          r = l.fields,
          g = l.selector,
          p = l.error,
          e = l.namespace,
          i = "." + e,
          n = e + "-module",
          h = q(this),
          b = h.find(g.prompt),
          t = h.find(g.searchButton),
          o = h.find(g.results),
          s = h.find(g.result),
          v = (h.find(g.category), this),
          a = h.data(n),
          y = !1,
          C = !1;
      m = {
        initialize: function initialize() {
          m.verbose("Initializing module"), m.get.settings(), m.determine.searchFields(), m.bind.events(), m.set.type(), m.create.results(), m.instantiate();
        },
        instantiate: function instantiate() {
          m.verbose("Storing instance of module", m), a = m, h.data(n, m);
        },
        destroy: function destroy() {
          m.verbose("Destroying instance"), h.off(i).removeData(n);
        },
        refresh: function refresh() {
          m.debug("Refreshing selector cache"), b = h.find(g.prompt), t = h.find(g.searchButton), h.find(g.category), o = h.find(g.results), s = h.find(g.result);
        },
        refreshResults: function refreshResults() {
          o = h.find(g.results), s = h.find(g.result);
        },
        bind: {
          events: function events() {
            m.verbose("Binding events to search"), l.automatic && (h.on(m.get.inputEvent() + i, g.prompt, m.event.input), b.attr("autocomplete", "off")), h.on("focus" + i, g.prompt, m.event.focus).on("blur" + i, g.prompt, m.event.blur).on("keydown" + i, g.prompt, m.handleKeyboard).on("click" + i, g.searchButton, m.query).on("mousedown" + i, g.results, m.event.result.mousedown).on("mouseup" + i, g.results, m.event.result.mouseup).on("click" + i, g.result, m.event.result.click);
          }
        },
        determine: {
          searchFields: function searchFields() {
            c && c.searchFields !== O && (l.searchFields = c.searchFields);
          }
        },
        event: {
          input: function input() {
            l.searchDelay ? (clearTimeout(m.timer), m.timer = setTimeout(function () {
              m.is.focused() && m.query();
            }, l.searchDelay)) : m.query();
          },
          focus: function focus() {
            m.set.focus(), l.searchOnFocus && m.has.minimumCharacters() && m.query(function () {
              m.can.show() && m.showResults();
            });
          },
          blur: function blur(e) {
            var n = E.activeElement === this,
                t = function t() {
              m.cancel.query(), m.remove.focus(), m.timer = setTimeout(m.hideResults, l.hideDelay);
            };

            n || (C = !1, m.resultsClicked ? (m.debug("Determining if user action caused search to close"), h.one("click.close" + i, g.results, function (e) {
              m.is.inMessage(e) || y ? b.focus() : (y = !1, m.is.animating() || m.is.hidden() || t());
            })) : (m.debug("Input blurred without user action, closing results"), t()));
          },
          result: {
            mousedown: function mousedown() {
              m.resultsClicked = !0;
            },
            mouseup: function mouseup() {
              m.resultsClicked = !1;
            },
            click: function click(e) {
              m.debug("Search result selected");
              var n = q(this),
                  t = n.find(g.title).eq(0),
                  i = n.is("a[href]") ? n : n.find("a[href]").eq(0),
                  o = i.attr("href") || !1,
                  r = i.attr("target") || !1,
                  s = (t.html(), 0 < t.length && t.text()),
                  a = m.get.results(),
                  c = n.data(u.result) || m.get.result(s, a);
              if (q.isFunction(l.onSelect) && !1 === l.onSelect.call(v, c, a)) return m.debug("Custom onSelect callback cancelled default select action"), void (y = !0);
              m.hideResults(), s && m.set.value(s), o && (m.verbose("Opening search link found in result", i), "_blank" == r || e.ctrlKey ? D.open(o) : D.location.href = o);
            }
          }
        },
        handleKeyboard: function handleKeyboard(e) {
          var n,
              t = h.find(g.result),
              i = h.find(g.category),
              o = t.filter("." + f.active),
              r = t.index(o),
              s = t.length,
              a = 0 < o.length,
              c = e.which,
              l = 13,
              u = 38,
              d = 40;
          if (c == 27 && (m.verbose("Escape key pressed, blurring search field"), m.hideResults(), C = !0), m.is.visible()) {
            if (c == l) {
              if (m.verbose("Enter key pressed, selecting active result"), 0 < t.filter("." + f.active).length) return m.event.result.click.call(t.filter("." + f.active), e), e.preventDefault(), !1;
            } else c == u && a ? (m.verbose("Up key pressed, changing active result"), n = r - 1 < 0 ? r : r - 1, i.removeClass(f.active), t.removeClass(f.active).eq(n).addClass(f.active).closest(i).addClass(f.active), e.preventDefault()) : c == d && (m.verbose("Down key pressed, changing active result"), n = s <= r + 1 ? r : r + 1, i.removeClass(f.active), t.removeClass(f.active).eq(n).addClass(f.active).closest(i).addClass(f.active), e.preventDefault());
          } else c == l && (m.verbose("Enter key pressed, executing query"), m.query(), m.set.buttonPressed(), b.one("keyup", m.remove.buttonFocus));
        },
        setup: {
          api: function api(n, t) {
            var e = {
              debug: l.debug,
              on: !1,
              cache: l.cache,
              action: "search",
              urlData: {
                query: n
              },
              onSuccess: function onSuccess(e) {
                m.parse.response.call(v, e, n), t();
              },
              onFailure: function onFailure() {
                m.displayMessage(p.serverError), t();
              },
              onAbort: function onAbort(e) {},
              onError: m.error
            };
            q.extend(!0, e, l.apiSettings), m.verbose("Setting up API request", e), h.api(e);
          }
        },
        can: {
          useAPI: function useAPI() {
            return q.fn.api !== O;
          },
          show: function show() {
            return m.is.focused() && !m.is.visible() && !m.is.empty();
          },
          transition: function transition() {
            return l.transition && q.fn.transition !== O && h.transition("is supported");
          }
        },
        is: {
          animating: function animating() {
            return o.hasClass(f.animating);
          },
          hidden: function hidden() {
            return o.hasClass(f.hidden);
          },
          inMessage: function inMessage(e) {
            if (e.target) {
              var n = q(e.target);
              return q.contains(E.documentElement, e.target) && 0 < n.closest(g.message).length;
            }
          },
          empty: function empty() {
            return "" === o.html();
          },
          visible: function visible() {
            return 0 < o.filter(":visible").length;
          },
          focused: function focused() {
            return 0 < b.filter(":focus").length;
          }
        },
        get: {
          settings: function settings() {
            q.isPlainObject(c) && c.searchFullText && (l.fullTextSearch = c.searchFullText, m.error(l.error.oldSearchSyntax, v));
          },
          inputEvent: function inputEvent() {
            var e = b[0];
            return e !== O && e.oninput !== O ? "input" : e !== O && e.onpropertychange !== O ? "propertychange" : "keyup";
          },
          value: function value() {
            return b.val();
          },
          results: function results() {
            return h.data(u.results);
          },
          result: function result(t, e) {
            var i = ["title", "id"],
                o = !1;
            return t = t !== O ? t : m.get.value(), e = e !== O ? e : m.get.results(), "category" === l.type ? (m.debug("Finding result that matches", t), q.each(e, function (e, n) {
              if (q.isArray(n.results) && (o = m.search.object(t, n.results, i)[0])) return !1;
            })) : (m.debug("Finding result in results object", t), o = m.search.object(t, e, i)[0]), o || !1;
          }
        },
        select: {
          firstResult: function firstResult() {
            m.verbose("Selecting first result"), s.first().addClass(f.active);
          }
        },
        set: {
          focus: function focus() {
            h.addClass(f.focus);
          },
          loading: function loading() {
            h.addClass(f.loading);
          },
          value: function value(e) {
            m.verbose("Setting search input value", e), b.val(e);
          },
          type: function type(e) {
            e = e || l.type, "category" == l.type && h.addClass(l.type);
          },
          buttonPressed: function buttonPressed() {
            t.addClass(f.pressed);
          }
        },
        remove: {
          loading: function loading() {
            h.removeClass(f.loading);
          },
          focus: function focus() {
            h.removeClass(f.focus);
          },
          buttonPressed: function buttonPressed() {
            t.removeClass(f.pressed);
          }
        },
        query: function query(e) {
          e = q.isFunction(e) ? e : function () {};
          var n = m.get.value(),
              t = m.read.cache(n);
          e = e || function () {}, m.has.minimumCharacters() ? (t ? (m.debug("Reading result from cache", n), m.save.results(t.results), m.addResults(t.html), m.inject.id(t.results), e()) : (m.debug("Querying for", n), q.isPlainObject(l.source) || q.isArray(l.source) ? (m.search.local(n), e()) : m.can.useAPI() ? m.search.remote(n, e) : (m.error(p.source), e())), l.onSearchQuery.call(v, n)) : m.hideResults();
        },
        search: {
          local: function local(e) {
            var n,
                t = m.search.object(e, l.content);
            m.set.loading(), m.save.results(t), m.debug("Returned full local search results", t), 0 < l.maxResults && (m.debug("Using specified max results", t), t = t.slice(0, l.maxResults)), "category" == l.type && (t = m.create.categoryResults(t)), n = m.generateResults({
              results: t
            }), m.remove.loading(), m.addResults(n), m.inject.id(t), m.write.cache(e, {
              html: n,
              results: t
            });
          },
          remote: function remote(e, n) {
            n = q.isFunction(n) ? n : function () {}, h.api("is loading") && h.api("abort"), m.setup.api(e, n), h.api("query");
          },
          object: function object(i, n, e) {
            var r = [],
                s = [],
                a = [],
                t = i.toString().replace(d.escape, "\\$&"),
                o = new RegExp(d.beginsWith + t, "i"),
                c = function c(e, n) {
              var t = -1 == q.inArray(n, r),
                  i = -1 == q.inArray(n, a),
                  o = -1 == q.inArray(n, s);
              t && i && o && e.push(n);
            };

            return n = n || l.source, e = e !== O ? e : l.searchFields, q.isArray(e) || (e = [e]), n === O || !1 === n ? (m.error(p.source), []) : (q.each(e, function (e, t) {
              q.each(n, function (e, n) {
                "string" == typeof n[t] && (-1 !== n[t].search(o) ? c(r, n) : "exact" === l.fullTextSearch && m.exactSearch(i, n[t]) ? c(s, n) : 1 == l.fullTextSearch && m.fuzzySearch(i, n[t]) && c(a, n));
              });
            }), q.merge(s, a), q.merge(r, s), r);
          }
        },
        exactSearch: function exactSearch(e, n) {
          return e = e.toLowerCase(), -1 < (n = n.toLowerCase()).indexOf(e);
        },
        fuzzySearch: function fuzzySearch(e, n) {
          var t = n.length,
              i = e.length;
          if ("string" != typeof e) return !1;
          if (e = e.toLowerCase(), n = n.toLowerCase(), t < i) return !1;
          if (i === t) return e === n;

          e: for (var o = 0, r = 0; o < i; o++) {
            for (var s = e.charCodeAt(o); r < t;) {
              if (n.charCodeAt(r++) === s) continue e;
            }

            return !1;
          }

          return !0;
        },
        parse: {
          response: function response(e, n) {
            var t = m.generateResults(e);
            m.verbose("Parsing server response", e), e !== O && n !== O && e[r.results] !== O && (m.addResults(t), m.inject.id(e[r.results]), m.write.cache(n, {
              html: t,
              results: e[r.results]
            }), m.save.results(e[r.results]));
          }
        },
        cancel: {
          query: function query() {
            m.can.useAPI() && h.api("abort");
          }
        },
        has: {
          minimumCharacters: function minimumCharacters() {
            return m.get.value().length >= l.minCharacters;
          },
          results: function results() {
            return 0 !== o.length && "" != o.html();
          }
        },
        clear: {
          cache: function cache(e) {
            var n = h.data(u.cache);
            e ? e && n && n[e] && (m.debug("Removing value from cache", e), delete n[e], h.data(u.cache, n)) : (m.debug("Clearing cache", e), h.removeData(u.cache));
          }
        },
        read: {
          cache: function cache(e) {
            var n = h.data(u.cache);
            return !!l.cache && (m.verbose("Checking cache for generated html for query", e), "object" == _typeof(n) && n[e] !== O && n[e]);
          }
        },
        create: {
          categoryResults: function categoryResults(e) {
            var t = {};
            return q.each(e, function (e, n) {
              n.category && (t[n.category] === O ? (m.verbose("Creating new category of results", n.category), t[n.category] = {
                name: n.category,
                results: [n]
              }) : t[n.category].results.push(n));
            }), t;
          },
          id: function id(e, n) {
            var t,
                i = e + 1;
            return n !== O ? (t = String.fromCharCode(97 + n) + i, m.verbose("Creating category result id", t)) : (t = i, m.verbose("Creating result id", t)), t;
          },
          results: function results() {
            0 === o.length && (o = q("<div />").addClass(f.results).appendTo(h));
          }
        },
        inject: {
          result: function result(e, n, t) {
            m.verbose("Injecting result into results");
            var i = t !== O ? o.children().eq(t).children(g.results).first().children(g.result).eq(n) : o.children(g.result).eq(n);
            m.verbose("Injecting results metadata", i), i.data(u.result, e);
          },
          id: function id(i) {
            m.debug("Injecting unique ids into results");
            var o = 0,
                r = 0;
            return "category" === l.type ? q.each(i, function (e, i) {
              r = 0, q.each(i.results, function (e, n) {
                var t = i.results[e];
                t.id === O && (t.id = m.create.id(r, o)), m.inject.result(t, r, o), r++;
              }), o++;
            }) : q.each(i, function (e, n) {
              var t = i[e];
              t.id === O && (t.id = m.create.id(r)), m.inject.result(t, r), r++;
            }), i;
          }
        },
        save: {
          results: function results(e) {
            m.verbose("Saving current search results to metadata", e), h.data(u.results, e);
          }
        },
        write: {
          cache: function cache(e, n) {
            var t = h.data(u.cache) !== O ? h.data(u.cache) : {};
            l.cache && (m.verbose("Writing generated html to cache", e, n), t[e] = n, h.data(u.cache, t));
          }
        },
        addResults: function addResults(e) {
          if (q.isFunction(l.onResultsAdd) && !1 === l.onResultsAdd.call(o, e)) return m.debug("onResultsAdd callback cancelled default action"), !1;
          e ? (o.html(e), m.refreshResults(), l.selectFirstResult && m.select.firstResult(), m.showResults()) : m.hideResults(function () {
            o.empty();
          });
        },
        showResults: function showResults(e) {
          e = q.isFunction(e) ? e : function () {}, C || !m.is.visible() && m.has.results() && (m.can.transition() ? (m.debug("Showing results with css animations"), o.transition({
            animation: l.transition + " in",
            debug: l.debug,
            verbose: l.verbose,
            duration: l.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (m.debug("Showing results with javascript"), o.stop().fadeIn(l.duration, l.easing)), l.onResultsOpen.call(o));
        },
        hideResults: function hideResults(e) {
          e = q.isFunction(e) ? e : function () {}, m.is.visible() && (m.can.transition() ? (m.debug("Hiding results with css animations"), o.transition({
            animation: l.transition + " out",
            debug: l.debug,
            verbose: l.verbose,
            duration: l.duration,
            onComplete: function onComplete() {
              e();
            },
            queue: !0
          })) : (m.debug("Hiding results with javascript"), o.stop().fadeOut(l.duration, l.easing)), l.onResultsClose.call(o));
        },
        generateResults: function generateResults(e) {
          m.debug("Generating html from response", e);
          var n = l.templates[l.type],
              t = q.isPlainObject(e[r.results]) && !q.isEmptyObject(e[r.results]),
              i = q.isArray(e[r.results]) && 0 < e[r.results].length,
              o = "";
          return t || i ? (0 < l.maxResults && (t ? "standard" == l.type && m.error(p.maxResults) : e[r.results] = e[r.results].slice(0, l.maxResults)), q.isFunction(n) ? o = n(e, r) : m.error(p.noTemplate, !1)) : l.showNoResults && (o = m.displayMessage(p.noResults, "empty")), l.onResults.call(v, e), o;
        },
        displayMessage: function displayMessage(e, n) {
          return n = n || "standard", m.debug("Displaying message", e, n), m.addResults(l.templates.message(e, n)), l.templates.message(e, n);
        },
        setting: function setting(e, n) {
          if (q.isPlainObject(e)) q.extend(!0, l, e);else {
            if (n === O) return l[e];
            l[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (q.isPlainObject(e)) q.extend(!0, m, e);else {
            if (n === O) return m[e];
            m[e] = n;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? m.performance.log(arguments) : (m.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), m.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? m.performance.log(arguments) : (m.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), m.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (m.error = Function.prototype.bind.call(console.error, console, l.name + ":"), m.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            l.performance && (t = (n = new Date().getTime()) - (k || n), k = n, T.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": t
            })), clearTimeout(m.performance.timer), m.performance.timer = setTimeout(m.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                t = 0;
            k = !1, clearTimeout(m.performance.timer), q.each(T, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", S && (e += " '" + S + "'"), 1 < x.length && (e += " (" + x.length + ")"), (console.group !== O || console.table !== O) && 0 < T.length && (console.groupCollapsed(e), console.table ? console.table(T) : q.each(T, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), T = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = a;
          return e = e || F, n = v || n, "string" == typeof i && s !== O && (i = i.split(/[\. ]/), o = i.length - 1, q.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (q.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== O) return r = s[t], !1;
              if (!q.isPlainObject(s[n]) || e == o) return s[n] !== O && (r = s[n]), !1;
              s = s[n];
            }
          })), q.isFunction(r) ? t = r.apply(n, e) : r !== O && (t = r), q.isArray(w) ? w.push(t) : w !== O ? w = [w, t] : t !== O && (w = t), r;
        }
      }, R ? (a === O && m.initialize(), m.invoke(A)) : (a !== O && a.invoke("destroy"), m.initialize());
    }), w !== O ? w : this;
  }, q.fn.search.settings = {
    name: "Search",
    namespace: "search",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    type: "standard",
    minCharacters: 1,
    selectFirstResult: !1,
    apiSettings: !1,
    source: !1,
    searchOnFocus: !0,
    searchFields: ["title", "description"],
    displayField: "",
    fullTextSearch: "exact",
    automatic: !0,
    hideDelay: 0,
    searchDelay: 200,
    maxResults: 7,
    cache: !0,
    showNoResults: !0,
    transition: "scale",
    duration: 200,
    easing: "easeOutExpo",
    onSelect: !1,
    onResultsAdd: !1,
    onSearchQuery: function onSearchQuery(e) {},
    onResults: function onResults(e) {},
    onResultsOpen: function onResultsOpen() {},
    onResultsClose: function onResultsClose() {},
    className: {
      animating: "animating",
      active: "active",
      empty: "empty",
      focus: "focus",
      hidden: "hidden",
      loading: "loading",
      results: "results",
      pressed: "down"
    },
    error: {
      source: "Cannot search. No source used, and Semantic API module was not included",
      noResults: "Your search returned no results",
      logging: "Error in debug logging, exiting.",
      noEndpoint: "No search endpoint was specified",
      noTemplate: "A valid template name was not specified.",
      oldSearchSyntax: "searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.",
      serverError: "There was an issue querying the server.",
      maxResults: "Results must be an array to use maxResults setting",
      method: "The method you called is not defined."
    },
    metadata: {
      cache: "cache",
      results: "results",
      result: "result"
    },
    regExp: {
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      beginsWith: "(?:s|^)"
    },
    fields: {
      categories: "results",
      categoryName: "name",
      categoryResults: "results",
      description: "description",
      image: "image",
      price: "price",
      results: "results",
      title: "title",
      url: "url",
      action: "action",
      actionText: "text",
      actionURL: "url"
    },
    selector: {
      prompt: ".prompt",
      searchButton: ".search.button",
      results: ".results",
      message: ".results > .message",
      category: ".category",
      result: ".result",
      title: ".title, .name"
    },
    templates: {
      escape: function escape(e) {
        var n = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        };
        return /[&<>"'`]/.test(e) ? e.replace(/[&<>"'`]/g, function (e) {
          return n[e];
        }) : e;
      },
      message: function message(e, n) {
        var t = "";
        return e !== O && n !== O && (t += '<div class="message ' + n + '">', t += "empty" == n ? '<div class="header">No Results</div class="header"><div class="description">' + e + '</div class="description">' : ' <div class="description">' + e + "</div>", t += "</div>"), t;
      },
      category: function category(e, t) {
        var i = "";
        q.fn.search.settings.templates.escape;
        return e[t.categoryResults] !== O && (q.each(e[t.categoryResults], function (e, n) {
          n[t.results] !== O && 0 < n.results.length && (i += '<div class="category">', n[t.categoryName] !== O && (i += '<div class="name">' + n[t.categoryName] + "</div>"), i += '<div class="results">', q.each(n.results, function (e, n) {
            n[t.url] ? i += '<a class="result" href="' + n[t.url] + '">' : i += '<a class="result">', n[t.image] !== O && (i += '<div class="image"> <img src="' + n[t.image] + '"></div>'), i += '<div class="content">', n[t.price] !== O && (i += '<div class="price">' + n[t.price] + "</div>"), n[t.title] !== O && (i += '<div class="title">' + n[t.title] + "</div>"), n[t.description] !== O && (i += '<div class="description">' + n[t.description] + "</div>"), i += "</div>", i += "</a>";
          }), i += "</div>", i += "</div>");
        }), e[t.action] && (i += '<a href="' + e[t.action][t.actionURL] + '" class="action">' + e[t.action][t.actionText] + "</a>"), i);
      },
      standard: function standard(e, t) {
        var i = "";
        return e[t.results] !== O && (q.each(e[t.results], function (e, n) {
          n[t.url] ? i += '<a class="result" href="' + n[t.url] + '">' : i += '<a class="result">', n[t.image] !== O && (i += '<div class="image"> <img src="' + n[t.image] + '"></div>'), i += '<div class="content">', n[t.price] !== O && (i += '<div class="price">' + n[t.price] + "</div>"), n[t.title] !== O && (i += '<div class="title">' + n[t.title] + "</div>"), n[t.description] !== O && (i += '<div class="description">' + n[t.description] + "</div>"), i += "</div>", i += "</a>";
        }), e[t.action] && (i += '<a href="' + e[t.action][t.actionURL] + '" class="action">' + e[t.action][t.actionText] + "</a>"), i);
      }
    }
  };
}(jQuery, window, document), function (j, P, M, z) {
  "use strict";

  P = void 0 !== P && P.Math == Math ? P : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), j.fn.sidebar = function (C) {
    var w,
        e = j(this),
        x = j(P),
        S = j(M),
        k = j("html"),
        T = j("head"),
        A = e.selector || "",
        R = new Date().getTime(),
        F = [],
        q = C,
        D = "string" == typeof q,
        E = [].slice.call(arguments, 1),
        O = P.requestAnimationFrame || P.mozRequestAnimationFrame || P.webkitRequestAnimationFrame || P.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var s,
          a,
          e,
          n,
          c,
          l,
          u = j.isPlainObject(C) ? j.extend(!0, {}, j.fn.sidebar.settings, C) : j.extend({}, j.fn.sidebar.settings),
          t = u.selector,
          r = u.className,
          i = u.namespace,
          o = u.regExp,
          d = u.error,
          m = "." + i,
          f = "module-" + i,
          g = j(this),
          p = j(u.context),
          h = g.children(t.sidebar),
          b = (p.children(t.fixed), p.children(t.pusher)),
          v = this,
          y = g.data(f);
      l = {
        initialize: function initialize() {
          l.debug("Initializing sidebar", C), l.create.id(), c = l.get.transitionEvent(), u.delaySetup ? O(l.setup.layout) : l.setup.layout(), O(function () {
            l.setup.cache();
          }), l.instantiate();
        },
        instantiate: function instantiate() {
          l.verbose("Storing instance of module", l), y = l, g.data(f, l);
        },
        create: {
          id: function id() {
            e = (Math.random().toString(16) + "000000000").substr(2, 8), a = "." + e, l.verbose("Creating unique id for element", e);
          }
        },
        destroy: function destroy() {
          l.verbose("Destroying previous module for", g), g.off(m).removeData(f), l.is.ios() && l.remove.ios(), p.off(a), x.off(a), S.off(a);
        },
        event: {
          clickaway: function clickaway(e) {
            var n = 0 < b.find(e.target).length || b.is(e.target),
                t = p.is(e.target);
            n && (l.verbose("User clicked on dimmed page"), l.hide()), t && (l.verbose("User clicked on dimmable context (scaled out page)"), l.hide());
          },
          touch: function touch(e) {},
          containScroll: function containScroll(e) {
            v.scrollTop <= 0 && (v.scrollTop = 1), v.scrollTop + v.offsetHeight >= v.scrollHeight && (v.scrollTop = v.scrollHeight - v.offsetHeight - 1);
          },
          scroll: function scroll(e) {
            0 === j(e.target).closest(t.sidebar).length && e.preventDefault();
          }
        },
        bind: {
          clickaway: function clickaway() {
            l.verbose("Adding clickaway events to context", p), u.closable && p.on("click" + a, l.event.clickaway).on("touchend" + a, l.event.clickaway);
          },
          scrollLock: function scrollLock() {
            u.scrollLock && (l.debug("Disabling page scroll"), x.on("DOMMouseScroll" + a, l.event.scroll)), l.verbose("Adding events to contain sidebar scroll"), S.on("touchmove" + a, l.event.touch), g.on("scroll" + m, l.event.containScroll);
          }
        },
        unbind: {
          clickaway: function clickaway() {
            l.verbose("Removing clickaway events from context", p), p.off(a);
          },
          scrollLock: function scrollLock() {
            l.verbose("Removing scroll lock from page"), S.off(a), x.off(a), g.off("scroll" + m);
          }
        },
        add: {
          inlineCSS: function inlineCSS() {
            var e,
                n = l.cache.width || g.outerWidth(),
                t = l.cache.height || g.outerHeight(),
                i = l.is.rtl(),
                o = l.get.direction(),
                r = {
              left: n,
              right: -n,
              top: t,
              bottom: -t
            };
            i && (l.verbose("RTL detected, flipping widths"), r.left = -n, r.right = n), e = "<style>", "left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", n), e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(" + r[o] + "px, 0, 0);           transform: translate3d(" + r[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " .ui.visible." + o + ".sidebar ~ .fixed, .ui.visible." + o + ".sidebar ~ .pusher {   -webkit-transform: translate3d(0, " + r[o] + "px, 0);           transform: translate3d(0, " + r[o] + "px, 0); }"), l.is.ie() && ("left" === o || "right" === o ? (l.debug("Adding CSS rules for animation distance", n), e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(" + r[o] + "px, 0, 0);           transform: translate3d(" + r[o] + "px, 0, 0); }") : "top" !== o && "bottom" != o || (e += " body.pushable > .ui.visible." + o + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, " + r[o] + "px, 0);           transform: translate3d(0, " + r[o] + "px, 0); }"), e += " body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"), s = j(e += "</style>").appendTo(T), l.debug("Adding sizing css to head", s);
          }
        },
        refresh: function refresh() {
          l.verbose("Refreshing selector cache"), p = j(u.context), h = p.children(t.sidebar), b = p.children(t.pusher), p.children(t.fixed), l.clear.cache();
        },
        refreshSidebars: function refreshSidebars() {
          l.verbose("Refreshing other sidebars"), h = p.children(t.sidebar);
        },
        repaint: function repaint() {
          l.verbose("Forcing repaint event"), v.style.display = "none";
          v.offsetHeight;
          v.scrollTop = v.scrollTop, v.style.display = "";
        },
        setup: {
          cache: function cache() {
            l.cache = {
              width: g.outerWidth(),
              height: g.outerHeight(),
              rtl: "rtl" == g.css("direction")
            };
          },
          layout: function layout() {
            0 === p.children(t.pusher).length && (l.debug("Adding wrapper element for sidebar"), l.error(d.pusher), b = j('<div class="pusher" />'), p.children().not(t.omitted).not(h).wrapAll(b), l.refresh()), 0 !== g.nextAll(t.pusher).length && g.nextAll(t.pusher)[0] === b[0] || (l.debug("Moved sidebar to correct parent element"), l.error(d.movedSidebar, v), g.detach().prependTo(p), l.refresh()), l.clear.cache(), l.set.pushable(), l.set.direction();
          }
        },
        attachEvents: function attachEvents(e, n) {
          var t = j(e);
          n = j.isFunction(l[n]) ? l[n] : l.toggle, 0 < t.length ? (l.debug("Attaching sidebar events to element", e, n), t.on("click" + m, n)) : l.error(d.notFound, e);
        },
        show: function show(e) {
          if (e = j.isFunction(e) ? e : function () {}, l.is.hidden()) {
            if (l.refreshSidebars(), u.overlay && (l.error(d.overlay), u.transition = "overlay"), l.refresh(), l.othersActive()) if (l.debug("Other sidebars currently visible"), u.exclusive) {
              if ("overlay" != u.transition) return void l.hideOthers(l.show);
              l.hideOthers();
            } else u.transition = "overlay";
            l.pushPage(function () {
              e.call(v), u.onShow.call(v);
            }), u.onChange.call(v), u.onVisible.call(v);
          } else l.debug("Sidebar is already visible");
        },
        hide: function hide(e) {
          e = j.isFunction(e) ? e : function () {}, (l.is.visible() || l.is.animating()) && (l.debug("Hiding sidebar", e), l.refreshSidebars(), l.pullPage(function () {
            e.call(v), u.onHidden.call(v);
          }), u.onChange.call(v), u.onHide.call(v));
        },
        othersAnimating: function othersAnimating() {
          return 0 < h.not(g).filter("." + r.animating).length;
        },
        othersVisible: function othersVisible() {
          return 0 < h.not(g).filter("." + r.visible).length;
        },
        othersActive: function othersActive() {
          return l.othersVisible() || l.othersAnimating();
        },
        hideOthers: function hideOthers(e) {
          var n = h.not(g).filter("." + r.visible),
              t = n.length,
              i = 0;
          e = e || function () {}, n.sidebar("hide", function () {
            ++i == t && e();
          });
        },
        toggle: function toggle() {
          l.verbose("Determining toggled direction"), l.is.hidden() ? l.show() : l.hide();
        },
        pushPage: function pushPage(n) {
          var e,
              t,
              _i,
              o = l.get.transition(),
              r = "overlay" === o || l.othersActive() ? g : b;

          n = j.isFunction(n) ? n : function () {}, "scale down" == u.transition && l.scrollToTop(), l.set.transition(o), l.repaint(), e = function e() {
            l.bind.clickaway(), l.add.inlineCSS(), l.set.animating(), l.set.visible();
          }, t = function t() {
            l.set.dimmed();
          }, _i = function i(e) {
            e.target == r[0] && (r.off(c + a, _i), l.remove.animating(), l.bind.scrollLock(), n.call(v));
          }, r.off(c + a), r.on(c + a, _i), O(e), u.dimPage && !l.othersVisible() && O(t);
        },
        pullPage: function pullPage(n) {
          var e,
              _t,
              i = l.get.transition(),
              o = "overlay" == i || l.othersActive() ? g : b;

          n = j.isFunction(n) ? n : function () {}, l.verbose("Removing context push state", l.get.direction()), l.unbind.clickaway(), l.unbind.scrollLock(), e = function e() {
            l.set.transition(i), l.set.animating(), l.remove.visible(), u.dimPage && !l.othersVisible() && b.removeClass(r.dimmed);
          }, _t = function t(e) {
            e.target == o[0] && (o.off(c + a, _t), l.remove.animating(), l.remove.transition(), l.remove.inlineCSS(), ("scale down" == i || u.returnScroll && l.is.mobile()) && l.scrollBack(), n.call(v));
          }, o.off(c + a), o.on(c + a, _t), O(e);
        },
        scrollToTop: function scrollToTop() {
          l.verbose("Scrolling to top of page to avoid animation issues"), n = j(P).scrollTop(), g.scrollTop(0), P.scrollTo(0, 0);
        },
        scrollBack: function scrollBack() {
          l.verbose("Scrolling back to original page position"), P.scrollTo(0, n);
        },
        clear: {
          cache: function cache() {
            l.verbose("Clearing cached dimensions"), l.cache = {};
          }
        },
        set: {
          ios: function ios() {
            k.addClass(r.ios);
          },
          pushed: function pushed() {
            p.addClass(r.pushed);
          },
          pushable: function pushable() {
            p.addClass(r.pushable);
          },
          dimmed: function dimmed() {
            b.addClass(r.dimmed);
          },
          active: function active() {
            g.addClass(r.active);
          },
          animating: function animating() {
            g.addClass(r.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.addClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.addClass(r[e]);
          },
          visible: function visible() {
            g.addClass(r.visible);
          },
          overlay: function overlay() {
            g.addClass(r.overlay);
          }
        },
        remove: {
          inlineCSS: function inlineCSS() {
            l.debug("Removing inline css styles", s), s && 0 < s.length && s.remove();
          },
          ios: function ios() {
            k.removeClass(r.ios);
          },
          pushed: function pushed() {
            p.removeClass(r.pushed);
          },
          pushable: function pushable() {
            p.removeClass(r.pushable);
          },
          active: function active() {
            g.removeClass(r.active);
          },
          animating: function animating() {
            g.removeClass(r.animating);
          },
          transition: function transition(e) {
            e = e || l.get.transition(), g.removeClass(e);
          },
          direction: function direction(e) {
            e = e || l.get.direction(), g.removeClass(r[e]);
          },
          visible: function visible() {
            g.removeClass(r.visible);
          },
          overlay: function overlay() {
            g.removeClass(r.overlay);
          }
        },
        get: {
          direction: function direction() {
            return g.hasClass(r.top) ? r.top : g.hasClass(r.right) ? r.right : g.hasClass(r.bottom) ? r.bottom : r.left;
          },
          transition: function transition() {
            var e,
                n = l.get.direction();
            return e = l.is.mobile() ? "auto" == u.mobileTransition ? u.defaultTransition.mobile[n] : u.mobileTransition : "auto" == u.transition ? u.defaultTransition.computer[n] : u.transition, l.verbose("Determined transition", e), e;
          },
          transitionEvent: function transitionEvent() {
            var e,
                n = M.createElement("element"),
                t = {
              transition: "transitionend",
              OTransition: "oTransitionEnd",
              MozTransition: "transitionend",
              WebkitTransition: "webkitTransitionEnd"
            };

            for (e in t) {
              if (n.style[e] !== z) return t[e];
            }
          }
        },
        is: {
          ie: function ie() {
            return !P.ActiveXObject && "ActiveXObject" in P || "ActiveXObject" in P;
          },
          ios: function ios() {
            var e = navigator.userAgent,
                n = e.match(o.ios),
                t = e.match(o.mobileChrome);
            return !(!n || t) && (l.verbose("Browser was found to be iOS", e), !0);
          },
          mobile: function mobile() {
            var e = navigator.userAgent;
            return e.match(o.mobile) ? (l.verbose("Browser was found to be mobile", e), !0) : (l.verbose("Browser is not mobile, using regular transition", e), !1);
          },
          hidden: function hidden() {
            return !l.is.visible();
          },
          visible: function visible() {
            return g.hasClass(r.visible);
          },
          open: function open() {
            return l.is.visible();
          },
          closed: function closed() {
            return l.is.hidden();
          },
          vertical: function vertical() {
            return g.hasClass(r.top);
          },
          animating: function animating() {
            return p.hasClass(r.animating);
          },
          rtl: function rtl() {
            return l.cache.rtl === z && (l.cache.rtl = "rtl" == g.css("direction")), l.cache.rtl;
          }
        },
        setting: function setting(e, n) {
          if (l.debug("Changing setting", e, n), j.isPlainObject(e)) j.extend(!0, u, e);else {
            if (n === z) return u[e];
            j.isPlainObject(u[e]) ? j.extend(!0, u[e], n) : u[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (j.isPlainObject(e)) j.extend(!0, l, e);else {
            if (n === z) return l[e];
            l[e] = n;
          }
        },
        debug: function debug() {
          !u.silent && u.debug && (u.performance ? l.performance.log(arguments) : (l.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), l.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !u.silent && u.verbose && u.debug && (u.performance ? l.performance.log(arguments) : (l.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), l.verbose.apply(console, arguments)));
        },
        error: function error() {
          u.silent || (l.error = Function.prototype.bind.call(console.error, console, u.name + ":"), l.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            u.performance && (t = (n = new Date().getTime()) - (R || n), R = n, F.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: v,
              "Execution Time": t
            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                t = 0;
            R = !1, clearTimeout(l.performance.timer), j.each(F, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", A && (e += " '" + A + "'"), (console.group !== z || console.table !== z) && 0 < F.length && (console.groupCollapsed(e), console.table ? console.table(F) : j.each(F, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), F = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = y;
          return e = e || E, n = v || n, "string" == typeof i && s !== z && (i = i.split(/[\. ]/), o = i.length - 1, j.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (j.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== z) return r = s[t], !1;
              if (!j.isPlainObject(s[n]) || e == o) return s[n] !== z ? r = s[n] : l.error(d.method, i), !1;
              s = s[n];
            }
          })), j.isFunction(r) ? t = r.apply(n, e) : r !== z && (t = r), j.isArray(w) ? w.push(t) : w !== z ? w = [w, t] : t !== z && (w = t), r;
        }
      }, D ? (y === z && l.initialize(), l.invoke(q)) : (y !== z && l.invoke("destroy"), l.initialize());
    }), w !== z ? w : this;
  }, j.fn.sidebar.settings = {
    name: "Sidebar",
    namespace: "sidebar",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    transition: "auto",
    mobileTransition: "auto",
    defaultTransition: {
      computer: {
        left: "uncover",
        right: "uncover",
        top: "overlay",
        bottom: "overlay"
      },
      mobile: {
        left: "uncover",
        right: "uncover",
        top: "overlay",
        bottom: "overlay"
      }
    },
    context: "body",
    exclusive: !1,
    closable: !0,
    dimPage: !0,
    scrollLock: !1,
    returnScroll: !1,
    delaySetup: !1,
    duration: 500,
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    onHidden: function onHidden() {},
    onVisible: function onVisible() {},
    className: {
      active: "active",
      animating: "animating",
      dimmed: "dimmed",
      ios: "ios",
      pushable: "pushable",
      pushed: "pushed",
      right: "right",
      top: "top",
      left: "left",
      bottom: "bottom",
      visible: "visible"
    },
    selector: {
      fixed: ".fixed",
      omitted: "script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",
      pusher: ".pusher",
      sidebar: ".ui.sidebar"
    },
    regExp: {
      ios: /(iPad|iPhone|iPod)/g,
      mobileChrome: /(CriOS)/g,
      mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
    },
    error: {
      method: "The method you called is not defined.",
      pusher: "Had to add pusher element. For optimal performance make sure body content is inside a pusher element",
      movedSidebar: "Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",
      overlay: "The overlay setting is no longer supported, use animation: overlay",
      notFound: "There were no elements that matched the specified selector"
    }
  };
}(jQuery, window, document), function (F, q, e, D) {
  "use strict";

  q = void 0 !== q && q.Math == Math ? q : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  F.api = F.fn.api = function (C) {
    var w,
        e = F.isFunction(this) ? F(q) : F(this),
        x = e.selector || "",
        S = new Date().getTime(),
        k = [],
        T = C,
        A = "string" == typeof T,
        R = [].slice.call(arguments, 1);
    return e.each(function () {
      var r,
          s,
          t,
          e,
          a,
          c,
          l = F.isPlainObject(C) ? F.extend(!0, {}, F.fn.api.settings, C) : F.extend({}, F.fn.api.settings),
          n = l.namespace,
          i = l.metadata,
          o = l.selector,
          u = l.error,
          d = l.className,
          m = "." + n,
          f = "module-" + n,
          g = F(this),
          p = g.closest(o.form),
          h = l.stateContext ? F(l.stateContext) : g,
          b = this,
          v = h[0],
          y = g.data(f);
      c = {
        initialize: function initialize() {
          A || c.bind.events(), c.instantiate();
        },
        instantiate: function instantiate() {
          c.verbose("Storing instance of module", c), y = c, g.data(f, y);
        },
        destroy: function destroy() {
          c.verbose("Destroying previous module for", b), g.removeData(f).off(m);
        },
        bind: {
          events: function events() {
            var e = c.get.event();
            e ? (c.verbose("Attaching API events to element", e), g.on(e + m, c.event.trigger)) : "now" == l.on && (c.debug("Querying API endpoint immediately"), c.query());
          }
        },
        decode: {
          json: function json(e) {
            if (e !== D && "string" == typeof e) try {
              e = JSON.parse(e);
            } catch (e) {}
            return e;
          }
        },
        read: {
          cachedResponse: function cachedResponse(e) {
            var n;
            if (q.Storage !== D) return n = sessionStorage.getItem(e), c.debug("Using cached response", e, n), n = c.decode.json(n);
            c.error(u.noStorage);
          }
        },
        write: {
          cachedResponse: function cachedResponse(e, n) {
            n && "" === n ? c.debug("Response empty, not caching", n) : q.Storage !== D ? (F.isPlainObject(n) && (n = JSON.stringify(n)), sessionStorage.setItem(e, n), c.verbose("Storing cached response for url", e, n)) : c.error(u.noStorage);
          }
        },
        query: function query() {
          if (c.is.disabled()) c.debug("Element is disabled API request aborted");else {
            if (c.is.loading()) {
              if (!l.interruptRequests) return void c.debug("Cancelling request, previous request is still pending");
              c.debug("Interrupting previous request"), c.abort();
            }

            if (l.defaultData && F.extend(!0, l.urlData, c.get.defaultData()), l.serializeForm && (l.data = c.add.formData(l.data)), !1 === (s = c.get.settings())) return c.cancelled = !0, void c.error(u.beforeSend);

            if (c.cancelled = !1, (t = c.get.templatedURL()) || c.is.mocked()) {
              if ((t = c.add.urlData(t)) || c.is.mocked()) {
                if (s.url = l.base + t, r = F.extend(!0, {}, l, {
                  type: l.method || l.type,
                  data: e,
                  url: l.base + t,
                  beforeSend: l.beforeXHR,
                  success: function success() {},
                  failure: function failure() {},
                  complete: function complete() {}
                }), c.debug("Querying URL", r.url), c.verbose("Using AJAX settings", r), "local" === l.cache && c.read.cachedResponse(t)) return c.debug("Response returned from local cache"), c.request = c.create.request(), void c.request.resolveWith(v, [c.read.cachedResponse(t)]);
                l.throttle ? l.throttleFirstRequest || c.timer ? (c.debug("Throttling request", l.throttle), clearTimeout(c.timer), c.timer = setTimeout(function () {
                  c.timer && delete c.timer, c.debug("Sending throttled request", e, r.method), c.send.request();
                }, l.throttle)) : (c.debug("Sending request", e, r.method), c.send.request(), c.timer = setTimeout(function () {}, l.throttle)) : (c.debug("Sending request", e, r.method), c.send.request());
              }
            } else c.error(u.missingURL);
          }
        },
        should: {
          removeError: function removeError() {
            return !0 === l.hideError || "auto" === l.hideError && !c.is.form();
          }
        },
        is: {
          disabled: function disabled() {
            return 0 < g.filter(o.disabled).length;
          },
          expectingJSON: function expectingJSON() {
            return "json" === l.dataType || "jsonp" === l.dataType;
          },
          form: function form() {
            return g.is("form") || h.is("form");
          },
          mocked: function mocked() {
            return l.mockResponse || l.mockResponseAsync || l.response || l.responseAsync;
          },
          input: function input() {
            return g.is("input");
          },
          loading: function loading() {
            return !!c.request && "pending" == c.request.state();
          },
          abortedRequest: function abortedRequest(e) {
            return e && e.readyState !== D && 0 === e.readyState ? (c.verbose("XHR request determined to be aborted"), !0) : (c.verbose("XHR request was not aborted"), !1);
          },
          validResponse: function validResponse(e) {
            return c.is.expectingJSON() && F.isFunction(l.successTest) ? (c.debug("Checking JSON returned success", l.successTest, e), l.successTest(e) ? (c.debug("Response passed success test", e), !0) : (c.debug("Response failed success test", e), !1)) : (c.verbose("Response is not JSON, skipping validation", l.successTest, e), !0);
          }
        },
        was: {
          cancelled: function cancelled() {
            return c.cancelled || !1;
          },
          succesful: function succesful() {
            return c.request && "resolved" == c.request.state();
          },
          failure: function failure() {
            return c.request && "rejected" == c.request.state();
          },
          complete: function complete() {
            return c.request && ("resolved" == c.request.state() || "rejected" == c.request.state());
          }
        },
        add: {
          urlData: function urlData(o, r) {
            var e, n;
            return o && (e = o.match(l.regExp.required), n = o.match(l.regExp.optional), r = r || l.urlData, e && (c.debug("Looking for required URL variables", e), F.each(e, function (e, n) {
              var t = -1 !== n.indexOf("$") ? n.substr(2, n.length - 3) : n.substr(1, n.length - 2),
                  i = F.isPlainObject(r) && r[t] !== D ? r[t] : g.data(t) !== D ? g.data(t) : h.data(t) !== D ? h.data(t) : r[t];
              if (i === D) return c.error(u.requiredParameter, t, o), o = !1;
              c.verbose("Found required variable", t, i), i = l.encodeParameters ? c.get.urlEncodedValue(i) : i, o = o.replace(n, i);
            })), n && (c.debug("Looking for optional URL variables", e), F.each(n, function (e, n) {
              var t = -1 !== n.indexOf("$") ? n.substr(3, n.length - 4) : n.substr(2, n.length - 3),
                  i = F.isPlainObject(r) && r[t] !== D ? r[t] : g.data(t) !== D ? g.data(t) : h.data(t) !== D ? h.data(t) : r[t];
              o = i !== D ? (c.verbose("Optional variable Found", t, i), o.replace(n, i)) : (c.verbose("Optional variable not found", t), -1 !== o.indexOf("/" + n) ? o.replace("/" + n, "") : o.replace(n, ""));
            }))), o;
          },
          formData: function formData(e) {
            var n = F.fn.serializeObject !== D,
                t = n ? p.serializeObject() : p.serialize();
            return e = e || l.data, e = F.isPlainObject(e) ? n ? (c.debug("Extending existing data with form data", e, t), F.extend(!0, {}, e, t)) : (c.error(u.missingSerialize), c.debug("Cant extend data. Replacing data with form data", e, t), t) : (c.debug("Adding form data", t), t);
          }
        },
        send: {
          request: function request() {
            c.set.loading(), c.request = c.create.request(), c.is.mocked() ? c.mockedXHR = c.create.mockedXHR() : c.xhr = c.create.xhr(), l.onRequest.call(v, c.request, c.xhr);
          }
        },
        event: {
          trigger: function trigger(e) {
            c.query(), "submit" != e.type && "click" != e.type || e.preventDefault();
          },
          xhr: {
            always: function always() {},
            done: function done(e, n, t) {
              var i = this,
                  o = new Date().getTime() - a,
                  r = l.loadingDuration - o,
                  s = !!F.isFunction(l.onResponse) && (c.is.expectingJSON() ? l.onResponse.call(i, F.extend(!0, {}, e)) : l.onResponse.call(i, e));
              r = 0 < r ? r : 0, s && (c.debug("Modified API response in onResponse callback", l.onResponse, s, e), e = s), 0 < r && c.debug("Response completed early delaying state change by", r), setTimeout(function () {
                c.is.validResponse(e) ? c.request.resolveWith(i, [e, t]) : c.request.rejectWith(i, [t, "invalid"]);
              }, r);
            },
            fail: function fail(e, n, t) {
              var i = this,
                  o = new Date().getTime() - a,
                  r = l.loadingDuration - o;
              0 < (r = 0 < r ? r : 0) && c.debug("Response completed early delaying state change by", r), setTimeout(function () {
                c.is.abortedRequest(e) ? c.request.rejectWith(i, [e, "aborted", t]) : c.request.rejectWith(i, [e, "error", n, t]);
              }, r);
            }
          },
          request: {
            done: function done(e, n) {
              c.debug("Successful API Response", e), "local" === l.cache && t && (c.write.cachedResponse(t, e), c.debug("Saving server response locally", c.cache)), l.onSuccess.call(v, e, g, n);
            },
            complete: function complete(e, n) {
              var t, i;
              c.was.succesful() ? (i = e, t = n) : (t = e, i = c.get.responseFromXHR(t)), c.remove.loading(), l.onComplete.call(v, i, g, t);
            },
            fail: function fail(e, n, t) {
              var i = c.get.responseFromXHR(e),
                  o = c.get.errorFromRequest(i, n, t);
              if ("aborted" == n) return c.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)", n, t), l.onAbort.call(v, n, g, e), !0;
              "invalid" == n ? c.debug("JSON did not pass success test. A server-side error has most likely occurred", i) : "error" == n && e !== D && (c.debug("XHR produced a server error", n, t), 200 != e.status && t !== D && "" !== t && c.error(u.statusMessage + t, r.url), l.onError.call(v, o, g, e)), l.errorDuration && "aborted" !== n && (c.debug("Adding error state"), c.set.error(), c.should.removeError() && setTimeout(c.remove.error, l.errorDuration)), c.debug("API Request failed", o, e), l.onFailure.call(v, i, g, e);
            }
          }
        },
        create: {
          request: function request() {
            return F.Deferred().always(c.event.request.complete).done(c.event.request.done).fail(c.event.request.fail);
          },
          mockedXHR: function mockedXHR() {
            var e,
                n,
                t,
                i = l.mockResponse || l.response,
                o = l.mockResponseAsync || l.responseAsync;
            return t = F.Deferred().always(c.event.xhr.complete).done(c.event.xhr.done).fail(c.event.xhr.fail), i ? (n = F.isFunction(i) ? (c.debug("Using specified synchronous callback", i), i.call(v, s)) : (c.debug("Using settings specified response", i), i), t.resolveWith(v, [n, !1, {
              responseText: n
            }])) : F.isFunction(o) && (e = function e(_e) {
              c.debug("Async callback returned response", _e), _e ? t.resolveWith(v, [_e, !1, {
                responseText: _e
              }]) : t.rejectWith(v, [{
                responseText: _e
              }, !1, !1]);
            }, c.debug("Using specified async response callback", o), o.call(v, s, e)), t;
          },
          xhr: function xhr() {
            var e;
            return e = F.ajax(r).always(c.event.xhr.always).done(c.event.xhr.done).fail(c.event.xhr.fail), c.verbose("Created server request", e, r), e;
          }
        },
        set: {
          error: function error() {
            c.verbose("Adding error state to element", h), h.addClass(d.error);
          },
          loading: function loading() {
            c.verbose("Adding loading state to element", h), h.addClass(d.loading), a = new Date().getTime();
          }
        },
        remove: {
          error: function error() {
            c.verbose("Removing error state from element", h), h.removeClass(d.error);
          },
          loading: function loading() {
            c.verbose("Removing loading state from element", h), h.removeClass(d.loading);
          }
        },
        get: {
          responseFromXHR: function responseFromXHR(e) {
            return !!F.isPlainObject(e) && (c.is.expectingJSON() ? c.decode.json(e.responseText) : e.responseText);
          },
          errorFromRequest: function errorFromRequest(e, n, t) {
            return F.isPlainObject(e) && e.error !== D ? e.error : l.error[n] !== D ? l.error[n] : t;
          },
          request: function request() {
            return c.request || !1;
          },
          xhr: function xhr() {
            return c.xhr || !1;
          },
          settings: function settings() {
            var e;
            return (e = l.beforeSend.call(v, l)) && (e.success !== D && (c.debug("Legacy success callback detected", e), c.error(u.legacyParameters, e.success), e.onSuccess = e.success), e.failure !== D && (c.debug("Legacy failure callback detected", e), c.error(u.legacyParameters, e.failure), e.onFailure = e.failure), e.complete !== D && (c.debug("Legacy complete callback detected", e), c.error(u.legacyParameters, e.complete), e.onComplete = e.complete)), e === D && c.error(u.noReturnedValue), !1 === e ? e : e !== D ? F.extend(!0, {}, e) : F.extend(!0, {}, l);
          },
          urlEncodedValue: function urlEncodedValue(e) {
            var n = q.decodeURIComponent(e),
                t = q.encodeURIComponent(e);
            return n !== e ? (c.debug("URL value is already encoded, avoiding double encoding", e), e) : (c.verbose("Encoding value using encodeURIComponent", e, t), t);
          },
          defaultData: function defaultData() {
            var e = {};
            return F.isWindow(b) || (c.is.input() ? e.value = g.val() : c.is.form() || (e.text = g.text())), e;
          },
          event: function event() {
            return F.isWindow(b) || "now" == l.on ? (c.debug("API called without element, no events attached"), !1) : "auto" == l.on ? g.is("input") ? b.oninput !== D ? "input" : b.onpropertychange !== D ? "propertychange" : "keyup" : g.is("form") ? "submit" : "click" : l.on;
          },
          templatedURL: function templatedURL(e) {
            if (e = e || g.data(i.action) || l.action || !1, t = g.data(i.url) || l.url || !1) return c.debug("Using specified url", t), t;

            if (e) {
              if (c.debug("Looking up url for action", e, l.api), l.api[e] === D && !c.is.mocked()) return void c.error(u.missingAction, l.action, l.api);
              t = l.api[e];
            } else c.is.form() && (t = g.attr("action") || h.attr("action") || !1, c.debug("No url or action specified, defaulting to form action", t));

            return t;
          }
        },
        abort: function abort() {
          var e = c.get.xhr();
          e && "resolved" !== e.state() && (c.debug("Cancelling API request"), e.abort());
        },
        reset: function reset() {
          c.remove.error(), c.remove.loading();
        },
        setting: function setting(e, n) {
          if (c.debug("Changing setting", e, n), F.isPlainObject(e)) F.extend(!0, l, e);else {
            if (n === D) return l[e];
            F.isPlainObject(l[e]) ? F.extend(!0, l[e], n) : l[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (F.isPlainObject(e)) F.extend(!0, c, e);else {
            if (n === D) return c[e];
            c[e] = n;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), c.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), c.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (c.error = Function.prototype.bind.call(console.error, console, l.name + ":"), c.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            l.performance && (t = (n = new Date().getTime()) - (S || n), S = n, k.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              "Execution Time": t
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                t = 0;
            S = !1, clearTimeout(c.performance.timer), F.each(k, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", x && (e += " '" + x + "'"), (console.group !== D || console.table !== D) && 0 < k.length && (console.groupCollapsed(e), console.table ? console.table(k) : F.each(k, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), k = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = y;
          return e = e || R, n = b || n, "string" == typeof i && s !== D && (i = i.split(/[\. ]/), o = i.length - 1, F.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (F.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== D) return r = s[t], !1;
              if (!F.isPlainObject(s[n]) || e == o) return s[n] !== D ? r = s[n] : c.error(u.method, i), !1;
              s = s[n];
            }
          })), F.isFunction(r) ? t = r.apply(n, e) : r !== D && (t = r), F.isArray(w) ? w.push(t) : w !== D ? w = [w, t] : t !== D && (w = t), r;
        }
      }, A ? (y === D && c.initialize(), c.invoke(T)) : (y !== D && y.invoke("destroy"), c.initialize());
    }), w !== D ? w : this;
  }, F.api.settings = {
    name: "API",
    namespace: "api",
    debug: !1,
    verbose: !1,
    performance: !0,
    api: {},
    cache: !0,
    interruptRequests: !0,
    on: "auto",
    stateContext: !1,
    loadingDuration: 0,
    hideError: "auto",
    errorDuration: 2e3,
    encodeParameters: !0,
    action: !1,
    url: !1,
    base: "",
    urlData: {},
    defaultData: !0,
    serializeForm: !1,
    throttle: 0,
    throttleFirstRequest: !0,
    method: "get",
    data: {},
    dataType: "json",
    mockResponse: !1,
    mockResponseAsync: !1,
    response: !1,
    responseAsync: !1,
    beforeSend: function beforeSend(e) {
      return e;
    },
    beforeXHR: function beforeXHR(e) {},
    onRequest: function onRequest(e, n) {},
    onResponse: !1,
    onSuccess: function onSuccess(e, n) {},
    onComplete: function onComplete(e, n) {},
    onFailure: function onFailure(e, n) {},
    onError: function onError(e, n) {},
    onAbort: function onAbort(e, n) {},
    successTest: !1,
    error: {
      beforeSend: "The before send function has aborted the request",
      error: "There was an error with your request",
      exitConditions: "API Request Aborted. Exit conditions met",
      JSONParse: "JSON could not be parsed during error handling",
      legacyParameters: "You are using legacy API success callback names",
      method: "The method you called is not defined",
      missingAction: "API action used but no url was defined",
      missingSerialize: "jquery-serialize-object is required to add form data to an existing data object",
      missingURL: "No URL specified for api event",
      noReturnedValue: "The beforeSend callback must return a settings object, beforeSend ignored.",
      noStorage: "Caching responses locally requires session storage",
      parseError: "There was an error parsing your request",
      requiredParameter: "Missing a required URL parameter: ",
      statusMessage: "Server gave an error: ",
      timeout: "Your request timed out"
    },
    regExp: {
      required: /\{\$*[A-z0-9]+\}/g,
      optional: /\{\/\$*[A-z0-9]+\}/g
    },
    className: {
      loading: "loading",
      error: "error"
    },
    selector: {
      disabled: ".disabled",
      form: "form"
    },
    metadata: {
      action: "action",
      url: "url"
    }
  };
}(jQuery, window, document), function (w, e, x, S) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), w.fn.transition = function () {
    var l,
        s = w(this),
        g = s.selector || "",
        p = new Date().getTime(),
        h = [],
        b = arguments,
        v = b[0],
        y = [].slice.call(arguments, 1),
        C = "string" == typeof v;
    e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame;
    return s.each(function (i) {
      var u,
          a,
          n,
          d,
          t,
          o,
          e,
          r,
          m,
          f = w(this),
          c = this;
      (m = {
        initialize: function initialize() {
          u = m.get.settings.apply(c, b), d = u.className, n = u.error, t = u.metadata, r = "." + u.namespace, e = "module-" + u.namespace, a = f.data(e) || m, o = m.get.animationEndEvent(), C && (C = m.invoke(v)), !1 === C && (m.verbose("Converted arguments into settings object", u), u.interval ? m.delay(u.animate) : m.animate(), m.instantiate());
        },
        instantiate: function instantiate() {
          m.verbose("Storing instance of module", m), a = m, f.data(e, a);
        },
        destroy: function destroy() {
          m.verbose("Destroying previous module for", c), f.removeData(e);
        },
        refresh: function refresh() {
          m.verbose("Refreshing display type on next animation"), delete m.displayType;
        },
        forceRepaint: function forceRepaint() {
          m.verbose("Forcing element repaint");
          var e = f.parent(),
              n = f.next();
          0 === n.length ? f.detach().appendTo(e) : f.detach().insertBefore(n);
        },
        repaint: function repaint() {
          m.verbose("Repainting element");
          c.offsetWidth;
        },
        delay: function delay(e) {
          var n,
              t = m.get.animationDirection();
          t || (t = m.can.transition() ? m.get.direction() : "static"), e = e !== S ? e : u.interval, n = "auto" == u.reverse && t == d.outward || 1 == u.reverse ? (s.length - i) * u.interval : i * u.interval, m.debug("Delaying animation by", n), setTimeout(m.animate, n);
        },
        animate: function animate(e) {
          if (u = e || u, !m.is.supported()) return m.error(n.support), !1;

          if (m.debug("Preparing animation", u.animation), m.is.animating()) {
            if (u.queue) return !u.allowRepeats && m.has.direction() && m.is.occurring() && !0 !== m.queuing ? m.debug("Animation is currently occurring, preventing queueing same animation", u.animation) : m.queue(u.animation), !1;
            if (!u.allowRepeats && m.is.occurring()) return m.debug("Animation is already occurring, will not execute repeated animation", u.animation), !1;
            m.debug("New animation started, completing previous early", u.animation), a.complete();
          }

          m.can.animate() ? m.set.animating(u.animation) : m.error(n.noAnimation, u.animation, c);
        },
        reset: function reset() {
          m.debug("Resetting animation to beginning conditions"), m.remove.animationCallbacks(), m.restore.conditions(), m.remove.animating();
        },
        queue: function queue(e) {
          m.debug("Queueing animation of", e), m.queuing = !0, f.one(o + ".queue" + r, function () {
            m.queuing = !1, m.repaint(), m.animate.apply(this, u);
          });
        },
        complete: function complete(e) {
          m.debug("Animation complete", u.animation), m.remove.completeCallback(), m.remove.failSafe(), m.is.looping() || (m.is.outward() ? (m.verbose("Animation is outward, hiding element"), m.restore.conditions(), m.hide()) : m.is.inward() ? (m.verbose("Animation is outward, showing element"), m.restore.conditions(), m.show()) : (m.verbose("Static animation completed"), m.restore.conditions(), u.onComplete.call(c)));
        },
        force: {
          visible: function visible() {
            var e = f.attr("style"),
                n = m.get.userStyle(),
                t = m.get.displayType(),
                i = n + "display: " + t + " !important;",
                o = f.css("display"),
                r = e === S || "" === e;
            o !== t ? (m.verbose("Overriding default display to show element", t), f.attr("style", i)) : r && f.removeAttr("style");
          },
          hidden: function hidden() {
            var e = f.attr("style"),
                n = f.css("display"),
                t = e === S || "" === e;
            "none" === n || m.is.hidden() ? t && f.removeAttr("style") : (m.verbose("Overriding default display to hide element"), f.css("display", "none"));
          }
        },
        has: {
          direction: function direction(e) {
            var t = !1;
            return "string" == typeof (e = e || u.animation) && (e = e.split(" "), w.each(e, function (e, n) {
              n !== d.inward && n !== d.outward || (t = !0);
            })), t;
          },
          inlineDisplay: function inlineDisplay() {
            var e = f.attr("style") || "";
            return w.isArray(e.match(/display.*?;/, ""));
          }
        },
        set: {
          animating: function animating(e) {
            var n;
            m.remove.completeCallback(), e = e || u.animation, n = m.get.animationClass(e), m.save.animation(n), m.force.visible(), m.remove.hidden(), m.remove.direction(), m.start.animation(n);
          },
          duration: function duration(e, n) {
            ((n = "number" == typeof (n = n || u.duration) ? n + "ms" : n) || 0 === n) && (m.verbose("Setting animation duration", n), f.css({
              "animation-duration": n
            }));
          },
          direction: function direction(e) {
            (e = e || m.get.direction()) == d.inward ? m.set.inward() : m.set.outward();
          },
          looping: function looping() {
            m.debug("Transition set to loop"), f.addClass(d.looping);
          },
          hidden: function hidden() {
            f.addClass(d.transition).addClass(d.hidden);
          },
          inward: function inward() {
            m.debug("Setting direction to inward"), f.removeClass(d.outward).addClass(d.inward);
          },
          outward: function outward() {
            m.debug("Setting direction to outward"), f.removeClass(d.inward).addClass(d.outward);
          },
          visible: function visible() {
            f.addClass(d.transition).addClass(d.visible);
          }
        },
        start: {
          animation: function animation(e) {
            e = e || m.get.animationClass(), m.debug("Starting tween", e), f.addClass(e).one(o + ".complete" + r, m.complete), u.useFailSafe && m.add.failSafe(), m.set.duration(u.duration), u.onStart.call(c);
          }
        },
        save: {
          animation: function animation(e) {
            m.cache || (m.cache = {}), m.cache.animation = e;
          },
          displayType: function displayType(e) {
            "none" !== e && f.data(t.displayType, e);
          },
          transitionExists: function transitionExists(e, n) {
            w.fn.transition.exists[e] = n, m.verbose("Saving existence of transition", e, n);
          }
        },
        restore: {
          conditions: function conditions() {
            var e = m.get.currentAnimation();
            e && (f.removeClass(e), m.verbose("Removing animation class", m.cache)), m.remove.duration();
          }
        },
        add: {
          failSafe: function failSafe() {
            var e = m.get.duration();
            m.timer = setTimeout(function () {
              f.triggerHandler(o);
            }, e + u.failSafeDelay), m.verbose("Adding fail safe timer", m.timer);
          }
        },
        remove: {
          animating: function animating() {
            f.removeClass(d.animating);
          },
          animationCallbacks: function animationCallbacks() {
            m.remove.queueCallback(), m.remove.completeCallback();
          },
          queueCallback: function queueCallback() {
            f.off(".queue" + r);
          },
          completeCallback: function completeCallback() {
            f.off(".complete" + r);
          },
          display: function display() {
            f.css("display", "");
          },
          direction: function direction() {
            f.removeClass(d.inward).removeClass(d.outward);
          },
          duration: function duration() {
            f.css("animation-duration", "");
          },
          failSafe: function failSafe() {
            m.verbose("Removing fail safe timer", m.timer), m.timer && clearTimeout(m.timer);
          },
          hidden: function hidden() {
            f.removeClass(d.hidden);
          },
          visible: function visible() {
            f.removeClass(d.visible);
          },
          looping: function looping() {
            m.debug("Transitions are no longer looping"), m.is.looping() && (m.reset(), f.removeClass(d.looping));
          },
          transition: function transition() {
            f.removeClass(d.visible).removeClass(d.hidden);
          }
        },
        get: {
          settings: function settings(e, n, t) {
            return "object" == _typeof(e) ? w.extend(!0, {}, w.fn.transition.settings, e) : "function" == typeof t ? w.extend({}, w.fn.transition.settings, {
              animation: e,
              onComplete: t,
              duration: n
            }) : "string" == typeof n || "number" == typeof n ? w.extend({}, w.fn.transition.settings, {
              animation: e,
              duration: n
            }) : "object" == _typeof(n) ? w.extend({}, w.fn.transition.settings, n, {
              animation: e
            }) : "function" == typeof n ? w.extend({}, w.fn.transition.settings, {
              animation: e,
              onComplete: n
            }) : w.extend({}, w.fn.transition.settings, {
              animation: e
            });
          },
          animationClass: function animationClass(e) {
            var n = e || u.animation,
                t = m.can.transition() && !m.has.direction() ? m.get.direction() + " " : "";
            return d.animating + " " + d.transition + " " + t + n;
          },
          currentAnimation: function currentAnimation() {
            return !(!m.cache || m.cache.animation === S) && m.cache.animation;
          },
          currentDirection: function currentDirection() {
            return m.is.inward() ? d.inward : d.outward;
          },
          direction: function direction() {
            return m.is.hidden() || !m.is.visible() ? d.inward : d.outward;
          },
          animationDirection: function animationDirection(e) {
            var t;
            return "string" == typeof (e = e || u.animation) && (e = e.split(" "), w.each(e, function (e, n) {
              n === d.inward ? t = d.inward : n === d.outward && (t = d.outward);
            })), t || !1;
          },
          duration: function duration(e) {
            return !1 === (e = e || u.duration) && (e = f.css("animation-duration") || 0), "string" == typeof e ? -1 < e.indexOf("ms") ? parseFloat(e) : 1e3 * parseFloat(e) : e;
          },
          displayType: function displayType(e) {
            return e = e === S || e, u.displayType ? u.displayType : (e && f.data(t.displayType) === S && m.can.transition(!0), f.data(t.displayType));
          },
          userStyle: function userStyle(e) {
            return (e = e || f.attr("style") || "").replace(/display.*?;/, "");
          },
          transitionExists: function transitionExists(e) {
            return w.fn.transition.exists[e];
          },
          animationStartEvent: function animationStartEvent() {
            var e,
                n = x.createElement("div"),
                t = {
              animation: "animationstart",
              OAnimation: "oAnimationStart",
              MozAnimation: "mozAnimationStart",
              WebkitAnimation: "webkitAnimationStart"
            };

            for (e in t) {
              if (n.style[e] !== S) return t[e];
            }

            return !1;
          },
          animationEndEvent: function animationEndEvent() {
            var e,
                n = x.createElement("div"),
                t = {
              animation: "animationend",
              OAnimation: "oAnimationEnd",
              MozAnimation: "mozAnimationEnd",
              WebkitAnimation: "webkitAnimationEnd"
            };

            for (e in t) {
              if (n.style[e] !== S) return t[e];
            }

            return !1;
          }
        },
        can: {
          transition: function transition(e) {
            var n,
                t,
                i,
                o,
                r,
                s,
                a = u.animation,
                c = m.get.transitionExists(a),
                l = m.get.displayType(!1);

            if (c === S || e) {
              if (m.verbose("Determining whether animation exists"), n = f.attr("class"), t = f.prop("tagName"), o = (i = w("<" + t + " />").addClass(n).insertAfter(f)).addClass(a).removeClass(d.inward).removeClass(d.outward).addClass(d.animating).addClass(d.transition).css("animationName"), r = i.addClass(d.inward).css("animationName"), l || (l = i.attr("class", n).removeAttr("style").removeClass(d.hidden).removeClass(d.visible).show().css("display"), m.verbose("Determining final display state", l), m.save.displayType(l)), i.remove(), o != r) m.debug("Direction exists for animation", a), s = !0;else {
                if ("none" == o || !o) return void m.debug("No animation defined in css", a);
                m.debug("Static animation found", a, l), s = !1;
              }
              m.save.transitionExists(a, s);
            }

            return c !== S ? c : s;
          },
          animate: function animate() {
            return m.can.transition() !== S;
          }
        },
        is: {
          animating: function animating() {
            return f.hasClass(d.animating);
          },
          inward: function inward() {
            return f.hasClass(d.inward);
          },
          outward: function outward() {
            return f.hasClass(d.outward);
          },
          looping: function looping() {
            return f.hasClass(d.looping);
          },
          occurring: function occurring(e) {
            return e = "." + (e = e || u.animation).replace(" ", "."), 0 < f.filter(e).length;
          },
          visible: function visible() {
            return f.is(":visible");
          },
          hidden: function hidden() {
            return "hidden" === f.css("visibility");
          },
          supported: function supported() {
            return !1 !== o;
          }
        },
        hide: function hide() {
          m.verbose("Hiding element"), m.is.animating() && m.reset(), c.blur(), m.remove.display(), m.remove.visible(), m.set.hidden(), m.force.hidden(), u.onHide.call(c), u.onComplete.call(c);
        },
        show: function show(e) {
          m.verbose("Showing element", e), m.remove.hidden(), m.set.visible(), m.force.visible(), u.onShow.call(c), u.onComplete.call(c);
        },
        toggle: function toggle() {
          m.is.visible() ? m.hide() : m.show();
        },
        stop: function stop() {
          m.debug("Stopping current animation"), f.triggerHandler(o);
        },
        stopAll: function stopAll() {
          m.debug("Stopping all animation"), m.remove.queueCallback(), f.triggerHandler(o);
        },
        clear: {
          queue: function queue() {
            m.debug("Clearing animation queue"), m.remove.queueCallback();
          }
        },
        enable: function enable() {
          m.verbose("Starting animation"), f.removeClass(d.disabled);
        },
        disable: function disable() {
          m.debug("Stopping animation"), f.addClass(d.disabled);
        },
        setting: function setting(e, n) {
          if (m.debug("Changing setting", e, n), w.isPlainObject(e)) w.extend(!0, u, e);else {
            if (n === S) return u[e];
            w.isPlainObject(u[e]) ? w.extend(!0, u[e], n) : u[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (w.isPlainObject(e)) w.extend(!0, m, e);else {
            if (n === S) return m[e];
            m[e] = n;
          }
        },
        debug: function debug() {
          !u.silent && u.debug && (u.performance ? m.performance.log(arguments) : (m.debug = Function.prototype.bind.call(console.info, console, u.name + ":"), m.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !u.silent && u.verbose && u.debug && (u.performance ? m.performance.log(arguments) : (m.verbose = Function.prototype.bind.call(console.info, console, u.name + ":"), m.verbose.apply(console, arguments)));
        },
        error: function error() {
          u.silent || (m.error = Function.prototype.bind.call(console.error, console, u.name + ":"), m.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            u.performance && (t = (n = new Date().getTime()) - (p || n), p = n, h.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: c,
              "Execution Time": t
            })), clearTimeout(m.performance.timer), m.performance.timer = setTimeout(m.performance.display, 500);
          },
          display: function display() {
            var e = u.name + ":",
                t = 0;
            p = !1, clearTimeout(m.performance.timer), w.each(h, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", g && (e += " '" + g + "'"), 1 < s.length && (e += " (" + s.length + ")"), (console.group !== S || console.table !== S) && 0 < h.length && (console.groupCollapsed(e), console.table ? console.table(h) : w.each(h, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), h = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = a;
          return e = e || y, n = c || n, "string" == typeof i && s !== S && (i = i.split(/[\. ]/), o = i.length - 1, w.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (w.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== S) return r = s[t], !1;
              if (!w.isPlainObject(s[n]) || e == o) return s[n] !== S && (r = s[n]), !1;
              s = s[n];
            }
          })), w.isFunction(r) ? t = r.apply(n, e) : r !== S && (t = r), w.isArray(l) ? l.push(t) : l !== S ? l = [l, t] : t !== S && (l = t), r !== S && r;
        }
      }).initialize();
    }), l !== S ? l : this;
  }, w.fn.transition.exists = {}, w.fn.transition.settings = {
    name: "Transition",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    namespace: "transition",
    interval: 0,
    reverse: "auto",
    onStart: function onStart() {},
    onComplete: function onComplete() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    useFailSafe: !0,
    failSafeDelay: 100,
    allowRepeats: !1,
    displayType: !1,
    animation: "fade",
    duration: !1,
    queue: !0,
    metadata: {
      displayType: "display"
    },
    className: {
      animating: "animating",
      disabled: "disabled",
      hidden: "hidden",
      inward: "in",
      loading: "loading",
      looping: "looping",
      outward: "out",
      transition: "transition",
      visible: "visible"
    },
    error: {
      noAnimation: "Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",
      repeated: "That animation is already occurring, cancelling repeated animation",
      method: "The method you called is not defined",
      support: "This browser does not support CSS animations"
    }
  };
}(jQuery, window, document), function (S, e, k, T) {
  "use strict";

  e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), S.fn.dimmer = function (p) {
    var h,
        b = S(this),
        v = new Date().getTime(),
        y = [],
        C = p,
        w = "string" == typeof C,
        x = [].slice.call(arguments, 1);
    return b.each(function () {
      var r,
          n,
          a,
          s = S.isPlainObject(p) ? S.extend(!0, {}, S.fn.dimmer.settings, p) : S.extend({}, S.fn.dimmer.settings),
          t = s.selector,
          e = s.namespace,
          i = s.className,
          c = s.error,
          o = "." + e,
          l = "module-" + e,
          u = b.selector || "",
          d = "ontouchstart" in k.documentElement ? "touchstart" : "click",
          m = S(this),
          f = this,
          g = m.data(l);
      (a = {
        preinitialize: function preinitialize() {
          r = a.is.dimmer() ? (n = m.parent(), m) : (n = m, a.has.dimmer() ? s.dimmerName ? n.find(t.dimmer).filter("." + s.dimmerName) : n.find(t.dimmer) : a.create());
        },
        initialize: function initialize() {
          a.debug("Initializing dimmer", s), a.bind.events(), a.set.dimmable(), a.instantiate();
        },
        instantiate: function instantiate() {
          a.verbose("Storing instance of module", a), g = a, m.data(l, g);
        },
        destroy: function destroy() {
          a.verbose("Destroying previous module", r), a.unbind.events(), a.remove.variation(), n.off(o);
        },
        bind: {
          events: function events() {
            "hover" == s.on ? n.on("mouseenter" + o, a.show).on("mouseleave" + o, a.hide) : "click" == s.on && n.on(d + o, a.toggle), a.is.page() && (a.debug("Setting as a page dimmer", n), a.set.pageDimmer()), a.is.closable() && (a.verbose("Adding dimmer close event", r), n.on(d + o, t.dimmer, a.event.click));
          }
        },
        unbind: {
          events: function events() {
            m.removeData(l), n.off(o);
          }
        },
        event: {
          click: function click(e) {
            a.verbose("Determining if event occured on dimmer", e), (0 === r.find(e.target).length || S(e.target).is(t.content)) && (a.hide(), e.stopImmediatePropagation());
          }
        },
        addContent: function addContent(e) {
          var n = S(e);
          a.debug("Add content to dimmer", n), n.parent()[0] !== r[0] && n.detach().appendTo(r);
        },
        create: function create() {
          var e = S(s.template.dimmer());
          return s.dimmerName && (a.debug("Creating named dimmer", s.dimmerName), e.addClass(s.dimmerName)), e.appendTo(n), e;
        },
        show: function show(e) {
          e = S.isFunction(e) ? e : function () {}, a.debug("Showing dimmer", r, s), a.set.variation(), a.is.dimmed() && !a.is.animating() || !a.is.enabled() ? a.debug("Dimmer is already shown or disabled") : (a.animate.show(e), s.onShow.call(f), s.onChange.call(f));
        },
        hide: function hide(e) {
          e = S.isFunction(e) ? e : function () {}, a.is.dimmed() || a.is.animating() ? (a.debug("Hiding dimmer", r), a.animate.hide(e), s.onHide.call(f), s.onChange.call(f)) : a.debug("Dimmer is not visible");
        },
        toggle: function toggle() {
          a.verbose("Toggling dimmer visibility", r), a.is.dimmed() ? a.hide() : a.show();
        },
        animate: {
          show: function show(e) {
            e = S.isFunction(e) ? e : function () {}, s.useCSS && S.fn.transition !== T && r.transition("is supported") ? (s.useFlex ? (a.debug("Using flex dimmer"), a.remove.legacy()) : (a.debug("Using legacy non-flex dimmer"), a.set.legacy()), "auto" !== s.opacity && a.set.opacity(), r.transition({
              displayType: s.useFlex ? "flex" : "block",
              animation: s.transition + " in",
              queue: !1,
              duration: a.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                a.set.dimmed();
              },
              onComplete: function onComplete() {
                a.set.active(), e();
              }
            })) : (a.verbose("Showing dimmer animation with javascript"), a.set.dimmed(), "auto" == s.opacity && (s.opacity = .8), r.stop().css({
              opacity: 0,
              width: "100%",
              height: "100%"
            }).fadeTo(a.get.duration(), s.opacity, function () {
              r.removeAttr("style"), a.set.active(), e();
            }));
          },
          hide: function hide(e) {
            e = S.isFunction(e) ? e : function () {}, s.useCSS && S.fn.transition !== T && r.transition("is supported") ? (a.verbose("Hiding dimmer with css"), r.transition({
              displayType: s.useFlex ? "flex" : "block",
              animation: s.transition + " out",
              queue: !1,
              duration: a.get.duration(),
              useFailSafe: !0,
              onStart: function onStart() {
                a.remove.dimmed();
              },
              onComplete: function onComplete() {
                a.remove.variation(), a.remove.active(), e();
              }
            })) : (a.verbose("Hiding dimmer with javascript"), a.remove.dimmed(), r.stop().fadeOut(a.get.duration(), function () {
              a.remove.active(), r.removeAttr("style"), e();
            }));
          }
        },
        get: {
          dimmer: function dimmer() {
            return r;
          },
          duration: function duration() {
            return "object" == _typeof(s.duration) ? a.is.active() ? s.duration.hide : s.duration.show : s.duration;
          }
        },
        has: {
          dimmer: function dimmer() {
            return s.dimmerName ? 0 < m.find(t.dimmer).filter("." + s.dimmerName).length : 0 < m.find(t.dimmer).length;
          }
        },
        is: {
          active: function active() {
            return r.hasClass(i.active);
          },
          animating: function animating() {
            return r.is(":animated") || r.hasClass(i.animating);
          },
          closable: function closable() {
            return "auto" == s.closable ? "hover" != s.on : s.closable;
          },
          dimmer: function dimmer() {
            return m.hasClass(i.dimmer);
          },
          dimmable: function dimmable() {
            return m.hasClass(i.dimmable);
          },
          dimmed: function dimmed() {
            return n.hasClass(i.dimmed);
          },
          disabled: function disabled() {
            return n.hasClass(i.disabled);
          },
          enabled: function enabled() {
            return !a.is.disabled();
          },
          page: function page() {
            return n.is("body");
          },
          pageDimmer: function pageDimmer() {
            return r.hasClass(i.pageDimmer);
          }
        },
        can: {
          show: function show() {
            return !r.hasClass(i.disabled);
          }
        },
        set: {
          opacity: function opacity(e) {
            var n = r.css("background-color"),
                t = n.split(","),
                i = t && 3 == t.length,
                o = t && 4 == t.length;
            e = 0 === s.opacity ? 0 : s.opacity || e, n = i || o ? (t[3] = e + ")", t.join(",")) : "rgba(0, 0, 0, " + e + ")", a.debug("Setting opacity to", e), r.css("background-color", n);
          },
          legacy: function legacy() {
            r.addClass(i.legacy);
          },
          active: function active() {
            r.addClass(i.active);
          },
          dimmable: function dimmable() {
            n.addClass(i.dimmable);
          },
          dimmed: function dimmed() {
            n.addClass(i.dimmed);
          },
          pageDimmer: function pageDimmer() {
            r.addClass(i.pageDimmer);
          },
          disabled: function disabled() {
            r.addClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || s.variation) && r.addClass(e);
          }
        },
        remove: {
          active: function active() {
            r.removeClass(i.active);
          },
          legacy: function legacy() {
            r.removeClass(i.legacy);
          },
          dimmed: function dimmed() {
            n.removeClass(i.dimmed);
          },
          disabled: function disabled() {
            r.removeClass(i.disabled);
          },
          variation: function variation(e) {
            (e = e || s.variation) && r.removeClass(e);
          }
        },
        setting: function setting(e, n) {
          if (a.debug("Changing setting", e, n), S.isPlainObject(e)) S.extend(!0, s, e);else {
            if (n === T) return s[e];
            S.isPlainObject(s[e]) ? S.extend(!0, s[e], n) : s[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (S.isPlainObject(e)) S.extend(!0, a, e);else {
            if (n === T) return a[e];
            a[e] = n;
          }
        },
        debug: function debug() {
          !s.silent && s.debug && (s.performance ? a.performance.log(arguments) : (a.debug = Function.prototype.bind.call(console.info, console, s.name + ":"), a.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !s.silent && s.verbose && s.debug && (s.performance ? a.performance.log(arguments) : (a.verbose = Function.prototype.bind.call(console.info, console, s.name + ":"), a.verbose.apply(console, arguments)));
        },
        error: function error() {
          s.silent || (a.error = Function.prototype.bind.call(console.error, console, s.name + ":"), a.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            s.performance && (t = (n = new Date().getTime()) - (v || n), v = n, y.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: f,
              "Execution Time": t
            })), clearTimeout(a.performance.timer), a.performance.timer = setTimeout(a.performance.display, 500);
          },
          display: function display() {
            var e = s.name + ":",
                t = 0;
            v = !1, clearTimeout(a.performance.timer), S.each(y, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", u && (e += " '" + u + "'"), 1 < b.length && (e += " (" + b.length + ")"), (console.group !== T || console.table !== T) && 0 < y.length && (console.groupCollapsed(e), console.table ? console.table(y) : S.each(y, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), y = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = g;
          return e = e || x, n = f || n, "string" == typeof i && s !== T && (i = i.split(/[\. ]/), o = i.length - 1, S.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (S.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== T) return r = s[t], !1;
              if (!S.isPlainObject(s[n]) || e == o) return s[n] !== T ? r = s[n] : a.error(c.method, i), !1;
              s = s[n];
            }
          })), S.isFunction(r) ? t = r.apply(n, e) : r !== T && (t = r), S.isArray(h) ? h.push(t) : h !== T ? h = [h, t] : t !== T && (h = t), r;
        }
      }).preinitialize(), w ? (g === T && a.initialize(), a.invoke(C)) : (g !== T && g.invoke("destroy"), a.initialize());
    }), h !== T ? h : this;
  }, S.fn.dimmer.settings = {
    name: "Dimmer",
    namespace: "dimmer",
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    useFlex: !0,
    dimmerName: !1,
    variation: !1,
    closable: "auto",
    useCSS: !0,
    transition: "fade",
    on: !1,
    opacity: "auto",
    duration: {
      show: 500,
      hide: 500
    },
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    error: {
      method: "The method you called is not defined."
    },
    className: {
      active: "active",
      animating: "animating",
      dimmable: "dimmable",
      dimmed: "dimmed",
      dimmer: "dimmer",
      disabled: "disabled",
      hide: "hide",
      legacy: "legacy",
      pageDimmer: "page",
      show: "show"
    },
    selector: {
      dimmer: "> .ui.dimmer",
      content: ".ui.dimmer > .content, .ui.dimmer > .content > .center"
    },
    template: {
      dimmer: function dimmer() {
        return S("<div />").attr("class", "ui dimmer");
      }
    }
  };
}(jQuery, window, document), function (P, M, z, N) {
  "use strict";

  M = void 0 !== M && M.Math == Math ? M : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), P.fn.modal = function (x) {
    var S,
        e = P(this),
        k = P(M),
        T = P(z),
        A = P("body"),
        R = e.selector || "",
        F = new Date().getTime(),
        q = [],
        D = x,
        E = "string" == typeof D,
        O = [].slice.call(arguments, 1),
        j = M.requestAnimationFrame || M.mozRequestAnimationFrame || M.webkitRequestAnimationFrame || M.msRequestAnimationFrame || function (e) {
      setTimeout(e, 0);
    };

    return e.each(function () {
      var t,
          i,
          e,
          o,
          r,
          n,
          s,
          a,
          c,
          l = P.isPlainObject(x) ? P.extend(!0, {}, P.fn.modal.settings, x) : P.extend({}, P.fn.modal.settings),
          u = l.selector,
          d = l.className,
          m = l.namespace,
          f = l.error,
          g = "." + m,
          p = "module-" + m,
          h = P(this),
          b = P(l.context),
          v = h.find(u.close),
          y = this,
          C = h.data(p),
          w = !1;
      c = {
        initialize: function initialize() {
          c.verbose("Initializing dimmer", b), c.create.id(), c.create.dimmer(), c.refreshModals(), c.bind.events(), l.observeChanges && c.observeChanges(), c.instantiate();
        },
        instantiate: function instantiate() {
          c.verbose("Storing instance of modal"), C = c, h.data(p, C);
        },
        create: {
          dimmer: function dimmer() {
            var e = {
              debug: l.debug,
              variation: !l.centered && "top aligned",
              dimmerName: "modals"
            },
                n = P.extend(!0, e, l.dimmerSettings);
            P.fn.dimmer !== N ? (c.debug("Creating dimmer"), o = b.dimmer(n), l.detachable ? (c.verbose("Modal is detachable, moving content into dimmer"), o.dimmer("add content", h)) : c.set.undetached(), r = o.dimmer("get dimmer")) : c.error(f.dimmer);
          },
          id: function id() {
            s = (Math.random().toString(16) + "000000000").substr(2, 8), n = "." + s, c.verbose("Creating unique id for element", s);
          }
        },
        destroy: function destroy() {
          c.verbose("Destroying previous modal"), h.removeData(p).off(g), k.off(n), r.off(n), v.off(g), b.dimmer("destroy");
        },
        observeChanges: function observeChanges() {
          "MutationObserver" in M && ((a = new MutationObserver(function (e) {
            c.debug("DOM tree modified, refreshing"), c.refresh();
          })).observe(y, {
            childList: !0,
            subtree: !0
          }), c.debug("Setting up mutation observer", a));
        },
        refresh: function refresh() {
          c.remove.scrolling(), c.cacheSizes(), c.can.useFlex() || c.set.modalOffset(), c.set.screenHeight(), c.set.type();
        },
        refreshModals: function refreshModals() {
          i = h.siblings(u.modal), t = i.add(h);
        },
        attachEvents: function attachEvents(e, n) {
          var t = P(e);
          n = P.isFunction(c[n]) ? c[n] : c.toggle, 0 < t.length ? (c.debug("Attaching modal events to element", e, n), t.off(g).on("click" + g, n)) : c.error(f.notFound, e);
        },
        bind: {
          events: function events() {
            c.verbose("Attaching events"), h.on("click" + g, u.close, c.event.close).on("click" + g, u.approve, c.event.approve).on("click" + g, u.deny, c.event.deny), k.on("resize" + n, c.event.resize);
          },
          scrollLock: function scrollLock() {
            o.get(0).addEventListener("touchmove", c.event.preventScroll, {
              passive: !1
            });
          }
        },
        unbind: {
          scrollLock: function scrollLock() {
            o.get(0).removeEventListener("touchmove", c.event.preventScroll, {
              passive: !1
            });
          }
        },
        get: {
          id: function id() {
            return (Math.random().toString(16) + "000000000").substr(2, 8);
          }
        },
        event: {
          approve: function approve() {
            w || !1 === l.onApprove.call(y, P(this)) ? c.verbose("Approve callback returned false cancelling hide") : (w = !0, c.hide(function () {
              w = !1;
            }));
          },
          preventScroll: function preventScroll(e) {
            e.preventDefault();
          },
          deny: function deny() {
            w || !1 === l.onDeny.call(y, P(this)) ? c.verbose("Deny callback returned false cancelling hide") : (w = !0, c.hide(function () {
              w = !1;
            }));
          },
          close: function close() {
            c.hide();
          },
          click: function click(e) {
            if (l.closable) {
              var n = 0 < P(e.target).closest(u.modal).length,
                  t = P.contains(z.documentElement, e.target);
              !n && t && c.is.active() && (c.debug("Dimmer clicked, hiding all modals"), c.remove.clickaway(), l.allowMultiple ? c.hide() : c.hideAll());
            } else c.verbose("Dimmer clicked but closable setting is disabled");
          },
          debounce: function debounce(e, n) {
            clearTimeout(c.timer), c.timer = setTimeout(e, n);
          },
          keyboard: function keyboard(e) {
            27 == e.which && (l.closable ? (c.debug("Escape key pressed hiding modal"), c.hide()) : c.debug("Escape key pressed, but closable is set to false"), e.preventDefault());
          },
          resize: function resize() {
            o.dimmer("is active") && (c.is.animating() || c.is.active()) && j(c.refresh);
          }
        },
        toggle: function toggle() {
          c.is.active() || c.is.animating() ? c.hide() : c.show();
        },
        show: function show(e) {
          e = P.isFunction(e) ? e : function () {}, c.refreshModals(), c.set.dimmerSettings(), c.set.dimmerStyles(), c.showModal(e);
        },
        hide: function hide(e) {
          e = P.isFunction(e) ? e : function () {}, c.refreshModals(), c.hideModal(e);
        },
        showModal: function showModal(e) {
          e = P.isFunction(e) ? e : function () {}, c.is.animating() || !c.is.active() ? (c.showDimmer(), c.cacheSizes(), c.can.useFlex() ? c.remove.legacy() : (c.set.legacy(), c.set.modalOffset(), c.debug("Using non-flex legacy modal positioning.")), c.set.screenHeight(), c.set.type(), c.set.clickaway(), !l.allowMultiple && c.others.active() ? c.hideOthers(c.showModal) : (l.allowMultiple && l.detachable && h.detach().appendTo(r), l.onShow.call(y), l.transition && P.fn.transition !== N && h.transition("is supported") ? (c.debug("Showing modal with css animations"), h.transition({
            debug: l.debug,
            animation: l.transition + " in",
            queue: l.queue,
            duration: l.duration,
            useFailSafe: !0,
            onComplete: function onComplete() {
              l.onVisible.apply(y), l.keyboardShortcuts && c.add.keyboardShortcuts(), c.save.focus(), c.set.active(), l.autofocus && c.set.autofocus(), e();
            }
          })) : c.error(f.noTransition))) : c.debug("Modal is already visible");
        },
        hideModal: function hideModal(e, n) {
          e = P.isFunction(e) ? e : function () {}, c.debug("Hiding modal"), !1 !== l.onHide.call(y, P(this)) ? (c.is.animating() || c.is.active()) && (l.transition && P.fn.transition !== N && h.transition("is supported") ? (c.remove.active(), h.transition({
            debug: l.debug,
            animation: l.transition + " out",
            queue: l.queue,
            duration: l.duration,
            useFailSafe: !0,
            onStart: function onStart() {
              c.others.active() || n || c.hideDimmer(), l.keyboardShortcuts && c.remove.keyboardShortcuts();
            },
            onComplete: function onComplete() {
              l.onHidden.call(y), c.remove.dimmerStyles(), c.restore.focus(), e();
            }
          })) : c.error(f.noTransition)) : c.verbose("Hide callback returned false cancelling hide");
        },
        showDimmer: function showDimmer() {
          o.dimmer("is animating") || !o.dimmer("is active") ? (c.debug("Showing dimmer"), o.dimmer("show")) : c.debug("Dimmer already visible");
        },
        hideDimmer: function hideDimmer() {
          o.dimmer("is animating") || o.dimmer("is active") ? (c.unbind.scrollLock(), o.dimmer("hide", function () {
            c.remove.clickaway(), c.remove.screenHeight();
          })) : c.debug("Dimmer is not visible cannot hide");
        },
        hideAll: function hideAll(e) {
          var n = t.filter("." + d.active + ", ." + d.animating);
          e = P.isFunction(e) ? e : function () {}, 0 < n.length && (c.debug("Hiding all visible modals"), c.hideDimmer(), n.modal("hide modal", e));
        },
        hideOthers: function hideOthers(e) {
          var n = i.filter("." + d.active + ", ." + d.animating);
          e = P.isFunction(e) ? e : function () {}, 0 < n.length && (c.debug("Hiding other modals", i), n.modal("hide modal", e, !0));
        },
        others: {
          active: function active() {
            return 0 < i.filter("." + d.active).length;
          },
          animating: function animating() {
            return 0 < i.filter("." + d.animating).length;
          }
        },
        add: {
          keyboardShortcuts: function keyboardShortcuts() {
            c.verbose("Adding keyboard shortcuts"), T.on("keyup" + g, c.event.keyboard);
          }
        },
        save: {
          focus: function focus() {
            0 < P(z.activeElement).closest(h).length || (e = P(z.activeElement).blur());
          }
        },
        restore: {
          focus: function focus() {
            e && 0 < e.length && e.focus();
          }
        },
        remove: {
          active: function active() {
            h.removeClass(d.active);
          },
          legacy: function legacy() {
            h.removeClass(d.legacy);
          },
          clickaway: function clickaway() {
            r.off("click" + n);
          },
          dimmerStyles: function dimmerStyles() {
            r.removeClass(d.inverted), o.removeClass(d.blurring);
          },
          bodyStyle: function bodyStyle() {
            "" === A.attr("style") && (c.verbose("Removing style attribute"), A.removeAttr("style"));
          },
          screenHeight: function screenHeight() {
            c.debug("Removing page height"), A.css("height", "");
          },
          keyboardShortcuts: function keyboardShortcuts() {
            c.verbose("Removing keyboard shortcuts"), T.off("keyup" + g);
          },
          scrolling: function scrolling() {
            o.removeClass(d.scrolling), h.removeClass(d.scrolling);
          }
        },
        cacheSizes: function cacheSizes() {
          h.addClass(d.loading);
          var e = h.prop("scrollHeight"),
              n = h.outerWidth(),
              t = h.outerHeight();
          c.cache !== N && 0 === t || (c.cache = {
            pageHeight: P(z).outerHeight(),
            width: n,
            height: t + l.offset,
            scrollHeight: e + l.offset,
            contextHeight: "body" == l.context ? P(M).height() : o.height()
          }, c.cache.topOffset = -c.cache.height / 2), h.removeClass(d.loading), c.debug("Caching modal and container sizes", c.cache);
        },
        can: {
          useFlex: function useFlex() {
            return "auto" == l.useFlex ? l.detachable && !c.is.ie() : l.useFlex;
          },
          fit: function fit() {
            var e = c.cache.contextHeight,
                n = c.cache.contextHeight / 2,
                t = c.cache.topOffset,
                i = c.cache.scrollHeight,
                o = c.cache.height,
                r = l.padding;
            return o < i ? n + t + i + r < e : o + 2 * r < e;
          }
        },
        is: {
          active: function active() {
            return h.hasClass(d.active);
          },
          ie: function ie() {
            return !M.ActiveXObject && "ActiveXObject" in M || "ActiveXObject" in M;
          },
          animating: function animating() {
            return h.transition("is supported") ? h.transition("is animating") : h.is(":visible");
          },
          scrolling: function scrolling() {
            return o.hasClass(d.scrolling);
          },
          modernBrowser: function modernBrowser() {
            return !(M.ActiveXObject || "ActiveXObject" in M);
          }
        },
        set: {
          autofocus: function autofocus() {
            var e = h.find("[tabindex], :input").filter(":visible"),
                n = e.filter("[autofocus]"),
                t = 0 < n.length ? n.first() : e.first();
            0 < t.length && t.focus();
          },
          clickaway: function clickaway() {
            r.on("click" + n, c.event.click);
          },
          dimmerSettings: function dimmerSettings() {
            if (P.fn.dimmer !== N) {
              var e = {
                debug: l.debug,
                dimmerName: "modals",
                closable: "auto",
                useFlex: c.can.useFlex(),
                variation: !l.centered && "top aligned",
                duration: {
                  show: l.duration,
                  hide: l.duration
                }
              },
                  n = P.extend(!0, e, l.dimmerSettings);
              l.inverted && (n.variation = n.variation !== N ? n.variation + " inverted" : "inverted"), b.dimmer("setting", n);
            } else c.error(f.dimmer);
          },
          dimmerStyles: function dimmerStyles() {
            l.inverted ? r.addClass(d.inverted) : r.removeClass(d.inverted), l.blurring ? o.addClass(d.blurring) : o.removeClass(d.blurring);
          },
          modalOffset: function modalOffset() {
            var e = c.cache.width,
                n = c.cache.height;
            h.css({
              marginTop: l.centered && c.can.fit() ? -n / 2 : 0,
              marginLeft: -e / 2
            }), c.verbose("Setting modal offset for legacy mode");
          },
          screenHeight: function screenHeight() {
            c.can.fit() ? A.css("height", "") : (c.debug("Modal is taller than page content, resizing page height"), A.css("height", c.cache.height + 2 * l.padding));
          },
          active: function active() {
            h.addClass(d.active);
          },
          scrolling: function scrolling() {
            o.addClass(d.scrolling), h.addClass(d.scrolling), c.unbind.scrollLock();
          },
          legacy: function legacy() {
            h.addClass(d.legacy);
          },
          type: function type() {
            c.can.fit() ? (c.verbose("Modal fits on screen"), c.others.active() || c.others.animating() || (c.remove.scrolling(), c.bind.scrollLock())) : (c.verbose("Modal cannot fit on screen setting to scrolling"), c.set.scrolling());
          },
          undetached: function undetached() {
            o.addClass(d.undetached);
          }
        },
        setting: function setting(e, n) {
          if (c.debug("Changing setting", e, n), P.isPlainObject(e)) P.extend(!0, l, e);else {
            if (n === N) return l[e];
            P.isPlainObject(l[e]) ? P.extend(!0, l[e], n) : l[e] = n;
          }
        },
        internal: function internal(e, n) {
          if (P.isPlainObject(e)) P.extend(!0, c, e);else {
            if (n === N) return c[e];
            c[e] = n;
          }
        },
        debug: function debug() {
          !l.silent && l.debug && (l.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, l.name + ":"), c.debug.apply(console, arguments)));
        },
        verbose: function verbose() {
          !l.silent && l.verbose && l.debug && (l.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, l.name + ":"), c.verbose.apply(console, arguments)));
        },
        error: function error() {
          l.silent || (c.error = Function.prototype.bind.call(console.error, console, l.name + ":"), c.error.apply(console, arguments));
        },
        performance: {
          log: function log(e) {
            var n, t;
            l.performance && (t = (n = new Date().getTime()) - (F || n), F = n, q.push({
              Name: e[0],
              Arguments: [].slice.call(e, 1) || "",
              Element: y,
              "Execution Time": t
            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 500);
          },
          display: function display() {
            var e = l.name + ":",
                t = 0;
            F = !1, clearTimeout(c.performance.timer), P.each(q, function (e, n) {
              t += n["Execution Time"];
            }), e += " " + t + "ms", R && (e += " '" + R + "'"), (console.group !== N || console.table !== N) && 0 < q.length && (console.groupCollapsed(e), console.table ? console.table(q) : P.each(q, function (e, n) {
              console.log(n.Name + ": " + n["Execution Time"] + "ms");
            }), console.groupEnd()), q = [];
          }
        },
        invoke: function invoke(i, e, n) {
          var o,
              r,
              t,
              s = C;
          return e = e || O, n = y || n, "string" == typeof i && s !== N && (i = i.split(/[\. ]/), o = i.length - 1, P.each(i, function (e, n) {
            var t = e != o ? n + i[e + 1].charAt(0).toUpperCase() + i[e + 1].slice(1) : i;
            if (P.isPlainObject(s[t]) && e != o) s = s[t];else {
              if (s[t] !== N) return r = s[t], !1;
              if (!P.isPlainObject(s[n]) || e == o) return s[n] !== N && (r = s[n]), !1;
              s = s[n];
            }
          })), P.isFunction(r) ? t = r.apply(n, e) : r !== N && (t = r), P.isArray(S) ? S.push(t) : S !== N ? S = [S, t] : t !== N && (S = t), r;
        }
      }, E ? (C === N && c.initialize(), c.invoke(D)) : (C !== N && C.invoke("destroy"), c.initialize());
    }), S !== N ? S : this;
  }, P.fn.modal.settings = {
    name: "Modal",
    namespace: "modal",
    useFlex: "auto",
    offset: 0,
    silent: !1,
    debug: !1,
    verbose: !1,
    performance: !0,
    observeChanges: !1,
    allowMultiple: !1,
    detachable: !0,
    closable: !0,
    autofocus: !0,
    inverted: !1,
    blurring: !1,
    centered: !0,
    dimmerSettings: {
      closable: !1,
      useCSS: !0
    },
    keyboardShortcuts: !0,
    context: "body",
    queue: !1,
    duration: 500,
    transition: "scale",
    padding: 50,
    onShow: function onShow() {},
    onVisible: function onVisible() {},
    onHide: function onHide() {
      return !0;
    },
    onHidden: function onHidden() {},
    onApprove: function onApprove() {
      return !0;
    },
    onDeny: function onDeny() {
      return !0;
    },
    selector: {
      close: "> .close",
      approve: ".actions .positive, .actions .approve, .actions .ok",
      deny: ".actions .negative, .actions .deny, .actions .cancel",
      modal: ".ui.modal"
    },
    error: {
      dimmer: "UI Dimmer, a required component is not included in this page",
      method: "The method you called is not defined.",
      notFound: "The element you specified could not be found"
    },
    className: {
      active: "active",
      animating: "animating",
      blurring: "blurring",
      inverted: "inverted",
      legacy: "legacy",
      loading: "loading",
      scrolling: "scrolling",
      undetached: "undetached"
    }
  };
}(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/js/index/main.js ./resources/sass/index/main.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/wangjue/Sites/workbition/resources/js/index/main.js */"./resources/js/index/main.js");
module.exports = __webpack_require__(/*! /Users/wangjue/Sites/workbition/resources/sass/index/main.scss */"./resources/sass/index/main.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);