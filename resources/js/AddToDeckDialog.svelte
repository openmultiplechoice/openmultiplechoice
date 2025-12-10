<script>
    import { run, preventDefault } from 'svelte/legacy';

    import { onMount, untrack } from "svelte";

    import { UserSettings } from "./UserSettingsStore.js";

    let { questionId, questionAddToDeckIncludedCount = $bindable() } = $props();

    let settingsAddToDeckCurrentModuleOnly = $derived($UserSettings.add_to_deck_current_module_only);
    let settingsLastModuleId = $derived($UserSettings.last_module_id);

    let decks = $state([]);
    let decksAdded = $state(undefined);
    let decksOther = $state(undefined);
    let deckName = $state('');
    let filterElement = $state();
    let filterText = $state('');

    onMount(() => {
        const c = document.getElementById('offcanvasAddToDeck');
        c.addEventListener('show.bs.offcanvas', event => {
            fetchDecks();
        })
        c.addEventListener('shown.bs.offcanvas', event => {
            focusFilter();
        })
        c.addEventListener('hidden.bs.offcanvas', event => {
            decksAdded = undefined;
            decksOther = undefined;
            filterText = '';
        })
    });

    $effect(() => {
        axios
            .put("/api/users/me/settings", {
                add_to_deck_current_module_only: settingsAddToDeckCurrentModuleOnly
            })
            .catch(function (error) {
                alert(error);
            });
    });

    $effect(() => {
        // Whenever `settingsAddToDeckCurrentModuleOnly` changes
        // and is not undefined, run `updateDecks()` (but don't
        // track the state in `updateDecks`)
        if (settingsAddToDeckCurrentModuleOnly !== undefined) {
            untrack(() => updateDecks());
        }
    });

    function fetchDecks() {
        axios
            .get("/api/decks/with_question_ids")
            .then(function (response) {
                decks = response.data;
                updateDecks();
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }

    function updateDecks() {
        decksAdded = [];
        decksOther = [];

        if (decks.length === 0) {
            return;
        }

        const decksFiltered = decks.filter((deck) => {
            // Always list decks that include the question already,
            // even if not part of the current module
            if (deck.questions.some((q) => q.id === questionId)) return true;

            if (settingsAddToDeckCurrentModuleOnly) {
                return deck.module_id === settingsLastModuleId;
            } else {
                return true;
            }
        });

        decksFiltered.forEach((deck) => {
            if (deck.questions.some((q) => q.id === questionId)) {
                decksAdded = [...decksAdded, deck];
            } else {
                decksOther = [...decksOther, deck];
            }
        });

        questionAddToDeckIncludedCount = decksAdded.length;
    }

    function addQuestionToDeck(deckId) {
        axios
            .post("/api/decks/" + deckId + "/addquestion", {
                question_id: questionId,
            })
            .then(function (reponse) {
                const deck = decks.find((d) => d.id === deckId);
                deck.questions.push({ id: questionId });
                updateDecks();
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function removeQuestionFromDeck(deckId) {
        axios
            .post("/api/decks/" + deckId + "/removequestion", {
                question_id: questionId,
            })
            .then(function (reponse) {
                const deck = decks.find((d) => d.id === deckId);
                deck.questions = deck.questions.filter((q) => q.id !== questionId);
                updateDecks();
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function createDeck() {
        if (!deckName) {
            return;
        }

        axios
            .post("/api/decks", {
                name: deckName,
            })
            .then(function (response) {
                const deck = response.data;
                deck.questions = [];
                decks.push(deck);
                addQuestionToDeck(deck.id);
                deckName = '';
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function focusFilter() {
        if (filterElement) {
            filterElement.focus();
        }
    }

    let filteredDecksOther = $derived(decksOther?.filter(deck => deck.name.toLowerCase().includes(filterText.toLowerCase())));
    let filteredDecksAdded = $derived(decksAdded?.filter(deck => deck.name.toLowerCase().includes(filterText.toLowerCase())));

    run(() => {
        filteredDecksAdded, focusFilter();
    });
</script>

<button
    class="btn btn-sm"
    class:btn-outline-secondary={questionAddToDeckIncludedCount === 0}
    class:bg-info-subtle={questionAddToDeckIncludedCount > 0}
    class:border-secondary={questionAddToDeckIncludedCount > 0}
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasAddToDeck"
    aria-controls="offcanvasAddToDeck">
        <i class="bi bi-collection"></i>
        Add to deck
        {#if questionAddToDeckIncludedCount > 0}
            <span class="badge text-bg-light">{questionAddToDeckIncludedCount}</span>
        {/if}
    </button>

<div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasAddToDeck"
    aria-labelledby="offcanvasAddToDeckLabel">
    <div class="offcanvas-header">
        <h5 id="offcanvasAddToDeckLabel">Add question to deck</h5>
        <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
    </div>
    <div class="offcanvas-body py-0">
        <div class="row sticky-top bg-white">
            <div class="col">
                <div class="alert alert-light">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settingsAddToDeckCurrentModuleOnly}>
                        <label class="form-check-label" for="flexSwitchCheckDefault">List only decks of current module or with question added</label>
                    </div>
                </div>
            </div>
        </div>
        {#if decksAdded}
            {#if decksAdded.length + decksOther.length > 10}
                <input
                    bind:this={filterElement}
                    bind:value={filterText}
                    type="text"
                    class="form-control mt-1 mb-3"
                    placeholder="Filter decks ..."/>
            {/if}
            {#each filteredDecksAdded as deck}
                <div class="row mb-1">
                    <div class="col-9 text-truncate">
                        <a href="/decks/{deck.id}" class="link-dark">{deck.name}</a>
                    </div>
                    <div class="col-3 d-grid gap-4">
                        <button
                            onclick={preventDefault(() =>
                                removeQuestionFromDeck(deck.id))}
                            class="btn btn-sm btn-outline-secondary float-end">Remove</button>
                    </div>
                </div>
            {/each}
            {#if filteredDecksOther.length > 0 && filteredDecksAdded.length > 0}
                <hr />
            {/if}
            {#each filteredDecksOther as deck}
                <div class="row mb-1">
                    <div class="col-9 text-truncate">
                        <a href="/decks/{deck.id}" class="link-dark">{deck.name}</a>
                    </div>
                    <div class="col-3 d-grid gap-4">
                        <button
                            onclick={preventDefault(() =>
                                addQuestionToDeck(deck.id))}
                            class="btn btn-sm btn-primary float-end">Add</button>
                    </div>
                </div>
            {/each}
            {#if filteredDecksOther.length === 0 && filteredDecksAdded.length === 0}
                <div class="alert alert-light text-center" role="alert">
                    No decks found
                </div>
            {/if}
        {:else}
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading decks ...</span>
                </div>
            </div>
        {/if}
        <hr />
        <div class="row sticky-bottom bg-white pt-3">
            <div class="col">
                <p>Create new deck:</p>
                <div class="mb-2">
                    <input bind:value={deckName} type="text" class="form-control" id="name" name="name" placeholder="My new deck ...">
                </div>
                <button onclick={preventDefault(() => createDeck())}
                        class="btn btn-sm btn-primary mb-3">Create deck and add question</button>
            </div>
        </div>
    </div>
</div>
