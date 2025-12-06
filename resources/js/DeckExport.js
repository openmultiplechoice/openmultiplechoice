import DeckExport from "./DeckExport.svelte";
import { mount } from "svelte";

const deckExportEl = document.getElementById('DeckExport');

const f = mount(DeckExport, {
    target: deckExportEl,
    props: {
        deckId: deckExportEl.dataset.deckId,
    }
});
