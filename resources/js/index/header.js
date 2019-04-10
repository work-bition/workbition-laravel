
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/



import 'objectFitPolyfill'

import './accountModal'

import './searchBar'

import './sidebar'



/** Providing the dropdown functionality when clicking on the avatar icon **/
$('#header .right.menu .authentication-links .avatar-container .ui.avatar.dropdown')

  .dropdown({

    transition: 'fade'

  })



  /** Animation effect **/
  $('#header .avatar.dropdown .menu a.item, #header .avatar.dropdown .menu .button').hover(function(event) {

    $(event.currentTarget.children[0])

      .transition('tada')

  }, function(event) {

    $(event.currentTarget.children[0])

      .transition('stop')

  })
