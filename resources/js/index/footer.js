/**
* Main Navigation
**/



/** Animation effect **/
$('.footer .footer-share a').hover(function(event) {

  $(event.currentTarget.children[0])

    .transition('tada')

}, function(event) {

  $(event.currentTarget.children[0])

    .transition('stop')

})
