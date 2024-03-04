import IndexStatsView from './IndexStatsView.svelte';

const indexStatsViewEl = document.getElementById('IndexStatsView');

const f = new IndexStatsView({
    target: indexStatsViewEl,
});
