//引入simeditor和它的依赖
import 'simple-module'
import 'simple-hotkeys'
import 'simple-uploader'
import Simditor from 'simditor'


$(document).ready(() => {

  let editor = new Simditor({

    textarea: $('#editor')

  })

})
