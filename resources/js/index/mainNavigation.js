/**
* Main Navigation
**/


/** Animation effect **/
$('#main_nav .left.menu a').hover(function(event) {

  $(event.currentTarget.children[0])

    .transition('tada')

}, function(event) {

  $(event.currentTarget.children[0])

    .transition('stop')

})
