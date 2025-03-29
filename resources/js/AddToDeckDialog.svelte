<script>
    import { run, preventDefault } from 'svelte/legacy';

    import { onMount } from "svelte";

    let { questionId } = $props();

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

    function fetchDecks() {
        axios
            .get("/api/decks/withquestionids")
            .then(function (response) {
                var decks = response.data;
                decksAdded = [];
                decksOther = [];
                decks.forEach((deck) => {
                    if (deck.questions.some((q) => q.id === questionId)) {
                        decksAdded = [
                            ...decksAdded,
                            { id: deck.id, name: deck.name },
                        ];
                    } else {
                        decksOther = [
                            ...decksOther,
                            { id: deck.id, name: deck.name },
                        ];
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }

    function addQuestionToDeck(deckId) {
        axios
            .post("/api/decks/" + deckId + "/addquestion", {
                question_id: questionId,
            })
            .then(function (reponse) {
                const deck = decksOther.find((d) => d.id === deckId);
                decksAdded = [...decksAdded, deck];
                decksOther = decksOther.filter((d) => d.id !== deckId);
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
                const deck = decksAdded.find((d) => d.id === deckId);
                decksOther = [...decksOther, deck];
                decksAdded = decksAdded.filter((d) => d.id !== deckId);
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
                decksOther = [...decksOther, deck];
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
    class="btn btn-outline-secondary btn-sm"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasAddToDeck"
    aria-controls="offcanvasAddToDeck"
    ><i class="bi bi-collection"></i> Add to deck</button>

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
    <div class="offcanvas-body pb-0">
        {#if decksAdded}
            {#if decksAdded.length + decksOther.length > 10}
                <input
                    bind:this={filterElement}
                    bind:value={filterText}
                    type="text"
                    class="form-control mb-3"
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
        <div class="row sticky-bottom bg-white mt-3">
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
