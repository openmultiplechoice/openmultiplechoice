import UserSettingsView from './UserSettingsView.svelte';

const userSettingsViewEl = document.getElementById('UserSettingsView');

const f = new UserSettingsView({
    target: userSettingsViewEl
});
