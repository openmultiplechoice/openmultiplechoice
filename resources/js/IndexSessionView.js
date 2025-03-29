import IndexSessionView from './IndexSessionView.svelte';
import { mount } from "svelte";

const indexSessionViewEl = document.getElementById('IndexSessionView');

const f = mount(IndexSessionView, {
    target: indexSessionViewEl,
    props: {
        userId: indexSessionViewEl.dataset.userId,
    }
});
