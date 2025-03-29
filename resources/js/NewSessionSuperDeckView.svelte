<script>
    import { run, preventDefault } from 'svelte/legacy';

    let { selectedDecks = $bindable() } = $props();

    let decks = $state([]);
    let deckName = $state("My new super deck");
    let filterOutDuplicates = $state(true);

    run(() => {
        selectedDecks, fetchDeckInfo();
    });
    let questions =
        $derived((() => {
            var questions = [];
            decks.forEach((d) => questions.push(...d.questions));
            if (filterOutDuplicates) {
                return [...new Map(questions.map(q => [q.id, q])).values()]
            }
            return questions;
        })());
    let questionsWithImages =
        $derived((() => {
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
        })());

    function fetchDeckInfo() {
        if (selectedDecks.size === 0) {
            decks = [];
            return;
        }
        const requestParameters = [...selectedDecks].map(
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
                    (duplicates {filterOutDuplicates ? 'excluded' : 'included'})
                </p>
                <div class="mb-3">
                    <label for="name" class="form-label">Deck Name</label>
                    <input type="text" class="form-control" id="name" bind:value={deckName} onfocus={event => event.target.select()}>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="checkboxRemoveDuplicates" bind:checked={filterOutDuplicates}>
                    <label class="form-check-label" for="checkboxRemoveDuplicates">Filter out duplicates</label>
                </div>
                <div class="d-grid gap-2 d-md-block">
                <button
                    class="btn btn-sm btn-primary"
                    onclick={preventDefault(() => createSuperDeck(deckName, questions.map(q => q.id)))}>
                        Create deck ({questions.length} question{questions.length > 1 ? "s" : ""})
                </button>
                <button
                    class="btn btn-sm btn-primary"
                    onclick={preventDefault(() => createSuperDeck(deckName, questionsWithImages.map(q => q.id)))}>
                        Create deck ({questionsWithImages.length} image question{questionsWithImages.length > 1 ? "s" : ""})
                </button>
                <button
                    class="btn btn-sm btn-link"
                    onclick={preventDefault(() => selectedDecks = new Set())}>
                        Cancel
                </button>
                </div>
            </div>
        </div>
    </div>
{/if}
