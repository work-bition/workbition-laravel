
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/



/**
* header - account modal
**/
$('#account_modal')

  .modal({

    closable: false,

    transition: 'zoom',

    duration: 100

  })

  .modal('attach events', '#header .register.button', 'show')

  .modal('attach events', '#header .login.button', 'show')

  $('#account_modal .close_button').click(() => {

    $('#account_modal')

     .modal('hide')

  })
