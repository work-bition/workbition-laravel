import axios from 'axios'

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

/*************************************************************

             startDoubleProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  firstMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  secondMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  }

}

**************************************************************/

function startDoubleProcessingLock(lock_options){

  if (!lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] && !lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName]) {

    lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] = true

    lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] = true

    return true

  }

  return false

}

/*************************************************************

         startTripleProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  firstMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  secondMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  thirdMaintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

}

**************************************************************/

function startTripleProcessingLock(lock_options){

  if (!lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] && !lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] && !lock_options.thirdMaintainingFlagsInfo.flagsContainer[lock_options.thirdMaintainingFlagsInfo.flagName]) {

    lock_options.firstMaintainingFlagsInfo.flagsContainer[lock_options.firstMaintainingFlagsInfo.flagName] = true

    lock_options.secondMaintainingFlagsInfo.flagsContainer[lock_options.secondMaintainingFlagsInfo.flagName] = true

    lock_options.thirdMaintainingFlagsInfo.flagsContainer[lock_options.thirdMaintainingFlagsInfo.flagName] = true

    return true

  }

  return false

}

/*************************************************************

             stopProcessingLock OPTIONS EXAMPLE

**************************************************************

{

  maintainingFlagsInfo: {

    flagsContainer:maintainingFlags,

    flagName: 'YpCaptchaProcessingFlag'

  },

  setZero[optional]: true

}

**************************************************************/

function stopProcessingLock(lock_options) {

  if (lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName]) {

    if (lock_options.setZero) {

      lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = 0

      return

    }

    lock_options.maintainingFlagsInfo.flagsContainer[lock_options.maintainingFlagsInfo.flagName] = false

  }

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

      })

    .catch((error) => {

        post_options.callbacks.failed(error)

      })

}

function getNetworkRelatedErrorsBag(error){

  let errorsBag = []

  let globalErrors = []

  if (error.response) {

    ////in Laravel, the command like 'throw new \Symfony\Component\HttpKernel\Exception\ConflictHttpException('User was updated prior to your request.');'
    // will return error information from error.response
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

function suspendCurrentProcess(suspend_options){

  wait({

    worthWaitingHandler: (resolve) => {

      setTimeout( () => { resolve() }, suspend_options.suspendingTime)

    },

    suspendedHandler: suspend_options.callbacks.resumed

  })

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

    return instantiateYpCaptcha()

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

/*************************************************************

                    wait OPTIONS EXAMPLE

**************************************************************

{

  worthWaitingHandler: () => {


  },

  suspendedHandler: () => {

  }

}

only when the worthWaitingHandler is finally executed the suspendedHandler

will be called

**************************************************************/
function wait(wait_options) {

  new Promise((resolve, reject) => {

    wait_options.worthWaitingHandler(resolve)

  }).then(() => {

    wait_options.suspendedHandler()

  })

}

export { startProcessingLock, startTripleProcessingLock, stopProcessingLock, sendPostRequest,

         getNetworkRelatedErrorsBag, suspendCurrentProcess, assignValueToMaintainingObjects,

         assignValueToMaintainingObjectsOnce, unsetMaintainingObjects, startRepeater,

         clearRepeater, wait }
