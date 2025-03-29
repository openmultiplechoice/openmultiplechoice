import NewSessionView from './NewSessionView.svelte';
import { mount } from "svelte";

const newSessionViewEl = document.getElementById('NewSessionView');

const f = mount(NewSessionView, {
    target: newSessionViewEl
});
