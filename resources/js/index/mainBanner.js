/**
* Page Banners - Main Banner(featured carousel)
**/

/** Solve the problem that the images after the first one show out there out of the carousel area **/
/** befre the slick component takes effect when you refresh the page in the Chrome browser **/
$(document).ready(function() {

  $('.featured_carousel .image_holder').css('visibility', 'visible');

  $('#main_content .page_banners').css('box-shadow', '0 8px 24px 0 rgba(82,94,102,.15)');

  $('#main_content .page_banners .corner_banners .corner_banner').css('visibility', 'visible');

})

/** Activating the functionality of the featured carousel with the customized previous and next arrow indicators **/
$('#main_content .page_banners .featured_carousel').slick({

    autoplay: true,

    autoplaySpeed: 2000,

    fade: true,

    cssEase: 'linear',

    dots: true,

    prevArrow: '<button type="button" class="prev circular ui icon button"><i class="chevron left icon"></i></button>',

    nextArrow: '<button type="button" class="next circular ui icon button"><i class="chevron right icon"></i></button>'

})

/** Fix the problem that the slide pictures get in stuck temporarily when resizing the browser window **/
$(window).resize((event) => {

  let realtimeWidth =  $('#main_content .page_banners .main_banner .slick-list').width()

  $('#main_content .page_banners .main_banner .item .image_holder').css('width', realtimeWidth)

})

/** Fix the problem that the arrows doesn't fade out, **/
/** when the mouse hovers on the carousel area, navigation dots and left and right arrows, making the left and right arrows showing out there with fade animation effects **/
/** and make the color of the overlay on the slick slides change between lighter and darker **/
function moveNavButtons(disToMove, buttonOpacity){

  $('.featured_carousel .prev.button').css({

    'transform': `translate(${disToMove}, -50%)`,
    'opacity': `${buttonOpacity}`

  })

  $('.featured_carousel .next.button').css({

    'transform': `translate(-${disToMove}, -50%)`,
    'opacity': `${buttonOpacity}`

  })

}

$('.featured_carousel .slick-list, .featured_carousel .prev.button, .featured_carousel .next.button, .featured_carousel .slick-dots').hover(

  /** When the mouse enters into the carousel area, making the arrows fade in **/
  () => {

    moveNavButtons('1.2rem', 1)

  },

  /** When the mouse leaves the carousel area, making the arrows fade out **/
  () => {

    moveNavButtons('0.4rem', 0)

  }

)
