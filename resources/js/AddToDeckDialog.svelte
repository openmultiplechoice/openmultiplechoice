<script>
    import { onMount } from "svelte";

    export let questionId;

    let decksAdded = [];
    let decksOther = [];

    onMount(() => {
        axios
            .get("/api/decks/withquestionids")
            .then(function (response) {
                var decks = response.data;
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
    });

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
</script>

<button
    class="btn btn-outline-secondary btn-sm"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasAddToDeck"
    aria-controls="offcanvasAddToDeck"
    ><i class="bi bi-collection" /> Add question to deck</button>

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
            aria-label="Close" />
    </div>
    <div class="offcanvas-body">
        {#each decksOther as deck}
            <div class="row mb-1">
                <div class="col-8">
                    {deck.name}
                </div>
                <div class="col-4">
                    <button
                        on:click|preventDefault={() =>
                            addQuestionToDeck(deck.id)}
                        class="btn btn-sm btn-success">Add</button>
                </div>
            </div>
        {/each}
        {#if decksOther.length > 0 && decksAdded.length > 0}
            <hr />
        {/if}
        {#each decksAdded as deck}
            <div class="row mb-1">
                <div class="col-8">
                    {deck.name}
                </div>
                <div class="col-4">
                    <button
                        on:click|preventDefault={() =>
                            removeQuestionFromDeck(deck.id)}
                        class="btn btn-sm btn-outline-dark">Remove</button>
                </div>
            </div>
        {/each}
        {#if decksOther.length === 0 && decksAdded.length === 0}
            <p>You don't have any decks yet.</p>
            <a href="/decks" class="btn btn-sm btn-primary mb-3"
                ><i class="bi bi-collection-fill" /> New deck</a>
        {/if}
    </div>
</div>
