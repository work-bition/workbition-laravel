import '../../../semantic-ui/dist/semantic.min.js'

import 'objectFitPolyfill'

import './header'

import './mainNavigation'

import './pageBanners'

import './articlesFeed'

//借助webpack的require.context来动态引入所有svg图标文件
const request = require.context('../icons/svg', false, /\.svg$/);

request.keys().forEach(request);
