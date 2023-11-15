import path from 'path';

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [
        laravel([
            'resources/scss/app.scss',
            'resources/js/app.js',

            'resources/js/DeckForm.js',
            'resources/js/IndexSessionView.js',
            'resources/js/IndexStatsView.js',
            'resources/js/Messages.js',
            'resources/js/NewSessionView.js',
            'resources/js/QuestionView.js',
            'resources/js/SessionView.js',
            'resources/js/UserSettingsView.js',

            'node_modules/bootstrap/dist/js/bootstrap.esm.js',
            'node_modules/trix/dist/trix.esm.js',
        ]),
        svelte({
        }),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
            '~trix': path.resolve(__dirname, 'node_modules/trix'),
        }
    }
});
