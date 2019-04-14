import ellipsisText from './ellipsisText'



/**
* Page Banners - Corner Banners
**/

$(document).ready(function() {

  //解决在Edge浏览器中重新加载页面时，corner banners右上角的label闪现黑色的背景颜色
  $('#main_content .page_banners .corner_banners .right.corner.label').css('visibility', 'visible');

})

/** When hovering on the corner banner, chaging the shape of the image in it by using CSS commands **/
$('#main_content .corner_banners .corner_banner').hover(

  /** When the mouse enters into the corner banner area, turning the shape of the image into cornered square from circle **/
  (event) => {

    $(event.currentTarget).find('.card_image').css({

      'border-radius': '15%'

    })

  },

  /** When the mouse leave the corner banner area, turning the shape of the image into circle from cornered square **/
  (event) => {

    $(event.currentTarget).find('.card_image').css({

      'border-radius': '50%'

    })

  }

)



let cornerBannerDescriptions = $('#main_content .page_banners .corner_banners .corner_banner .card_area .card_content .description span')

ellipsisText(cornerBannerDescriptions)
