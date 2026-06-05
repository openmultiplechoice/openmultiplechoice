import ThemeModeButton from "./ThemeModeButton.svelte";
import { mount } from 'svelte';

const themeModeButtonEl = document.getElementById('ThemeModeButton');

if (themeModeButtonEl) {
    mount(ThemeModeButton, {
        target: themeModeButtonEl,
        props: {
            initialMode: themeModeButtonEl.dataset.themeMode,
        }
    });
}
