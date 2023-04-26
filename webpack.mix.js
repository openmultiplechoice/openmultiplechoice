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

mix.webpackConfig({
    resolve: {
        fallback: {
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            stream: require.resolve("stream-browserify"),
            zlib: require.resolve("browserify-zlib"),
        }
    }
})

mix.js('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'public/js')
    .js('node_modules/trix/dist/trix.esm.js', 'public/js/trix.min.js')
    .js('node_modules/@popperjs/core/dist/umd/popper.min.js', 'public/js/popper.min.js')
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/DeckForm.js', 'public/js')
    .js('resources/js/IndexSessionView.js', 'public/js')
    .js('resources/js/NewSessionView.js', 'public/js')
    .js('resources/js/SessionView.js', 'public/js')
    .js('resources/js/QuestionView.js', 'public/js')
    .js('resources/js/Messages.js', 'public/js')
    .js('resources/js/UserSettingsView.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .svelte();

mix.browserSync('http://omc.test');

mix.disableSuccessNotifications();
