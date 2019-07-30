
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/


import { isEmpty, isValidEmailFormat, isFailedRegexTest, isBeyondLengthRange, getFormValidationErrorsBag } from './formValidation'

import { isIE11 } from './detectBrowsers'

import axios from 'axios'

window.isIE11 = isIE11

window.axios = axios



/**
* header - account modal
**/



/** Clone Some Html Codes for Reducing the Page Size **/
/** Cloning the benifits bar, third login and register link section into account login and account register section where necessary **/
$('#account_modal .account-register .content .benifits_bar')

   .clone()/** optional parameter: includeEvents **/

   .prependTo('#account_modal .account-login .password-login .content, #account_modal .account-login .phone-code-login .content')

$('#account_modal .account-login .password-login .register-link')

  .clone()/** optional parameter: includeEvents **/

  .appendTo('#account_modal .account-login .phone-code-login .content')

$('#account_modal .account-register .content .third-login')

   .clone()/** optional parameter: includeEvents **/

   .insertBefore('#account_modal .account-login .password-login .content .register-link, #account_modal .account-login .phone-code-login .content .register-link')



/** Initializing the functionality of the account modal **/
$('#account_modal')

  .modal({

    closable: false,

    autofocus: false,

    transition: 'fade',

    duration: 100,

    context: 'body',

    /** BLurring with true will make elements with fixed position disappear **/
    blurring: false

    /** this option will make the page stop to scroll when open it and the scrollbar is at the top in iOS Browsers  **/
    //observeChanges: true

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

                                  AJAX Login and Register

******************************************************************************************************************************/

let isProcessing = false

function error_box_toggler(formName, benifits_bar_style, error_box_style, form_box_style){

  $(`#account_modal .login-register-box ${formName} .benifits_bar`).css('display', benifits_bar_style)

  $(`#account_modal .login-register-box ${formName} .error-box`).css('display', error_box_style)

  $(`#account_modal .login-register-box ${formName} .form-box`).css('margin-top', form_box_style)


}

function createErrorItems(errors, itemElement, container){

  $(container).empty()

  $.each(errors, function(index, el) {

    let item = document.createElement(itemElement)

    item.innerHTML=el[0]

    $(container)[0].appendChild(item)

  })

}

function showErrorMessages(formName, errorsBag){

  error_box_toggler(formName, 'none', 'block', '1rem')

  createErrorItems(errorsBag, 'li', `#account_modal .login-register-box ${formName} .error-box .list`)

}

function closeErrorBox(formName){

  error_box_toggler(formName, 'flex', 'none', '2.5rem')

}

function getPostUrl(formName){

  return $(`#account_modal .login-register-box ${formName} .form-box .ui.form`).attr("action")

}

function getVerificationCode(captcha_token, captcha_authenticate){

  axios.post(getPostUrl('.account-register'),

  {

    phone:                      $('#account_modal .login-register-box .account-register input[name=phone]').val(),

    captcha_token:              captcha_token,

    captcha_authenticate:       captcha_authenticate

  },
  {

    timeout: 8000

  })

  .then(function (response) {

    if (!response.data.success) {

      showErrorMessages('.account-register', response.data.errors)

      isProcessing = false

    }

    else {

      console.log(response.data)

      //window.location.href = location.href

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

    showErrorMessages('.account-register', errorsBag)

    $('#account_modal .login-register-box .password-login .form-box .button').text('登录')

    isProcessing = false

  })

}

window.getVerificationCode = getVerificationCode

$('#account_modal .login-register-box .password-login .form-box').submit((event) => {

  //阻止默认提交表单
  event.preventDefault()

  let emailField = {

    element: $('#account_modal .account-login .password-login input[name=email_name]'),

    rules: [

      'required',

      //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
      'regex:' + /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.toString()

    ],

    errorMessages : {

      required : '请输入电子邮箱',

      regex : '请输入正确的电子邮箱'

    }

  }

  let passwordField = {

    element: $('#account_modal .account-login .password-login input[name=password]'),

    rules: [

      'required',

      'between:6,16'

    ],

    errorMessages : {

      required : '请输入密码',

      between : '请确保密码的长度在8-16位之间'

    }

  }

  let errorsBag = getFormValidationErrorsBag(emailField, passwordField)

  if (errorsBag) {

    showErrorMessages('.password-login', errorsBag)

  }

  else {

    //远程获取结果
    if (!isProcessing) {

      isProcessing = true

      closeErrorBox('.password-login')

      //$('#account_modal .login-register-box .password-login .form-box .button').addClass('loading')

      $('#account_modal .login-register-box .password-login .form-box .button').text('登录中...')

      axios.post(getPostUrl('.password-login'),

      {

        email:    $('input[name=email_name]').val(),

        password: $('input[name=password]').val(),

        _token:   $('input[name=_token]').val()

      },
      {

        timeout: 8000

      })

      .then(function (response) {

        if (response.data.success) {

          //window.location.href = location.href

          location.reload()

          setTimeout(() => {

            alert('reload')

            location.reload()

            //showErrorMessages('.password-login', [['登录卡住了？请刷新此页面。']])

          },  4000)

        }

        else {

          showErrorMessages('.password-login', response.data.errors)

          $('#account_modal .login-register-box .password-login .form-box .button').text('登录')

          isProcessing = false

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

        showErrorMessages('.password-login', errorsBag)

        $('#account_modal .login-register-box .password-login .form-box .button').text('登录')

        isProcessing = false

      })

    }

  }

})

$('#account_modal .login-register-box .password-login .error-box .message .close').on('click', function() {

  closeErrorBox('.password-login')

})

$('#account_modal .login-register-box .content .get-phone-code a').click((event) => {

  closeErrorBox('.account-register')

  let phoneField = {

    element: $('#account_modal .account-register input[name=phone]'),

    rules: [

      'required',

      //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
      'regex:' + /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/.toString()

    ],

    errorMessages : {

      required : '请输入手机号码',

      regex : '请输入正确的手机号码'

    }

  }

  let passwordField = {

    element: $('#account_modal .account-register input[name=password]'),

    rules: [

      'required',

      'between:6,16'

    ],

    errorMessages : {

      required : '请输入密码',

      between : '请确保密码的长度在8-16位之间'

    }

  }

  let errorsBag = getFormValidationErrorsBag(phoneField, passwordField)

  if (errorsBag) {

    showErrorMessages('.account-register', errorsBag)

  }

  else {

    //显示云片验证码提示框
    $('#account_modal .login-register-box .content .yunpian-captcha').css({'order': '0', 'visibility': 'visible'})

  }

})

$('#account_modal .login-register-box .account-register .error-box .message .close').on('click', function() {

  closeErrorBox('.account-register')

})
