<script>
    import { onMount } from "svelte";

    import NewSessionDeckStats from "./NewSessionDeckStats.svelte";
    import NewSessionDeckView from "./NewSessionDeckView.svelte";

    export let moduleId;
    export let selectDeck;
    export let selectedDecks;

    let decks = [];

    onMount(() => {
        if (!moduleId) {
            // No module selected yet
            decks = [];
            return;
        }
        axios
            .get("/api/decks?module=" + moduleId)
            .then(function (response) {
                decks = response.data;
                decks.sort(function (a, b) {
                    if (a.exam_at === null) {
                        return 1;
                    }
                    if (b.exam_at === null) {
                        return -1;
                    }
                    if (a.exam_at < b.exam_at) return 1;
                    if (a.exam_at > b.exam_at) return -1;
                    return 0;
                });
            })
            .catch(function (error) {
                alert(error);
            });
    });
</script>

<NewSessionDeckStats bind:decks bind:moduleId />

<div class="row">
    {#each decks as deck}
        <NewSessionDeckView bind:deck {selectDeck} bind:selectedDecks />
    {:else}
        <p>Loading ...</p>
    {/each}
</div>
