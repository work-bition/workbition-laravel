import '../../../semantic-ui/dist/semantic.min.js'

import './header'

import './mainNavigation'

import './pageBanners'

import './articlesFeed'

import './footer'

//借助webpack的require.context来动态引入所有svg图标文件
const request = require.context('../icons/svg', false, /\.svg$/)

request.keys().forEach(request)

window.$ = $

//svg sprite 清除无用'class'属性

$(document).ready(function() {

  $('body > svg > symbol').removeAttr('class')

  //Chrome和Firefox无法正常显示
  //$('body > svg > symbol').removeAttr('viewBox')

});
