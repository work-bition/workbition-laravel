
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

import { validateForm } from './formValidation'

import { isiOS, isSafari, isIE11 } from './detectBrowsers'

import axios from 'axios'

/*****************************************************************************************************************************

                        header - account modal

*****************************************************************************************************************************/



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

let maintainingFlags = {

  remoteProcessingFlag : false,

  YpCaptchaProcessingFlag : false

}

let maintainingObjects = {

  YpCaptchaInstance : undefined,

  puzzleShowUpWatcher : undefined

}

/*************************************************************

             startProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  maintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  }

}

**************************************************************/

function startProcessingLock(lock_options) {

  if (!lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName]) {

    lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = true

    return true

  }

  return false

}

function stopProcessingLock(lock_options) {

  if (lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName]) {

    lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = false

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

        showErrorBox and closeErrorBox OPTIONS EXAMPLE

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

function changeYpCaptchaButtonText(tabName, text){

  $(`#account_modal .login-register-box ${tabName} .form-box .yunpian-captcha .yp-riddler-button .yp-riddler-button_text`).text(text)

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

            sendPostRequest OPTIONS EXAMPLE

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

  //prevent multiple remote requests before get the result
  if (startProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:maintainingFlags,

        flagName: 'remoteProcessingFlag'

      }

    })) {

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

      stopProcessingLock({

        maintainingFlagsInfo: {

          flagsContainer:maintainingFlags,

          flagName: 'remoteProcessingFlag'

        }

      })

    })

    .catch((error) => {

      post_options.callbacks.failed(error)

      stopProcessingLock({

        maintainingFlagsInfo: {

          flagsContainer:maintainingFlags,

          flagName: 'remoteProcessingFlag'

        }

      })

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

             console.log(response.data.code)

           }

         }

       }

     })

}

function initializingYpCaptcha(captcha_mode) {

  if (YpRiddler != undefined) {

    // 初始化云片图片验证码
    let YpCaptcha =  new YpRiddler({

          //过期时间不宜设置过短，不然容易引发异常，单位：秒
          expired: 2,

          mode: captcha_mode,

          winWidth: 334,

          noButton: false,

          lang: 'zh-cn', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
          // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang

          langPack: {

            'YPcaptcha_01': '请点击按钮开始验证',

            'YPcaptcha_02': '请按顺序点击:',

            'YPcaptcha_03': '向右拖动滑块填充拼图',

            'YPcaptcha_04': '验证失败，请重试',

            'YPcaptcha_05': '验证成功'
          },

          container: document.getElementById('register-yunpian-captcha'),

          appId: '2d797943d96348c8922e375c7c4fbdaa',

          version: 'v1',

          //when the user clicks on the YpCaptcha button
          beforeStart: function (next) {

              //Prevent multiple requests before get the result
              if (startProcessingLock({

                maintainingFlagsInfo: {

                  flagsContainer:maintainingFlags,

                  flagName: 'YpCaptchaProcessingFlag'

                }

              })) {

                closeErrorBox({

                  tabName: '.account-register',

                  formBox: {

                    marginTopDistance: '1.5rem'

                  }

                })

                changeYpCaptchaButtonText('.account-register', '正在获取拼图...')

                startRepeater({

                  maintainingObjectsInfo: {

                    objectsContainer:maintainingObjects,

                    objectName: 'puzzleShowUpWatcher'

                  },

                  intervalCallback: () => {

                      //make sure only when the puzzle shows up, the text can be changed
                      if($('#register-yunpian-captcha .yp-riddler-win-masker').css('display')=='block' && $('#register-yunpian-captcha .yp-riddler-win-masker').children().length > 0){

                        changeYpCaptchaButtonText('.account-register', '请完成拼图')

                        console.log('hello')

                      }

                  },

                  frequency: 100

                })

                //prevent frequent requests in a very short period by the users
                extendHandleTime({

                  extendTime: 1000,

                  extendCallback: () => {

                    next()

                  }

                })

              }

          },

          //when the user clicks on the other areas on the register tab, which makes the puzzle disappear, it's only in effect when the mode is set to 'dialog'
          onExit: function () {

              changeYpCaptchaButtonText('.account-register', '请点击按钮开始验证')

              clearRepeater({

                maintainingObjectsInfo: {

                  objectsContainer:maintainingObjects,

                  objectName: 'puzzleShowUpWatcher'

                }

              })

              stopProcessingLock({

                maintainingFlagsInfo: {

                  flagsContainer:maintainingFlags,

                  flagName: 'YpCaptchaProcessingFlag'

                }

              })

          },

          //when the user successfully finishes the puzzle
          onSuccess: function (validInfo, close, useDefaultSuccess) {

              getVerificationCode(validInfo.token, validInfo.authenticate)

              useDefaultSuccess(true)

              close()

              releaseYpCaptcha()

              clearRepeater({

                maintainingObjectsInfo: {

                  objectsContainer:maintainingObjects,

                  objectName: 'puzzleShowUpWatcher'

                }

              })

              stopProcessingLock({

                maintainingFlagsInfo: {

                  flagsContainer:maintainingFlags,

                  flagName: 'YpCaptchaProcessingFlag'

                }

              })

          },

          onFail: function (code, message, retry) {

              retry()

              stopProcessingLock({

                maintainingFlagsInfo: {

                  flagsContainer:maintainingFlags,

                  flagName: 'YpCaptchaProcessingFlag'

                }

              })

          },

          onError: function (param) {

            changeYpCaptchaButtonText('.account-register', '请点击按钮开始验证')

            if (param.code == 429) {

                showErrorBox({

                  tabName: '.account-register',

                  errorsBag: [['请求过于频繁，请稍后再试']],

                  formBox: {

                    marginTopDistance: '0'

                  }

                })

                clearRepeater({

                  maintainingObjectsInfo: {

                    objectsContainer:maintainingObjects,

                    objectName: 'puzzleShowUpWatcher'

                  }

                })

                stopProcessingLock({

                  maintainingFlagsInfo: {

                    flagsContainer:maintainingFlags,

                    flagName: 'YpCaptchaProcessingFlag'

                  }

                })

                return

            }

            showErrorBox({

              tabName: '.account-register',

              errorsBag: [['验证服务异常，请稍后再试']],

              formBox: {

                marginTopDistance: '0'

              }

            })

            clearRepeater({

              maintainingObjectsInfo: {

                objectsContainer:maintainingObjects,

                objectName: 'puzzleShowUpWatcher'

              }

            })

            stopProcessingLock({

              maintainingFlagsInfo: {

                flagsContainer:maintainingFlags,

                flagName: 'YpCaptchaProcessingFlag'

              }

            })

          }

      })

    return YpCaptcha

  }

  else {

    return undefined

  }

}

function extendHandleTime(extend_options){

  setTimeout(extend_options.extendCallback, extend_options.extendTime)

}

/*************************************************************

       assignValueToMaintainingObjects OPTIONS EXAMPLE

**************************************************************

{

  maintainingObjectsInfo: {

    objectsContainer: maintainingObjects,

    objectName: 'YpCaptchaInstance'

  },

  assginValueFunc: () => {

    return instantiateYpCaptcha('dialog')

  }

}

**************************************************************/

function assignValueToMaintainingObjects(assign_options){

    assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] = assign_options.assginValueFunc()

}

/* only when the value of the object is undefined, this function can assign value to this object */
function assignValueToMaintainingObjectsOnce(assign_options){

  if (assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] == undefined) {

    assign_options.maintainingObjectsInfo.objectsContainer[assign_options.maintainingObjectsInfo.objectName] = assign_options.assginValueFunc()

  }

}

function unsetMaintainingObjects(unset_options){

  if (unset_options.maintainingObjectsInfo.objectsContainer[unset_options.maintainingObjectsInfo.objectName] != undefined) {

    unset_options.maintainingObjectsInfo.objectsContainer[unset_options.maintainingObjectsInfo.objectName] = undefined

  }

}

/*************************************************************

                 startRepeater OPTIONS EXAMPLE

**************************************************************

{

  maintainingObjectsInfo: {

    objectsContainer:maintainingObjects,

    objectName: 'puzzleShowUpWatcher'

  },

  intervalCallback: () => {},

  frequency: 100

}

**************************************************************/

function startRepeater(repeat_options) {

  assignValueToMaintainingObjects({

    maintainingObjectsInfo: repeat_options.maintainingObjectsInfo,

    assginValueFunc: () => {

      return setInterval(

        repeat_options.intervalCallback,

        repeat_options.frequency

      )

    }

  })

}

function clearRepeater(repeat_options) {

  clearInterval(repeat_options.maintainingObjectsInfo.objectsContainer[repeat_options.maintainingObjectsInfo.objectName])

}

function instantiateYpCaptcha(){

  assignValueToMaintainingObjectsOnce({

    maintainingObjectsInfo: {

      objectsContainer: maintainingObjects,

      objectName: 'YpCaptchaInstance'

    },

    assginValueFunc: () => {

      return initializingYpCaptcha('dialog')

    }

  })

}

function releaseYpCaptcha(){

  unsetMaintainingObjects({

    maintainingObjectsInfo: {

      objectsContainer: maintainingObjects,

      objectName: 'YpCaptchaInstance'

    }

  })

}

function disableActionsOnAccountModal() {

  $('#account_modal').css('pointer-events', 'none')

}



//submit event for the form on PasswordLoginTab
$('#account_modal .account-login .password.login.form').submit((event) => {

  //stop the form from submitting
  event.preventDefault()

  validateForm({

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

                disableActionsOnAccountModal()

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

//submit event for the form on AccountRegisterTab
$('#account_modal .account-register .register.form').submit((event) => {

  //stop the form from submitting
  event.preventDefault()

  validateForm({

    targetForm: $('#account_modal .account-register'),

    fields: {

      phoneField: {

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

      },

      passwordField: {

        element: 'input[name=password]',

        rules: [

          'required',

          'between:6,16'

        ],

        errorMessages : {

          required : '请输入密码',

          between : '请确保密码的长度在8-16位之间'

        }

      },

      phoneCodeField: {

        element: 'input[name=phoneCode]',

        rules: [

          'required',

          'digits:4'

        ],

        errorMessages : {

          required: '请输入手机验证码',

          digits: '请输入4位数字的手机验证码'

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

        //there's no enough room for the 3rd message in the error box, so when there are 3 messages needed to show, we have to make the 3rd one disappear,
        // the error box can show two messages to the maximum
        if ($('#account_modal .account-register .content .error-box .error.message .list').children('li').length == 3) {

          //兼容IE11，IE11不兼容js的remove方法，但是可以使用JQuery的remove方法
          $('#account_modal .account-register .content .error-box .error.message .list').children('li:nth-child(3)').remove()

          //$('#account_modal .account-register .content .error-box .error.message .list').children()[2].remove()

        }

      },

      succeeded:  () => {

        //start the remote processing lock, preventing over-executing the codes before the remote returns the result
        //Only when remote processing flag is true, the codes inside will be executed

        closeErrorBox({

          tabName: '.account-register',

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



//click event for the ‘get phone code’ button on AccountRegisterTab
$('#account_modal .account-register .get-phone-code .link').click((event) => {

  validateForm({

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

      succeeded: () => {

        closeErrorBox({

          tabName: '.account-register',

          formBox: {

            marginTopDistance: '1.5rem'

          }

        })

        instantiateYpCaptcha()

        //显示云片验证码提示框
        $('#account_modal .login-register-box .content .yunpian-captcha').css({'order': '0', 'visibility': 'visible'})

        //except for 'glow' option, other options will cause svg icons move while animation effects are on progress in Safari on Mac computer or in the browsers on iOS devices
        let transitionMode

        if (isiOS || isSafari) {

          transitionMode = 'glow'

        }

        else {

          transitionMode = 'flash'

        }

        //adding animation effects
        $('#register-yunpian-captcha .yp-riddler .yp-riddler-button_text')

        .transition({

          animation  : transitionMode,

          duration   : '0.5s',

          onStart : () => {

            //CSS3 pointer-events does not work on links in IE11 and Edge 17 and below
            //unless display is set to block or inline-block, or position is set to absolute or fixed.
            $(event.currentTarget).css('pointer-events', 'none')

          },

          onComplete : () => {

            //CSS3 pointer-events does not work on links in IE11 and Edge 17 and below
            //unless display is set to block or inline-block, or position is set to absolute or fixed.
            $(event.currentTarget).css('pointer-events', 'all')

          }

        })

      }

    }

  })

})



//click event for close button on ErrorBox on PasswordLoginTab
$('#account_modal .password-login .error-box .message .close').click((event) => {

  closeErrorBox({

    tabName: '.password-login',

    formBox: {

      marginTopDistance: '2.5rem'

    }

  })

})

//click event for close button on ErrorBox on AccountRegisterTab
$('#account_modal .account-register .error-box .message .close').click((event) => {

  closeErrorBox({

    tabName: '.account-register',

    formBox: {

      marginTopDistance: '1.5rem'

    }

  })

})
