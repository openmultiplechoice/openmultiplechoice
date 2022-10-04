import DeckForm from './DeckForm.svelte';

const deckFormEl = document.getElementById('DeckForm');

const f = new DeckForm({
    target: deckFormEl,
    props: {
        id: deckFormEl.dataset.deckId,
        name: deckFormEl.dataset.deckName,
        moduleId: deckFormEl.dataset.moduleId
    }
});
