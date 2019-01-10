
/*****************************************************************************************************************************

                                   Detect Browsers

******************************************************************************************************************************/



/** Mobile Device and IE11 Detection **/

/** detecting if it is iOS or Android devices **/
let u = navigator.userAgent

//iOS devices
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

//Android devices
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

/** detecting if it is IE11 browser **/
let isIE11 = false

if (window.matchMedia("screen and (-ms-high-contrast: active), (-ms-high-contrast: none)").matches) {

  isIE11 = true

}

export { isiOS, isAndroid, isIE11 }
