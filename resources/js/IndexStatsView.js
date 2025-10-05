import IndexStatsView from './IndexStatsView.svelte';
import { mount } from "svelte";

const indexStatsViewEl = document.getElementById('IndexStatsView');

const f = mount(IndexStatsView, {
    target: indexStatsViewEl,
});
