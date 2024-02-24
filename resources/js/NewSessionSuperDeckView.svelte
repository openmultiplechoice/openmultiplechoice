<script>
    export let userSelectedDecks;

    let decks = [];
    let deckName = "My new super deck";
    let filterOutDuplicates = true;

    $: userSelectedDecks, fetchDeckInfo();

    $: questions =
        (() => {
            var questions = [];
            decks.forEach((d) => questions.push(...d.questions));
            if (filterOutDuplicates) {
                return [...new Map(questions.map(q => [q.id, q])).values()]
            }
            return questions;
        })();

    $: questionsWithImages =
        (() => {
            var questions = [];
            decks.forEach((d) => {
                d.questions.forEach((q) => {
                    q.images.length > 0 ? questions.push(q) : "do nothing" ;
                })
            });
            if (filterOutDuplicates) {
                return [...new Map(questions.map(q => [q.id, q])).values()]
            }
            return questions;
        })();

    function fetchDeckInfo() {
        if (userSelectedDecks.size === 0) {
            decks = [];
            return;
        }
        const requestParameters = [...userSelectedDecks].map(
            (d) => "decks[]=" + d
        );
        axios
            .get("/api/decks?" + requestParameters.join("&"))
            .then(function (response) {
                decks = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function createSuperDeck(deckName, questionIds) {
        var data = {
            name: deckName,
            question_ids: questionIds,
        };
        axios
            .post("/api/decks", data)
            .then(function (response) {
                window.location.href = "/decks/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if decks.length > 0}
    <div class="row">
        <div class="col-md">
            <div class="alert alert-light" role="alert">
                <p>Create your own super deck:</p>
                <p>
                    You have <strong>selected {decks.length} deck{decks.length > 1 ? "s" : ""}</strong>
                    with <strong>{questions.length} question{questions.length > 1 ? "s" : ""}</strong>
                    {#if questionsWithImages.length > 0}
                        / <strong>{questionsWithImages.length} question{questionsWithImages.length > 1 ? "s" : ""} with images</strong>
                    {/if}
                </p>
                <div class="mb-3">
                    <label for="name" class="form-label">Deck Name</label>
                    <input type="text" class="form-control" id="name" bind:value={deckName} on:focus={event => event.target.select()}>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="checkboxRemoveDuplicates" bind:checked={filterOutDuplicates}>
                    <label class="form-check-label" for="checkboxRemoveDuplicates">Filter out duplicates</label>
                </div>
                <div class="d-grid gap-2 d-md-block">
                <button
                    class="btn btn-sm btn-primary"
                    on:click|preventDefault={() => createSuperDeck(deckName, questions.map(q => q.id))}>
                        Create deck ({questions.length} question{questions.length > 1 ? "s" : ""})
                </button>
                <button
                    class="btn btn-sm btn-primary"
                    on:click|preventDefault={() => createSuperDeck(deckName, questionsWithImages.map(q => q.id))}>
                        Create deck ({questionsWithImages.length} image question{questionsWithImages.length > 1 ? "s" : ""})
                </button>
                <button
                    class="btn btn-sm btn-link"
                    on:click|preventDefault={() => userSelectedDecks = new Set()}>
                        Cancel
                </button>
                </div>
            </div>
        </div>
    </div>
{/if}
