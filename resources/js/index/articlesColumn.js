
/**
* Articles Column - Articles Feed
**/

/** Providing the popup functionality to the authorization icons **/
$('#main_content .articles-feed .articles.column .item .content .meta .authorization .icon')

  .popup({

    inline: false,

    transition: 'fade'

})

/** Providing the popup functionality when clicking on the share option icons **/
$('#main_content .articles-feed .articles.column .item .content .extra .article-options .share.option')

  .popup({

    inline: true,

    position: 'bottom center',

    hoverable: true,

    transition: 'fade',

    on: 'click'

  })
