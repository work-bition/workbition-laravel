const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

Mix.listen('configReady', (webpackConfig) => {

     // Create SVG sprites
     webpackConfig.module.rules.unshift({

         test: /\.svg$/,

         loaders: [

           {

             loader: 'svg-sprite-loader',

             options: {

                 symbolId: 'icon-[name]',

             },

           },

           {

             loader: 'svgo-loader',

             options: {

             }

           }

         ],

         include: /(resources\/js\/icons\/svg)/

     });

     // Exclude 'svg' folder from the default Laravel Mix svg loader
     let fontLoaderConfig = webpackConfig.module.rules.find(rule => String(rule.test) === String(/(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/));

     fontLoaderConfig.exclude = /(resources\/js\/icons\/svg)/;

 });

mix.webpackConfig(webpack => {

    return {

        plugins: [

            new webpack.ProvidePlugin({

                $: 'jquery',

                jQuery: 'jquery',

                'window.jQuery': 'jquery'

            })

        ]

    };

});



mix.js('resources/js/index/main.js', 'public/js')

      .extract(['jquery', 'enquire.js', 'slick-carousel', 'ellipsis.js', 'objectFitPolyfill'])

   .sass('resources/sass/index/main.scss', 'public/css')

      .options({

        postCss: [

            require('postcss-sorting')({

              'properties-order': 'alphabetical'

            })

        ]

      })

   .version()

   .browserSync('https://workbition.test');



mix.copy('semantic-ui/dist/themes', 'public/css/themes');

mix.copy(['node_modules/slick-carousel/slick/ajax-loader.gif'], 'public/css');
