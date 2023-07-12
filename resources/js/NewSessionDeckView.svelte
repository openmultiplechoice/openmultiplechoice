<script>
    import { format, parseISO } from "date-fns";

    import { sessionProgressPercentage } from "./StatsHelper.js";
    import NewSessionDeckStats from "./NewSessionDeckStats.svelte";

    export let moduleId;
    export let createSession;
    export let selectDeck;
    export let userSelectedDecks;

    let decks = [];
    let decksStats = {};

    $: questionsInModule =
        (() => {
            var questions = [];
            decks.forEach((d) => questions.push(...d.questions));
            return questions;
        })();

    $: answerChoices =
        (() => {
            var choices = [];
            for (const deckId in decksStats) {
                choices.push(...decksStats[deckId].answer_choices);
            }
            choices.sort(function (a, b) {
                return a.created_at < b.created_at;
            });
            return choices;
        })();

    $: fetchDecks(moduleId);

    function fetchDecks(moduleId) {
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
                    return a.exam_at < b.exam_at;
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }

    $: decks,
        (() => {
            if (decks.length === 0) {
                return;
            }
            const requestParameters = decks.map(
                (d) => "decks[]=" + d.id
            );
            axios
                .get("/api/stats?" + requestParameters.join("&"))
                .then(function (response) {
                    decksStats = response.data;
                })
                .catch(function (error) {
                    alert(error);
                });
        })();

    $: deckStatsIndicator = (() => {
        var indicator = {};
        if (!decksStats) {
            return indicator;
        }
        for (const deck of decks) {
            if (!decksStats[deck.id]) {
                indicator[deck.id] = "";
                continue;
            }
            const deckStats = decksStats[deck.id];
            const percentage = sessionProgressPercentage(
                deckStats.deck.questions.length,
                deckStats.answer_choices
            );
            var indicatorColorStyle = 'style="color: #721c24; background-color: #f8d7da;"';
            if (percentage.correct >= 60) {
                indicatorColorStyle = 'style="color: #155724; background-color: #d4edda;"';
            }
            indicator[deck.id] =
                '<span ' + indicatorColorStyle + ' class="badge" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here\'s some..." title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        }
        return indicator;
    })();
</script>

<NewSessionDeckStats bind:moduleId bind:questionsInModule bind:answerChoices />

{#each decks as deck}
    <div class="col-lg-6 mb-1">
        <div class="card">
            <div class="card-header">
                {#if deck.exam_at}
                    <span class="badge text-bg-light">
                        {format(
                            parseISO(deck.exam_at),
                            "dd/MM/yyyy"
                        )}
                    </span>
                {:else}
                    <span class="badge text-bg-light">
                        {format(
                            parseISO(deck.created_at),
                            "dd/MM/yyyy"
                        )}
                    </span>
                {/if}
                <span class="badge text-bg-secondary" title="Number of questions">{deck.questions.length}</span>
                {#if deckStatsIndicator[deck.id]}
                    {@html deckStatsIndicator[deck.id]}
                {/if}
                <input
                    on:click={() => selectDeck(deck.id)}
                    class="form-check-input float-end"
                    type="checkbox"
                    value=""
                    id="selected{deck.id}"
                    checked={userSelectedDecks.has(deck.id)} />
            </div>
            <div class="card-body">
                <h6 class="card-title">
                    {deck.name}
                </h6>

                <button
                    on:click|preventDefault={() =>
                        createSession(deck.id)}
                    type="button"
                    class="btn btn-sm btn-primary"
                    ><i class="bi bi-ui-checks-grid" /> New session</button>
                <a href="/decks/{deck.id}" class="card-link"
                    >Browse deck</a>
            </div>
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/each}
