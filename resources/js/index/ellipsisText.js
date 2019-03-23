import 'ellipsis.js'



export default function ellipsisText(ellipsisElements, ellipsisOptions= { className: false, lines: 2 } ) {

  let ellipsisConf = ellipsisOptions

  let ellipsis = Ellipsis( ellipsisConf )

  ellipsis.add( ellipsisElements )

}
