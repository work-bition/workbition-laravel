
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/


import { validateFormLocally } from './formValidation'

import { isIE11 } from './detectBrowsers'

import axios from 'axios'

window.isIE11 = isIE11

window.axios = axios

window.getVerificationCode = getVerificationCode

window.showErrorBox = showErrorBox



/**********************************************************************

                        header - account modal

**********************************************************************/



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
$('#account_modal .tabs-control .password-login-title')

  .on('click', function() {

    $.tab('change tab', 'password-login-tab')

    /** When switching the tab, changing the style of two tab titles by adding and removing CSS class   **/
    $('#account_modal .account-login .password-login-title').removeClass('not-active-tab-title')

    $('#account_modal .account-login .phone-code-login-title').addClass('not-active-tab-title')

  })



/** Switching between the password login and phone code login tabs  **/
$('#account_modal .tabs-control .phone-code-login-title')

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

let remoteProcessingFlag = false

function startRemoteProcessingLock() {

  if (!remoteProcessingFlag) {

    remoteProcessingFlag = true

    return true

  }

  return false

}

function stopRemoteProcessingLock() {

  if (remoteProcessingFlag) {

    remoteProcessingFlag = false

  }

}


function error_box_toggler(formName, benifits_bar_style, error_box_style){

  $(`#account_modal .login-register-box ${formName} .benifits_bar`).css('display', benifits_bar_style)

  $(`#account_modal .login-register-box ${formName} .error-box`).css('display', error_box_style)

}

function createErrorItems(errors, itemElement, container){

  $(container).empty()

  $.each(errors, function(index, el) {

    let item = document.createElement(itemElement)

    item.innerHTML=el[0]

    $(container)[0].appendChild(item)

  })

}

function showingErrorBox(tabName, errorsBag){

  error_box_toggler(tabName, 'none', 'block')

  createErrorItems(errorsBag, 'li', `#account_modal .login-register-box ${tabName} .error-box .list`)

}

function closingErrorBox(tabName){

  error_box_toggler(tabName, 'flex', 'none')

}

function adjustFormBoxTopMargin (formName, marginDistance){

  $(`#account_modal .login-register-box ${formName} .form-box`).css('margin-top', marginDistance)

}

/*************************************************************

                  OPTIONS EXAMPLE

**************************************************************

{

  tabName: '.password-login',

  errorsBag[optional]: errorsBag,

  formBox: {

    marginTopDistance: '1.5rem'

  }

}

**************************************************************/

function showErrorBox (options){

  showingErrorBox(options.tabName, options.errorsBag)

  adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance)

}

function closeErrorBox (options){

  closingErrorBox(options.tabName)

  adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance)

}

function changeSubmitButtonText(tabName, text){

  $(`#account_modal .login-register-box ${tabName} .form-box .button`).text(text)

}

function getFilledNetworkErrorsBag(error){

  let errorsBag = []

  let globalErrors = []

  if (error.response) {

    // The request was made and the server responded with a status code
    globalErrors.push(`服务器返回 ${error.response.status} 错误，请稍后再试`)

  }

  else if (error.request) {

    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    globalErrors.push('网络连接错误，请稍后再试')

  }

  else {

    // Something happened in setting up the request that triggered an Error
    globalErrors.push('在发起请求时出现错误，请稍后再试')

  }

  errorsBag.push(globalErrors)

  return errorsBag

}

function getPostUrl(formName){

  return $(`#account_modal .login-register-box ${formName} .form-box .ui.form`).attr("action")

}

/*************************************************************

                  OPTIONS EXAMPLE

**************************************************************

{

  postUrl: getPostUrl('.account-register'),

  targetForm: $('#account_modal .account-login .password-login'),

  postFields: {

    phone:  {

      type: 'element',

      literalValue: 'input[name=phone]'

    },

    captcha_token: {

      type: 'parameter',

      literalValue:  captcha_token

    },

    captcha_authenticate: {

      type: 'parameter',

      literalValue:  captcha_authenticate

    },

  },

  postTimeout: 8000

  callbacks: {

    failed: (error) => {},

    succeeded: (response) =>{}

  }

}

**************************************************************/

function sendPostRequest(post_options){

  let computed_field_value = {}

  if (startRemoteProcessingLock()) {

    $.each(post_options.postFields, function(key, field) {

      let field_input_value

      if (field.type == 'element') {

        field_input_value = post_options.targetForm.find(field.literalValue).val()

      }

      else if (field.type == 'parameter') {

        field_input_value = field.literalValue

      }

      computed_field_value[key] = field_input_value

    })

    axios.post(post_options.postUrl, computed_field_value,

    {

      timeout: post_options.postTimeout

    })

    .then((response) => {

      post_options.callbacks.succeeded(response)

      stopRemoteProcessingLock()

    })

    .catch((error) => {

      post_options.callbacks.failed(error)

      stopRemoteProcessingLock()

    })

  }

}

function getVerificationCode(captcha_token, captcha_authenticate){

  sendPostRequest({

    postUrl: getPostUrl('.account-register'),

    targetForm: $('#account_modal .account-register'),

    postFields: {

      phone: {

        type: 'element',

        literalValue: 'input[name=phone]'

      },

      captcha_token: {

        type: 'parameter',

        literalValue: captcha_token

      },

      captcha_authenticate: {

        type: 'parameter',

        literalValue: captcha_authenticate

      }

    },

    postTimeout: 8000,

    callbacks: {

      failed: (error) => {

        let errorsBag = getFilledNetworkErrorsBag(error)

        showErrorBox({

          tabName: '.account-register',

          errorsBag: errorsBag,

          formBox: {

            marginTopDistance: '0'

          }

        })

      },

      succeeded: (response) => {

        if (response.data.success) {

          console.log(response.data)

          //window.location.href = location.href

        }

        else {

          showErrorBox({

            tabName: '.account-register',

            errorsBag: response.data.errors,

            formBox: {

              marginTopDistance: '0'

            }

          })

        }

      }

    }

  })

}

$('#account_modal .password-login .form-box').submit((event) => {

  //stop the form from submitting
  event.preventDefault()

  validateFormLocally({

    targetForm: $('#account_modal .account-login .password-login'),

    fields: {

      emailField : {

        element: 'input[name=email_name]',

        rules: [

          'required',

          //javascript中'\'字符需要被转义，regexp类会自动在正则表达式的开头和末尾加上'/'
          'regex:' + /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.toString()

        ],

        errorMessages : {

          required : '请输入电子邮箱',

          regex : '请输入正确的电子邮箱'

        }

      },

      passwordField : {

        element: 'input[name=password]',

        rules: [

          'required',

          'between:6,16'

        ],

        errorMessages : {

          required : '请输入密码',

          between : '请确保密码的长度在8-16位之间'

        }

      }

    },

    callbacks: {

      failed : (errorsBag) => {

        showErrorBox({

          tabName: '.password-login',

          errorsBag: errorsBag,

          formBox: {

            marginTopDistance: '1rem'

          }

        })

      },

      succeeded:  () => {

        //start the remote processing lock, preventing over-executing the codes before the remote returns the result
        //Only when remote processing flag is true, the codes inside will be executed

        closeErrorBox({

          tabName: '.password-login',

          formBox: {

            marginTopDistance: '2.5rem'

          }

        })

        changeSubmitButtonText('.password-login', '登录中...')

        sendPostRequest({

          postUrl: getPostUrl('.password-login'),

          targetForm: $('#account_modal .account-login .password-login'),

          postFields: {

            email: {

              type: 'element',

              literalValue: 'input[name=email_name]'

            },

            password: {

              type: 'element',

              literalValue: 'input[name=password]'

            },

            _token: {

              type: 'element',

              literalValue: 'input[name=_token]'

            }

          },

          postTimeout: 8000,

          callbacks: {

            failed: (error) => {

              let errorsBag = getFilledNetworkErrorsBag(error)

              showErrorBox({

                tabName: '.password-login',

                errorsBag: errorsBag,

                formBox: {

                  marginTopDistance: '1rem'

                }

              })

              changeSubmitButtonText('.password-login', '登录')

            },

            succeeded: (response) => {

              if (response.data.success) {

                location.reload()

                setTimeout(

                  () => {

                  alert('reload')

                  location.reload()

                  //showingErrorBox('.password-login', [['登录卡住了？请刷新此页面。']])

                  },

                  4000

                )

              }

              else {

                showErrorBox({

                  tabName: '.password-login',

                  errorsBag: response.data.errors,

                  formBox: {

                    marginTopDistance: '1rem'

                  }

                })

                changeSubmitButtonText('.password-login', '登录')

              }

            }

          }

        })

      }

    }

  })

})

$('#account_modal .login-register-box .content .get-phone-code a').click((event) => {

  validateFormLocally({

    targetForm: $('#account_modal .account-register'),

    fields: {

      phoneField : {

        element: 'input[name=phone]',

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

    },

    callbacks: {

      failed : (errorsBag) => {

        showErrorBox({

          tabName: '.account-register',

          errorsBag: errorsBag,

          formBox: {

            marginTopDistance: '0'

          }

        })

      },

      succeeded:  () => {

        closeErrorBox({

          tabName: '.account-register',

          formBox: {

            marginTopDistance: '1.5rem'

          }

        })

        //if there's no network conection, then cannot initialize the yunpianCaptcha, then no children elements for #register-yunpian-captcha element, then
        //don't show the .yunpian-captcha element
        if ($('#register-yunpian-captcha').children().length > 0) {

          //显示云片验证码提示框
          $('#account_modal .login-register-box .content .yunpian-captcha').css({'order': '0', 'visibility': 'visible'})

        }

      }

    }

  })

})

//click event for close button on ErrorBox on PasswordLoginTab
$('#account_modal .password-login .error-box .message .close').on('click', function(){

  closeErrorBox({

    tabName: '.password-login',

    formBox: {

      marginTopDistance: '2.5rem'

    }

  })

})

//click event for close button on ErrorBox on AccountRegisterTab
$('#account_modal .account-register .error-box .message .close').on('click', function() {

  closeErrorBox({

    tabName: '.account-register',

    formBox: {

      marginTopDistance: '1.5rem'

    }

  })

})
