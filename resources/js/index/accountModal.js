
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/


import { isValidEmailFormat, isEmpty } from './formValidation'

import axios from 'axios'

window.axios = axios



/**
* header - account modal
**/



/** Clone Some Html Codes for Reducing the Page Size **/
/** Cloning the benifits bar, third login and register link section into account login and account register section where necessary **/
$('#account_modal .account-register .content .benifits_bar')

   .clone()/** optional parameter: includeEvents **/

   .prependTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content')

$('#account_modal .account-register .content .third-login')

   .clone()/** optional parameter: includeEvents **/

   .appendTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content')

$('#account_modal .account-login .password-login .register-link')

   .clone()/** optional parameter: includeEvents **/

   .appendTo('#account_modal .account-login .phone-code-login')



/** Initializing the functionality of the account modal **/
$('#account_modal')

  .modal({

    closable: false,

    autofocus: false,

    transition: 'fade',

    duration: 100,

    context: 'body',

    /** BLurring with true will make elements with fixed position disappear **/
    blurring: false,

    observeChanges: true

  })

  .modal('attach events', '#account_modal .close_button', 'hide')



/** Switching between the password login and phone code login tabs  **/
$('.tabs-control .password-login-title')

  .on('click', function() {

    $.tab('change tab', 'password-login-tab')

    /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/
    $('#account_modal .account-login .password-login-title').removeClass('not-active-tab-title')

    $('#account_modal .account-login .phone-code-login-title').addClass('not-active-tab-title')

  })



/** Switching between the password login and phone code login tabs  **/
$('.tabs-control .phone-code-login-title')

  .on('click', function() {

    $.tab('change tab', 'phone-code-login-tab')

    /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/
    $('#account_modal .account-login .phone-code-login-title').removeClass('not-active-tab-title')

    $('#account_modal .account-login .password-login-title').addClass('not-active-tab-title')

  })



/** Swiching account register and account login modal **/
function moveAccountModal(disToMove) {

    $('#account_modal .account-login').css({

      'transform': `translateX(${disToMove})`,

      'transition': 'all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s'

    })

    $('#account_modal .account-register').css({

      'transform': `translateX(${disToMove})`,

      'transition': 'all 0.3s cubic-bezier(0, 0, 0.2, 1) 0s'

    })

    $('#account_modal').modal('show')

}


/** Swiching to account login from  account register modal **/
$('#main_sidebar .register.button, #header .register.button, #account_modal .account-login .switch-register')

  .click(function(event) {

    moveAccountModal('-100%')

})


/** Swiching to account register from  account login modal **/
$('#main_sidebar .login.button, #header .login.button, #account_modal .account-register .switch-login')

  .click(function(event) {

    moveAccountModal('0')

})




/*****************************************************************************************************************************

                                  AJAX Login

******************************************************************************************************************************/

$('#account_modal .login-register-box .password-login .content .error-box').css('display', 'none')

let postUrl = $('#account_modal .login-register-box .password-login .form-box .ui.form').attr("action")

let isProcessing = false

function error_box_toggler(benifits_bar_style, error_box_style, form_box_style){

  $('#account_modal .login-register-box .password-login .benifits_bar').css('display', benifits_bar_style)

  $('#account_modal .login-register-box .password-login .error-box').css('display', error_box_style)

  $('#account_modal .login-register-box .password-login .form-box').css('margin-top', form_box_style)


}

function createErrorItems(errors, itemElement, container){

  $(container).empty()

  $.each(errors, function(index, el) {

    let item = document.createElement(itemElement)

    item.innerHTML=el[0]

    $(container)[0].appendChild(item)

  })

}

function showErrorMessages(errorsBag){

  error_box_toggler('none', 'block', '1rem')

  createErrorItems(errorsBag, 'li', '#account_modal .login-register-box .password-login .error-box .list')

}

function closeErrorBox(){

  error_box_toggler('flex', 'none', '2.5rem')

}

function isPassedLocalValidation(){

  let errorsBag = []

  let emailErrors = []

  let passwordErrors = []

  if (!isEmpty($('input[name=email_name]').val())) {

    emailErrors.push('请输入邮箱账号。')

  }

  if (!isValidEmailFormat($('input[name=email_name]').val())) {

    emailErrors.push('请输入正确的邮箱账号。')

  }

  if (!isEmpty($('input[name=password]').val())) {

    passwordErrors.push('请输入密码。')

  }

  if (emailErrors.length > 0) {

    errorsBag.push(emailErrors)

  }

  if (passwordErrors.length > 0) {

    errorsBag.push(passwordErrors)

  }

  if (errorsBag.length > 0) {

    showErrorMessages(errorsBag)

    return false

  }

  return true

}

$('#account_modal .login-register-box .password-login .form-box').submit((event) => {

  //阻止默认提交表单
  event.preventDefault()

  //是否通过本地验证
  if (isPassedLocalValidation()) {

    //远程获取结果
    if (!isProcessing) {

      isProcessing = true

      $('#account_modal .login-register-box .password-login .form-box .button').text('正在登录...')

      axios.post(postUrl,

        {

          email:    $('input[name=email_name]').val(),

          password: $('input[name=password]').val(),

          _token:   $('input[name=_token]').val()

        },
        {

          timeout: 8000

        }
      )

      .then(function (response) {

        if (!response.data.success) {

          showErrorMessages(response.data.errors)

          $('#account_modal .login-register-box .password-login .form-box .button').text('登录')

          isProcessing = false

        }

        else {

          closeErrorBox()

          window.location.reload()

        }

      })

      .catch( (error) => {

        let errorsBag = []

        let globalErrors = []

        if (error.response) {

          // The request was made and the server responded with a status code
          globalErrors.push(`服务器返回 ${error.response.status} 错误，请稍后再试。`)

        }

        else if (error.request) {

          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          globalErrors.push('网络连接错误，请稍后再试。')

        }

        else {

          // Something happened in setting up the request that triggered an Error
          globalErrors.push('在发起请求时出现错误。')

        }

        errorsBag.push(globalErrors)

        showErrorMessages(errorsBag)

        $('#account_modal .login-register-box .password-login .form-box .button').text('登录')

        isProcessing = false

      })

    }

  }

})

$('#account_modal .login-register-box .password-login .error-box .message .close').on('click', function() {

  closeErrorBox()

})
