
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/



import { isiOS, isAndroid, isIE11 } from './detectBrowsers'

import enquire from  'enquire.js'



/**
* header - sidebar
**/



/** Clone Some Html Codes for Reducing the Page Size **/
/** Cloning the logo section into sidebar **/
$('#header .logo_section a.logo_link')

   .clone()/** optional parameter: includeEvents **/

   .appendTo('#main_sidebar section.sidebar_header')

/** Cloning the items of the main navigation into sidebar **/
$('#main_nav .left.menu a.item')

   .clone()/** optional parameter: includeEvents **/

   .appendTo('#main_sidebar section.ui.menu ul')

   .wrap('<li></li>')

/** Cloning the register button into sidebar **/
$('#header .right.menu .register_button')

   .clone(true)/** optional parameter: includeEvents **/

   .appendTo('#main_sidebar .ui.menu .login_register_buttons')

/** Resizing the height for iOS and Android devices **/
let resizeSidebarHeight = function(){

  /* resizing the height of the sidebar when the ios device is detected */
  if ( isiOS || isAndroid ) {

    $('#main_sidebar .content_wrapper').css('height', $(window).height())

  }

}

/** When chaging the orientation of the devices, closing the sidebar **/
$(window).on('orientationchange', function(event) {

  /* making the sidebar invisible */
  $('#main_sidebar .close_layer a').click()

  /** making the results panel of the search box to be close **/
  $('#header .right.menu .ui.search').search('hide results')

})

/** toggling the display of the sidebar **/
$('#main_sidebar')

 .sidebar({

   transition: 'overlay',

   mobileTransition: 'overlay',

   dimPage: false,

   context:'body',

   onVisible: () => {

     /** Resizing the height for iOS devices **/
     resizeSidebarHeight()

     /** when opening the sidebar, preventing the body layer from moving **/
     $('body').addClass('fixed_layer')

   },

   onHidden: () => {

     /** when closing the sidebar, releasing the original state of the body layer **/
     $('body').removeClass('fixed_layer')

   }

 })

 .sidebar('attach events', '#header .right.menu .menu_button .align.justify.icon')

 /** making the sidebar invisible **/
 $('#main_sidebar .close_layer a').click((event) => {

   $('#main_sidebar')

    .sidebar('hide')

 })


 /** when the width of the screen is greater than 768px, close the sidebar if it is open **/
 enquire.register("screen and (min-width: 768px)", {

   match() {

     if ( $('#main_sidebar').sidebar('is visible') ) {

       $('#main_sidebar .close_layer a').click()

     }

   }

 })
