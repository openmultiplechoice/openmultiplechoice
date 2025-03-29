import SessionView from './SessionView.svelte';
import { mount } from "svelte";

const sessionViewEl = document.getElementById('SessionView');

const f = mount(SessionView, {
    target: sessionViewEl,
    props: {
        id: sessionViewEl.dataset.sessionId,
    }
});
