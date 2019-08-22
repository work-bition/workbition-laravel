
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

import { isIE11 } from './detectBrowsers'

import 'objectFitPolyfill'

import './accountModal'

import './searchBar'

import './sidebar'



/** Providing the dropdown functionality when clicking on the avatar icon **/
$('#header .right.menu .authentication-links .avatar-container .ui.avatar.dropdown')

  .dropdown({

    transition: 'fade'

  })


/** sovle the problem that clicking on the items of the drowpdown menu will casue the doropdown menu to hide and show agagin in IE 11 browsers **/
if (isIE11) {

  $('#header .right.menu .authentication-links .avatar-container .ui.avatar.dropdown .menu').click((event) => {

    $(document.activeElement).blur()

  })

}



/** Animation effect **/
$('#header .avatar.dropdown .menu a.item, #header .avatar.dropdown .menu .button').hover(

  (event) => {

  $(event.currentTarget.children[0])

    .transition('tada')

  },

  (event) => {

  $(event.currentTarget.children[0])

    .transition('stop')

})
