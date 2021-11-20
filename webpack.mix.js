const mix = require('laravel-mix');

require('laravel-mix-svelte');

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
    .js('node_modules/trix/dist/trix.js', 'public/js')
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/DeckForm.js', 'public/js')
    .js('resources/js/NewSessionView.js', 'public/js')
    .js('resources/js/SessionView.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .svelte();

mix.browserSync('http://omc.local');

mix.disableSuccessNotifications();
