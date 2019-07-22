import ellipsisText from './ellipsisText'
import enquire from  'enquire.js'


/**
* Asides Column - Articles Feed
**/



/** Providing the ellipsis(...) to the elements when their texts are more than 2 lines **/
let articlesFeedAsideHeaders = $('#main_content .articles-feed .row .asides.column .aside1 .item .content .header')

ellipsisText(articlesFeedAsideHeaders)


$('#main_content .articles-feed .asides.column .ui.sticky')

  .sticky({

    context: '.articles-feed .asides.column',

    offset: 80,

    observeChanges: true,

    pushing: false

})


/** when the width of the screen is less than 579px, cancel the sticky **/
enquire.register("screen and (max-width: 579px)", {

  match() {

    // cancel the sticky
    $('#main_content .articles-feed .asides.column .asides-wrapper')
      .removeClass('sticky')

  },

  unmatch(){

    //resume the sticky
    $('#main_content .articles-feed .asides.column .asides-wrapper')
      .addClass('sticky')

  }

})
