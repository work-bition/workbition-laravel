
/*****************************************************************************************************************************

                                                        Header

******************************************************************************************************************************/

import { validateForm } from './formValidation'

import { isiOS, isSafari, isIE11 } from './detectBrowsers'

import { fadeIn, fadeOut, enableFlashEffect } from './effects'

import { startProcessingLock, startDoubleProcessingLock, stopProcessingLock, sendPostRequest,

         getNetworkRelatedErrorsBag, suspendCurrentProcess, assignValueToMaintainingObjects,

         assignValueToMaintainingObjectsOnce, unsetMaintainingObjects, startRepeater,

         clearRepeater, wait } from './network'

/*****************************************************************************************************************************

                                            Initializing Account Modal

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

  remoteProcessingFlag : false

}

let YpCaptchaMaintainingFlags = {

  YpCaptchaProcessingFlag : false,

  YpCaptchaButtonShowingFlag : false,

  YpCaptchaButtonShownFlag : false,

  YpCaptchaButtonTextFlashingFlag: false,

  YpCaptchaSuccessButtonShownFlag: false,

  YpCaptchaRefreshButtonInitializedFlag: false,

  YpCaptchaRefreshButtonRefreshTimes: 0

}

let errorBoxMaintainingFlags = {

  registerAccountTabErrorBoxShowingFlag : false,

  passwordLoginTabErrorBoxShowingFlag : false,

  phoneCodeLoginTabErrorBoxShowingFlag : false

}

let maintainingObjects = {

  YpCaptchaInstance : undefined,

  puzzleShowUpWatcher : undefined

}

let YpCaptchaInitializingOptions = {

      //过期时间不宜设置过短，不然容易引发异常，单位：秒
      expired: 5,

      mode: 'dialog',

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

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaProcessingFlag'

            }

          })) {

            changeYpCaptchaButtonText('.account-register', '正在获取拼图...')

            //watch the YpCaptcha puzzle shows up
            startRepeater({

              maintainingObjectsInfo: {

                objectsContainer:maintainingObjects,

                objectName: 'puzzleShowUpWatcher'

              },

              intervalCallback: () => {

                  //observe the puzzle shows up
                  //only when the puzzle dialog shows up can error box be closed, YpCaptcha button text be changed
                  //and YpCaptcha refresh button operations be done
                  if(isYpCaptchaPuzzleDialogShown()){

                    closeErrorBox({

                      tabName: '.account-register',

                      formBox: {

                        marginTopDistance: '1.5rem'

                      }

                    })

                    changeYpCaptchaButtonText('.account-register', '请完成拼图')

                    initializeYpCaptchaRefreshButton()

                  }

              },

              frequency: 100

            })

            //prevent frequent requests in a very short period by the users
            //makes the puzzle show up
            suspendCurrentProcess({

              suspendingTime: 1000,

              callbacks: {

                resumed: () => {

                    next()

                }

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

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaRefreshButtonInitializedFlag'

            }

          })

          stopProcessingLock({

            maintainingFlagsInfo: {

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaProcessingFlag'

            }

          })

      },

      //when the user successfully finishes the puzzle
      onSuccess: function (validInfo, close, useDefaultSuccess) {

          getVerificationCode(validInfo.token, validInfo.authenticate)

          useDefaultSuccess(true)

          close()

          //flagName: 'YpCaptchaSuccessButtonShownFlag'
          //hide YpCaptcha button
          if (startProcessingLock({

              maintainingFlagsInfo: {

                flagsContainer:YpCaptchaMaintainingFlags,

                flagName: 'YpCaptchaSuccessButtonShownFlag'

              }

            })) {

              hideYpCaptchaButton({

                YpCaptchaButtonID: '#register-yunpian-captcha',

                hidingTime: 600,

                hiddenCallback: () => {

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:YpCaptchaMaintainingFlags,

                      flagName: 'YpCaptchaSuccessButtonShownFlag'

                    }

                  })

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:YpCaptchaMaintainingFlags,

                      flagName: 'YpCaptchaButtonShownFlag'

                    }

                  })

                }

              })

          }

          releaseYpCaptcha()

          clearRepeater({

            maintainingObjectsInfo: {

              objectsContainer:maintainingObjects,

              objectName: 'puzzleShowUpWatcher'

            }

          })

          stopProcessingLock({

            maintainingFlagsInfo: {

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaRefreshButtonRefreshTimes'

            },

            setZero: true

          })

          stopProcessingLock({

            maintainingFlagsInfo: {

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaRefreshButtonInitializedFlag'

            }

          })

          stopProcessingLock({

            maintainingFlagsInfo: {

              flagsContainer:YpCaptchaMaintainingFlags,

              flagName: 'YpCaptchaProcessingFlag'

            }

          })

      },

      onFail: function (code, message, retry) {

          retry()

          stopProcessingLock({

            maintainingFlagsInfo: {

              flagsContainer:YpCaptchaMaintainingFlags,

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

                flagsContainer:YpCaptchaMaintainingFlags,

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

            flagsContainer:YpCaptchaMaintainingFlags,

            flagName: 'YpCaptchaProcessingFlag'

          }

        })

      }

  }

function createErrorItems(errors, itemElement, container){

  $(container).empty()

  $.each(errors, function(index, el) {

    let item = document.createElement(itemElement)

    item.innerHTML=el[0]

    $(container)[0].appendChild(item)

  })

}

function adjustFormBoxTopMargin (formName, marginDistance){

  $(`#account_modal .login-register-box ${formName} .form-box`).css('margin-top', marginDistance)

}

function getErrorBoxFlagName(tabName) {

  let flagName

  switch (tabName) {

    case '.password-login':

      flagName = 'passwordLoginTabErrorBoxShowingFlag'

      break;

    case '.phone-code-login':

      flagName = 'phoneCodeLoginTabErrorBoxShowingFlag'

      break;

    case '.account-register':

      flagName = 'registerAccountTabErrorBoxShowingFlag'

      break;

  }

  return flagName

}

/*************************************************************

              showErrorBox OPTIONS EXAMPLE

**************************************************************

{

  tabName: '.password-login',

  errorsBag[optional]: errorsBag,

  formBox: {

    marginTopDistance: '1.5rem'

  }

}

//errorsBag structure: [['First Field First Error'], ['Second Field First Error', 'Second Field Second Error(Not Show)']]

**************************************************************/

function showErrorBox (options){

  let flagName = getErrorBoxFlagName(options.tabName)

  if (startProcessingLock({

    maintainingFlagsInfo: {

      flagsContainer:errorBoxMaintainingFlags,

      flagName: flagName

    }

  })) {

    if ($(`#account_modal .login-register-box ${options.tabName} .error-box`).css('display') == 'block') {

      fadeOut({

        targetElement: $(`#account_modal .login-register-box ${options.tabName} .error-box`),

        effectDuration: 250,

        targetOriginalDisplayType: 'none',

        callbacks: {

          disappeared: () => {

            adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance)

            createErrorItems(options.errorsBag, 'li', `#account_modal .login-register-box ${options.tabName} .error-box .list`)

            //there's no enough room for the 3rd message in the error box, so when there are 3 messages needed to show, we have to make the 3rd one disappear,
            // the error box can show two messages to the maximum
            if ($('#account_modal .account-register .content .error-box .error.message .list').children('li').length == 3) {

              //兼容IE11，IE11不兼容js的remove方法，但是可以使用JQuery的remove方法
              $('#account_modal .account-register .content .error-box .error.message .list').children('li:nth-child(3)').remove()

              //$('#account_modal .account-register .content .error-box .error.message .list').children()[2].remove()

            }

            fadeIn({

              targetElement: $(`#account_modal .login-register-box ${options.tabName} .error-box`),

              effectDuration: 250,

              callbacks: {

                shown: () => {

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:errorBoxMaintainingFlags,

                      flagName: flagName

                    }

                  })

                }

              }

            })

          }

        }

      })

    }

    else {

      fadeOut({

        targetElement: $(`#account_modal .login-register-box ${options.tabName} .benifits_bar`),

        effectDuration: 250,

        targetOriginalDisplayType: 'none',

        callbacks: {

          disappeared: () => {

            adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance)

            createErrorItems(options.errorsBag, 'li', `#account_modal .login-register-box ${options.tabName} .error-box .list`)

            //there's no enough room for the 3rd message in the error box, so when there are 3 messages needed to show, we have to make the 3rd one disappear,
            // the error box can show two messages to the maximum
            if ($('#account_modal .account-register .content .error-box .error.message .list').children('li').length == 3) {

              //兼容IE11，IE11不兼容js的remove方法，但是可以使用JQuery的remove方法
              $('#account_modal .account-register .content .error-box .error.message .list').children('li:nth-child(3)').remove()

              //$('#account_modal .account-register .content .error-box .error.message .list').children()[2].remove()

            }

            fadeIn({

              targetElement: $(`#account_modal .login-register-box ${options.tabName} .error-box`),

              effectDuration: 250,

              callbacks: {

                shown: () => {

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:errorBoxMaintainingFlags,

                      flagName: flagName

                    }

                  })

                }

              }

            })

          }

        }

      })

    }

  }

}

/*************************************************************

              closeErrorBox OPTIONS EXAMPLE

**************************************************************

{

  tabName: '.password-login',

  formBox: {

    marginTopDistance: '1.5rem'

  },


  resolve[optional]: resolve

}

resolve is used with promise functionality

**************************************************************/

function closeErrorBox (options){

  let flagName = getErrorBoxFlagName(options.tabName)

  if (startProcessingLock({

    maintainingFlagsInfo: {

      flagsContainer:errorBoxMaintainingFlags,

      flagName: flagName

    }

  })) {

    if ($(`#account_modal .login-register-box ${options.tabName} .error-box`).css('display') != 'none') {

        fadeOut({

          targetElement: $(`#account_modal .login-register-box ${options.tabName} .error-box`),

          effectDuration: 250,

          targetOriginalDisplayType: 'none',

          callbacks: {

            disappeared: () => {

              adjustFormBoxTopMargin(options.tabName, options.formBox.marginTopDistance)

              fadeIn({

                targetElement: $(`#account_modal .login-register-box ${options.tabName} .benifits_bar`),

                effectDuration: 250,

                callbacks: {

                  shown: () => {

                    stopProcessingLock({

                      maintainingFlagsInfo: {

                        flagsContainer:errorBoxMaintainingFlags,

                        flagName: flagName

                      }

                    })

                    if (options.resolve) {

                      options.resolve()

                    }

                  }

                }

              })

            }

          }

        })
    }

    else {

      stopProcessingLock({

        maintainingFlagsInfo: {

          flagsContainer:errorBoxMaintainingFlags,

          flagName: flagName

        }

      })

      if (options.resolve) {

        options.resolve()

      }

    }

  }

}

function changeSubmitButtonText(tabName, text){

  $(`#account_modal .login-register-box ${tabName} .form-box .button`).text(text)

}

function disableAllActionsOnPage() {

  $('body').css('pointer-events', 'none')

}

function getPostUrl(formName){

  return $(`#account_modal .login-register-box ${formName} .form-box .ui.form`).attr("action")

}

function getVerificationCode(captcha_token, captcha_authenticate){

  if (startProcessingLock({

    maintainingFlagsInfo: {

      flagsContainer:maintainingFlags,

      flagName: 'remoteProcessingFlag'

    }

  })) {

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

             let errorsBag = getNetworkRelatedErrorsBag(error)

             showErrorBox({

               tabName: '.account-register',

               errorsBag: errorsBag,

               formBox: {

                 marginTopDistance: '0'

               }

             })

             stopProcessingLock({

               maintainingFlagsInfo: {

                 flagsContainer:maintainingFlags,

                 flagName: 'remoteProcessingFlag'

               }

             })

           },

           succeeded: (response) => {

             if (response.data.success) {

               console.log(response.data)

               //window.location.href = location.href

               stopProcessingLock({

                 maintainingFlagsInfo: {

                   flagsContainer:maintainingFlags,

                   flagName: 'remoteProcessingFlag'

                 }

               })

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

               stopProcessingLock({

                 maintainingFlagsInfo: {

                   flagsContainer:maintainingFlags,

                   flagName: 'remoteProcessingFlag'

                 }

               })

             }

           }

         }

       })

  }

}

function refreshPageUsingCurrentUrl() {

  location.reload()

  suspendCurrentProcess({

    suspendingTime: 4000,

    callbacks: {

      resumed: () => {

        alert('reload')

        location.reload()

      }

    }

  })

}

/*****************************************************************************************************************************

                                YpCaptcha Related - AJAX Login and Register

******************************************************************************************************************************/

function initializingYpCaptcha() {

  if (YpRiddler != undefined) {

    // 初始化云片图片验证码
    let YpCaptcha =  new YpRiddler(YpCaptchaInitializingOptions)

    return YpCaptcha

  }

  else {

    return undefined

  }

}

function instantiateYpCaptcha(){

  assignValueToMaintainingObjectsOnce({

    maintainingObjectsInfo: {

      objectsContainer: maintainingObjects,

      objectName: 'YpCaptchaInstance'

    },

    assginValueFunc: () => {

      return initializingYpCaptcha()

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

/*************************************************************

             showYpCaptchaButton OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  showingTime: 1000,

  shownCallback: () => {

    stopProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaButtonShowingFlag'

      }

    })

  }

}

**************************************************************/

function showYpCaptchaButton(show_button_options){

  //changing the position of YpCaptchaButton
  $(show_button_options.YpCaptchaButtonID).css('order', '0')

  //showing the YpCaptchaButton
  fadeIn({

    targetElement:  $(show_button_options.YpCaptchaButtonID),

    effectDuration: show_button_options.showingTime,

    callbacks: {

      shown: show_button_options.shownCallback

    }

  })

}

/*************************************************************

             hideYpCaptchaButton OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  hidingTime: 1000,

  hiddenCallback: () => {

    stopProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaButtonShowingFlag'

      }

    })

  }

}

**************************************************************/

function hideYpCaptchaButton(hide_button_options){

  //hiding the YpCaptchaButton

  fadeOut({

    targetElement: $(hide_button_options.YpCaptchaButtonID),

    effectDuration: hide_button_options.hidingTime,

    targetOriginalDisplayType: 'block',

    callbacks: {

      disappeared: () => {

        //changing the position of YpCaptchaButton

        $(hide_button_options.YpCaptchaButtonID).css('order', '1')

        hide_button_options.hiddenCallback()

      }

    }

  })

}

function changeYpCaptchaButtonText(tabName, text){

  $(`#account_modal .login-register-box ${tabName} .form-box .yunpian-captcha .yp-riddler-button .yp-riddler-button_text`).text(text)

}

/*************************************************************

       makeYpCaptchaButtonTextFlash OPTIONS EXAMPLE

**************************************************************

{

  YpCaptchaButtonID: '#register-yunpian-captcha',

  effectDuration: 800,

  callbacks : {

    beforeEffect: () => {

    },

    afterEffect: () => {

    }

  }

}

**************************************************************/

function makeYpCaptchaButtonTextFlash(flash_effect_options){

  //prevent multiple request before get the result
  if (startProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaButtonTextFlashingFlag'

      }

    })) {

    //except for 'glow' option, other options in transition in Semantic UI will cause svg icons move while animation effects are on progress in Safari on Mac computer or in the browsers on iOS devices
    //so we do not use transition in SUI and we realize the same function by ourselves
    enableFlashEffect({

        targetElement: $(`${flash_effect_options.YpCaptchaButtonID} .yp-riddler-button .yp-riddler-button_text`),

        effectDuration: flash_effect_options.effectDuration,

        targetOriginalDisplayType: 'inline-block',

        flashTimes: 2,

        callbacks: {

          beforeEffect: () => {

            flash_effect_options.callbacks.beforeEffect()

          },

          afterEffect: () => {

            flash_effect_options.callbacks.afterEffect()

            stopProcessingLock({

              maintainingFlagsInfo: {

                flagsContainer:YpCaptchaMaintainingFlags,

                flagName: 'YpCaptchaButtonTextFlashingFlag'

              }

            })

          }

        }

      })

  }

}

function isYpCaptchaButtonShown() {

  if (YpCaptchaMaintainingFlags.YpCaptchaButtonShowingFlag == false && YpCaptchaMaintainingFlags.YpCaptchaButtonShownFlag == true && YpCaptchaMaintainingFlags.YpCaptchaSuccessButtonShownFlag == false) {

    return true

  }

  return false

}

function isYpCaptchaPuzzleDialogShown() {

  if (($('#register-yunpian-captcha .yp-riddler-win-masker').css('display')=='block' && $('#register-yunpian-captcha .yp-riddler-win-masker').children().length > 0)) {

    return true

  }

  return false

}

function initializeYpCaptchaRefreshButton() {

  //only if YpCaptcha refresh button is initialized in the DOM when opening the YpCaptcha puzzle dialog
  //can its trasnform rotate degrees be synced with YpCaptcha
  //and then can it be shown after 1.5s
  //and then can click event be arranged
  if (startProcessingLock({

      maintainingFlagsInfo: {

        flagsContainer:YpCaptchaMaintainingFlags,

        flagName: 'YpCaptchaRefreshButtonInitializedFlag'

      }

  })) {

    //resume the transform rotate degrees counted by YpCaptcha
    $('#register-yunpian-captcha .yp-riddler-refresh').css('transform', 'rotate(' + YpCaptchaMaintainingFlags.YpCaptchaRefreshButtonRefreshTimes * 90 + 'deg)')

    //make the YpCaptcha refresh button visible after 1.5s
    suspendCurrentProcess({

      suspendingTime: 1500,

      callbacks: {

        resumed: () => {

          $('#register-yunpian-captcha .yp-riddler-refresh').css('visibility', 'visible')

        }

      }

    })

    //when clicking on the YpCaptcha refresh button...
    $('#register-yunpian-captcha .yp-riddler-refresh').click((event) => {

      //correct the animation effect by YpCaptcha's default behaviours
      $('#register-yunpian-captcha .yp-riddler-refresh').css('transition-property', 'transform')

      //freeze all actions, mainly aims for preventing clicking events from being activated
      $('body,#register-yunpian-captcha .yp-riddler-refresh').css('pointer-events', 'none')

      //count how many times the YpCaptcha refresh button rotates when clicking on it
      YpCaptchaMaintainingFlags.YpCaptchaRefreshButtonRefreshTimes += 1

      //fade out and fade in the YpCaptcha refresh button
      //leave 0.25s for YpCaptcha refresh button rotate when clicking on it before it starts fade out
      suspendCurrentProcess({

        suspendingTime: 250,

        callbacks: {

          resumed: () => {

            //fade out and fade in the YpCaptcha refresh button
            // make it possible that after fade out have finished the fade in then starts
            wait({

              worthWaitingHandler: (resolve) => {

                fadeOut({

                  targetElement: $('#register-yunpian-captcha .yp-riddler-refresh'),

                  effectDuration: 250,

                  targetOriginalDisplayType: 'none',

                  callbacks: {

                    disappeared: () => {

                      suspendCurrentProcess({

                        suspendingTime: 200,

                        callbacks: {

                          resumed: () => {

                            resolve()

                          }

                        }

                      })

                    }

                  }

                })

              },

              suspendedHandler: () => {

                fadeIn({

                  targetElement: $('#register-yunpian-captcha .yp-riddler-refresh'),

                  effectDuration: 250,

                  callbacks: {

                    shown: () => {

                      //resume all actions, mainly aims for making the click evnets being activated
                      $('body,#register-yunpian-captcha .yp-riddler-refresh').css('pointer-events', 'all')

                    }

                  }

                })

              }

            })

          }

        }

      })

    })

  }

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
        if (startProcessingLock({

          maintainingFlagsInfo: {

            flagsContainer:maintainingFlags,

            flagName: 'remoteProcessingFlag'

          }

        })) {

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

                let errorsBag = getNetworkRelatedErrorsBag(error)

                showErrorBox({

                  tabName: '.password-login',

                  errorsBag: errorsBag,

                  formBox: {

                    marginTopDistance: '1rem'

                  }

                })

                changeSubmitButtonText('.password-login', '登录')

                stopProcessingLock({

                  maintainingFlagsInfo: {

                    flagsContainer:maintainingFlags,

                    flagName: 'remoteProcessingFlag'

                  }

                })

              },

              succeeded: (response) => {

                if (response.data.success) {

                  wait({

                    worthWaitingHandler: (resolve) => {

                      closeErrorBox({

                        tabName: '.password-login',

                        formBox: {

                          marginTopDistance: '2.5rem'

                        },

                        resolve: resolve

                      })

                    },

                    suspendedHandler: () => {

                      disableAllActionsOnPage()

                      refreshPageUsingCurrentUrl()

                      stopProcessingLock({

                        maintainingFlagsInfo: {

                          flagsContainer:maintainingFlags,

                          flagName: 'remoteProcessingFlag'

                        }

                      })

                    }

                  })

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

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:maintainingFlags,

                      flagName: 'remoteProcessingFlag'

                    }

                  })

                }

              }

            }

          })

        }

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

      },

      succeeded:  () => {

        //start the remote processing lock, preventing over-executing the codes before the remote returns the result
        //Only when remote processing flag is true, the codes inside will be executed
        if (startProcessingLock({

          maintainingFlagsInfo: {

            flagsContainer:maintainingFlags,

            flagName: 'remoteProcessingFlag'

          }

        })){

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

                let errorsBag = getNetworkRelatedErrorsBag(error)

                showErrorBox({

                  tabName: '.password-login',

                  errorsBag: errorsBag,

                  formBox: {

                    marginTopDistance: '1rem'

                  }

                })

                changeSubmitButtonText('.password-login', '登录')

                stopProcessingLock({

                  maintainingFlagsInfo: {

                    flagsContainer:maintainingFlags,

                    flagName: 'remoteProcessingFlag'

                  }

                })

              },

              succeeded: (response) => {

                if (response.data.success) {

                  refreshPageUsingCurrentUrl()

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:maintainingFlags,

                      flagName: 'remoteProcessingFlag'

                    }

                  })

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

                  stopProcessingLock({

                    maintainingFlagsInfo: {

                      flagsContainer:maintainingFlags,

                      flagName: 'remoteProcessingFlag'

                    }

                  })

                }

              }

            }

          })

        }

      }

    }

  })

})



//click event for the 'get phone code' button on AccountRegisterTab
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

        wait({

          worthWaitingHandler: (resolve) => {

            closeErrorBox({

              tabName: '.account-register',

              formBox: {

                marginTopDistance: '1.5rem'

              },

              resolve: resolve

            })

          },

          suspendedHandler: () => {

            //prevent multiple requests before get the result
            //only when the YpCaptchaButtonShowingFlag is false and the YpCaptchaButtonShownFlag is false
            //the YpCaptchButton can be instantiated and showed up
            if (startDoubleProcessingLock({

              //indicating if the YpCaptchaButton is showing
              firstMaintainingFlagsInfo: {

                flagsContainer:YpCaptchaMaintainingFlags,

                flagName: 'YpCaptchaButtonShowingFlag'

              },

              //indicating if the YpCaptchaButton is shown
              secondMaintainingFlagsInfo: {

                flagsContainer:YpCaptchaMaintainingFlags,

                flagName: 'YpCaptchaButtonShownFlag'

              }

            })) {

                 instantiateYpCaptcha()

                 //show up the YpCaptchaButton
                 showYpCaptchaButton({

                   YpCaptchaButtonID: '#register-yunpian-captcha',

                   showingTime: 600,

                   shownCallback: () => {

                     stopProcessingLock({

                       maintainingFlagsInfo: {

                         flagsContainer:YpCaptchaMaintainingFlags,

                         flagName: 'YpCaptchaButtonShowingFlag'

                       }

                     })

                   }

                 })

                }

            //make the text of YpCaptchaButton flash
            if (isYpCaptchaButtonShown()) {

              makeYpCaptchaButtonTextFlash({

                YpCaptchaButtonID: '#register-yunpian-captcha',

                effectDuration: 800,

                callbacks : {

                  beforeEffect: () => {

                    //console.log('before the effect')

                  },

                  afterEffect: () => {

                    //console.log('after the effect')

                  }

                }

              })

            }

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
