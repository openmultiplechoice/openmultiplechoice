import SessionView from './SessionView.svelte';

const sessionViewEl = document.getElementById('SessionView');

const f = new SessionView({
    target: sessionViewEl,
    props: {
        id: sessionViewEl.dataset.sessionId,
    }
});
