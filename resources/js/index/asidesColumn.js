import ellipsisText from './ellipsisText'



/**
* Asides Column - Articles Feed
**/



/** Providing the ellipsis(...) to the elements when their texts are more than 2 lines **/
let articlesFeedAsideHeaders = $('#main_content .articles-feed .row .asides.column .aside1 .item .content .header')

ellipsisText(articlesFeedAsideHeaders)
