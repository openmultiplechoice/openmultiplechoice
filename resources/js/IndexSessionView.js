import IndexSessionView from './IndexSessionView.svelte';

const indexSessionViewEl = document.getElementById('IndexSessionView');

const f = new IndexSessionView({
    target: indexSessionViewEl,
    props: {
        userId: indexSessionViewEl.dataset.userId,
    }
});
