import DeckImport from "./DeckImport.svelte";
import { mount } from "svelte";

const deckImportEl = document.getElementById('DeckImport');

const f = mount(DeckImport, {
    target: deckImportEl,
});
