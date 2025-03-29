import UserSettingsView from './UserSettingsView.svelte';
import { mount } from "svelte";

const userSettingsViewEl = document.getElementById('UserSettingsView');

const f = mount(UserSettingsView, {
    target: userSettingsViewEl
});
