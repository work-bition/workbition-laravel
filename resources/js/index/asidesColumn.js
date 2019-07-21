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

    context: '.articles-feed',

    offset: 78,

    observeChanges: true,

    pushing: false

})


/** when the width of the screen is less than 1262px, recalculates the offsets of the sticky **/
// enquire.register("screen and (max-width: 1262px)", {
//
//   match() {
//
//     // recalculates offsets
//     $('#main_content .articles-feed .asides.column .ui.sticky')
//       .sticky('refresh')
//
//   },
//
//   unmatch(){
//
//     // recalculates offsets
//     $('#main_content .articles-feed .asides.column .ui.sticky')
//       .sticky('refresh')
//
//   }
//
// })
