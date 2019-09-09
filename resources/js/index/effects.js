/*************************************************************

                    fadeIn OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 250,

  callbacks: {

    shown: () => {}

  }

}

**************************************************************/
function fadeIn(fade_in_options){

  fade_in_options.targetElement.css({'display':'none', 'visibility': 'visible'})

  fade_in_options.targetElement.fadeIn(fade_in_options.effectDuration, () => {

    if (fade_in_options.callbacks) {

      fade_in_options.callbacks.shown()

    }

  })

}

/*************************************************************

                    fadeOut OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 250,

  targetOriginalDisplayType: 'block',

  callbacks: {

    disappeared: () => {}

  }

}

**************************************************************/
function fadeOut(fade_out_options){

  fade_out_options.targetElement.fadeOut(fade_out_options.effectDuration, () => {

    fade_out_options.targetElement.css({'display' : fade_out_options.targetOriginalDisplayType, 'visibility': 'hidden'})

    if (fade_out_options.callbacks) {

      fade_out_options.callbacks.disappeared()

    }

  })

}

/*************************************************************

             enableFlashEffect OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  effectDuration: 800,

  targetOriginalDisplayType: 'inline-block',

  flashTimes: 2,

  callbacks: {

    beforeEffect: () => {},

    afterEffect: () => {}

  }

}

**************************************************************/
function enableFlashEffect(effect_options){

  //here will only be called once
  if (effect_options.callbacks.beforeEffect.isCalled == undefined) {

    effect_options.callbacks.beforeEffect()

    effect_options.callbacks.beforeEffect.isCalled = true

    effect_options.partDuration = effect_options.effectDuration / ( effect_options.flashTimes * 2 )

  }

  fadeOut({

    targetElement: effect_options.targetElement,

    effectDuration: effect_options.partDuration,

    targetOriginalDisplayType: effect_options.targetOriginalDisplayType,

    callbacks: {

      disappeared: () => {

        fadeIn({

          targetElement: effect_options.targetElement,

          effectDuration: effect_options.partDuration,

          callbacks: {

            shown: () => {

              effect_options.flashTimes -= 1

              if (effect_options.flashTimes > 0) {

                enableFlashEffect(effect_options)

              }

              else {

                effect_options.callbacks.afterEffect()

                return

              }

            }

          }

        })

      }

    }

  })

}

export { fadeIn, fadeOut, enableFlashEffect }
