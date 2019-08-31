/*************************************************************

                    fadeIn OPTIONS EXAMPLE

**************************************************************

{

  targetElement: $('#register-yunpian-captcha .yp-riddler-button .yp-riddler-button_text'),

  callbacks: {

    shown: () => {}

  }

}

**************************************************************/
function fadeIn(fade_in_options){

  fade_in_options.targetElement.css({'order': '0','display':'none', 'visibility': 'visible'})

  fade_in_options.targetElement.fadeIn(1000, fade_in_options.callbacks.shown)

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

  if (effect_options.callbacks.beforeEffect.isCalled == undefined) {

    effect_options.callbacks.beforeEffect()

    effect_options.callbacks.beforeEffect.isCalled = true

  }

  effect_options.targetElement.fadeOut(effect_options.effectDuration/4, () => {

    // this makes sure that the target element will still occupy its original space and makes the fade out effect function normally
    effect_options.targetElement.css({'display':effect_options.targetOriginalDisplayType, 'visibility': 'hidden'})

    // this makes sure that the target element will still occupy its original space and makes the fade in effect function normally
    effect_options.targetElement.css({'display':'none', 'visibility': 'visible'})

    effect_options.targetElement.fadeIn(effect_options.effectDuration/4, () => {

      effect_options.flashTimes -= 1

      if (effect_options.flashTimes > 0) {

        enableFlashEffect(effect_options)

      }

      else {

        effect_options.callbacks.afterEffect()

        return

      }

    })

  })

}

export { fadeIn, enableFlashEffect }
