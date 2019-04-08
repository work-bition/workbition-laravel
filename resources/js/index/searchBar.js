
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/



import { isiOS, isAndroid, isIE11 } from './detectBrowsers'



/**
* header - search bar
**/



/** When using Chinese input, do not show search results before Chinese characters are spell out **/

/** flag showing whether Chinese characters are spell out **/
let chineseInput_flag = true

/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/
/** but Chinese words are not generated **/
$('#header .right.menu .ui.search input.prompt').on('compositionstart',function(){

    /** the state of combining Chinese words is not finished **/
    chineseInput_flag = false

})

/** This event indicates that the alphabetic characters used for spelling Chinese words has been typed, **/
/** and all the relative Chinese words are generated **/
$('#header .right.menu .ui.search input.prompt').on('compositionend',function(){

   /** the state of combining Chinese words is finished **/
    chineseInput_flag = true

})

/** the message that needs to be passed when there's no search result returned **/
$.fn.search.settings.error.noResults = '抱歉～您的搜索没匹配到任何结果。'

/** the html code generated when there's no search result returned **/
$.fn.search.settings.templates.message = (message, type) => {

  let html = ''

  if( message !== undefined && type !== undefined ) {

    html +=  ''

      + '<div class="message ' + type + '">'

    // when there's no result returned, the html code that should be generated
    if( type == 'empty' ) {

      html += ''

        + '<div class="header">没找到“<span>' + $('#header .right.menu .ui.search').search('get value') + '</span>”的搜索结果</div>'

        + '<br />'

        + '<div class="description">' + message + '</div>'

        + '<br />'

        + '<div class="description"><a href="http://www.pingwest.com">告诉我们</a>您感兴趣的话题，根据反馈，我们有可能在将来增加相关的内容。</div>'

    }

   /** other circumstances **/
    else {

      html += ' <div class="description">' + message + '</div>'

    }

    html += '</div>'

  }

  return html

}

/** local search data **/
let content = [

  { title: '还要啥男朋友？！白领自拍指南' },
  { title: '不学你就out啦！财务工作必须掌握的20个Excel函数' },
  { title: '1Password——密码管理的终极解决方案' },
  { title: '5分钟设计出Excel的花式图表' },
  { title: '精通Word排版艺术' },
  { title: 'Word PowerPoint Excel基础教程' },
  { title: 'Armenia' },
  { title: 'Netherlands Antilles' },
  { title: 'Angola' },
  { title: 'Argentina' },
  { title: 'American Samoa' },
  { title: 'Austria' },
  { title: 'Australia' },
  { title: 'Aruba' },
  { title: 'Aland Islands' },
  { title: 'Azerbaijan' },
  { title: 'Bosnia' },
  { title: 'Barbados' },
  { title: 'Bangladesh' },
  { title: 'Belgium' },
  { title: 'Burkina Faso' },
  { title: 'Bulgaria' },
  { title: 'Bahrain' },
  { title: 'Burundi' }

]

/** activate the search feature **/
$('#header .right.menu .ui.search')

  .search({

    source: content,

    fullTextSearch: true,

    transition: 'fade',

    maxResults: 10,

    onResultsOpen: () => {

      //$('#main_content .page_banners')[0].style.zIndex = -1

    },

    onResultsClose: () => {

      //$('#main_content .page_banners')[0].style.zIndex = 'auto'

    },

    onSearchQuery: (query) => {

      if($.trim(query)==='') {

        $('#header .right.menu .ui.search .results').addClass('hide_results')

      }

      else {

        setTimeout(function(){


            /** if the state of combining Chinese words is not finished, do not show any search results **/
            if(!chineseInput_flag){

              $('#header .right.menu .ui.search .results').addClass('hide_results')

            }

            /** if the state of combining Chinese words is finished, showing the relative search results **/
            else {

              $('#header .right.menu .ui.search .results').removeClass('hide_results')

              $('#header .right.menu .ui.search').search('search local', $.trim(query))

            }

        }, 0)

      }

    }

  })

/** when clicking on the search icon, make the search box visible **/
$('#header .right.menu .ui.search i.search.icon').click((event) => {

  /** if Android devices are detected, making the close icon a little bit larger **/
  /** the reason why doing this is because the small close icon on Android devices is very hard to click **/

  if (isAndroid) {

    /** the 'large' class can make the icon become large **/
    $('#header .right.menu .ui.search .close.icon').addClass('large')

    /** making the close icon in the correct position after adjusting its size **/
    $('#header .right.menu .ui.search .close.icon')[0].style.transform = 'translateY(-0.05rem)'

  }

  /** making search box visible **/

  let search_input = $('#header .right.menu .ui.search input.prompt')[0]

  search_input.style.visibility = 'visible'

  /** making search input get foucs **/
  if (!isIE11) {

    search_input.focus()

  }



  /** making wechat official platform buttons invisible **/

  let wechat_official_platform = $('#header .right.menu .wechat-official-platform')

  wechat_official_platform[0].style.display='none'

  /** making the divider invisible **/

  let divider_item = $('#header .right.menu>.divider_item')

  divider_item[0].style.display='none'

  /** making login and register buttons invisible **/

  let authentication_links = $('#header .right.menu .authentication-links')

  authentication_links[0].style.display='none'

  /** removing 'link' class via jQuery **/

  $(event.currentTarget).removeClass('link')

  /** making the close icon visible **/

  $('#header .right.menu .ui.search i.close.icon')[0].style.display = 'inline-block'

  /** adding class to search icon for negative margin **/

  $(event.currentTarget).addClass('negative_mg_lft')

  /** stopping the propagation **/

  event.stopPropagation()



})

/** when click on the close icon, closing the search results panels in two steps **/
$('#header .right.menu .ui.search i.close.icon').click((event) => {

  /** if search results panel is open, just close it and do nothing else **/
  if ($('#header .right.menu .ui.search').search('is visible')) {

    $('#header .right.menu .ui.search').search('hide results')

    /** clear the input in the search box **/
    $('#header .right.menu .ui.search input.prompt').val('')

  }

  /** if search results panel is not open, make the search box invisble **/
  else {

    /* making search input invisible */

    let search_input = $('#header .right.menu .ui.search input.prompt')[0]

    search_input.style.visibility = 'hidden'

    search_input.style.width = '0'

    /* making close icon invisible */

    let close_icon = event.currentTarget

    close_icon.style.display = 'none'

    /* making wechat public platform, the divider, the login and register buttons visible */

    let wechat_official_platform = $('#header .right.menu .wechat-official-platform')

    let divider_item = $('#header .right.menu>.divider_item')

    let authentication_links = $('#header .right.menu .authentication-links')

    wechat_official_platform[0].style.display='flex'

    divider_item[0].style.display='block'

    authentication_links[0].style.display='flex'

    /* adding 'link' class to search icon via jQuery */
    $('#header .right.menu .ui.search i.search.icon').addClass('link')

    /* removing class from search icon for negative margin */
    $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft')

  }

})

/** preventing the body click event when click on search input **/
$('#header .right.menu .ui.search .prompt').click((event) => {

  /* stopping the propagation */
  event.stopPropagation()

})

/** When the keyboard is close, resize the height of the sidebar for Android devices **/
$('#header .right.menu .ui.search .prompt').blur(function(){

  if (isAndroid) {

    /** delay the display of the sidebar after resizing the height of it **/
    /** the reason why doing this is becasue only when the keyboard is close can you resize the height of the sidebar **/
    setTimeout("$('#main_sidebar .content_wrapper').css('height', $(window).height())", 200)

  }

})

/** when clicking the menu button, making the search bar invisible while the search bar is open **/
$('#header .right.menu .menu_button .align.justify.icon').click((event) => {


  /* making results panel of search input invisible if it shows up */
  $('#header .right.menu .ui.search .results').addClass('hide_results')

  /* making search input invisible */

  let search_input = $('#header .right.menu .ui.search input.prompt')[0]

  search_input.style.visibility = 'hidden'

  search_input.style.width = '0'

  /* making close icon invisible */

  let close_icon = $('#header .right.menu .ui.search .close.icon')[0]

  close_icon.style.display = 'none'

  /** when clicking the menu button, set the display of the wechat official platform section to 'flex' **/

  let wechat_official_platform = $('#header .header_content .right_wrap .right.menu .wechat-official-platform')

  wechat_official_platform[0].style.display = 'flex'

  /* when clicking the menu button, set the display of the dividers to 'block' */

  let dividers = $('#header .right.menu .divider_item')

  dividers[0].style.display ='block'

  dividers[1].style.display ='block'

  /* making login and register buttons visible */

  let authentication_links = $('#header .right.menu .authentication-links')

  authentication_links[0].style.display ='flex'

  /* adding 'link' class to search icon via jQuery */
  $('#header .right.menu .ui.search i.search.icon').addClass('link')

  /* removing class from search icon for negative margin */
  $('#header .right.menu .ui.search i.search.icon').removeClass('negative_mg_lft')

})

/** when clicking in the viewport, making the search input get focus **/
$('body').click((event) => {


  /** clear the input in the search box **/
  $('#header .right.menu .ui.search input.prompt').val('')

  /** making search input get foucs **/
  let search_input = $('#header .right.menu .ui.search input.prompt')[0]

  /** in IE11, when the input is focused, placeholder can not be displayed **/
  if (!isIE11) {

    search_input.focus()

  }

})

/** hiding results panel of the search box when clicking on it **/
$('#header .right.menu .ui.search .results').click((event) => {

  /** hiding the results panel of the search bar **/
  $('#header .right.menu .ui.search').search('hide results')

  /** making search input get foucs **/
  let search_input = $('#header .right.menu .ui.search input.prompt')[0]

  /** clear the input **/
  $(search_input).val('')

  search_input.focus()

  /* stopping the propagation */
  event.stopPropagation()

})

/** Solve the problem of when the 'esc' key is pressed, SUI search component does not work **/
$(window).on('keyup', function(evt){

  if ( evt.which == 27 ) {

    $(".prompt").blur()

    $('#header .right.menu .ui.search i.close.icon').click()

  }

})
