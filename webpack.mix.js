const mix = require('laravel-mix');

// editorconfig-checker-disable
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications.
 |
 */
// editorconfig-checker-enable

mix.js('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
