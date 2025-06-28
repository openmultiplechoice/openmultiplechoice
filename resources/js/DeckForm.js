import DeckForm from './DeckForm.svelte';
import { mount } from "svelte";

const deckFormEl = document.getElementById('DeckForm');

const f = mount(DeckForm, {
    target: deckFormEl,
    props: {
        id: deckFormEl.dataset.deckId,
        name: deckFormEl.dataset.deckName,
        moduleId: deckFormEl.dataset.moduleId
    }
});
