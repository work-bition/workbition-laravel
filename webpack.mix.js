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

   .extract(['jquery', 'enquire.js', 'slick-carousel'])

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

mix.copy([

    'semantic-ui/dist/semantic.min.css',

    'node_modules/slick-carousel/slick/slick.css',

    'node_modules/slick-carousel/slick/slick-theme.css',

    'node_modules/slick-carousel/slick/ajax-loader.gif'

    ],

    'public/css'

);
