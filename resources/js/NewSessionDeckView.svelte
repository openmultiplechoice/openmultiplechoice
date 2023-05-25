<script>
    import { format, parseISO } from "date-fns";

    import { sessionProgressPercentage } from "./StatsHelper.js";

    export let moduleId;
    export let createSession;
    export let selectDeck;
    export let userSelectedDecks;

    let decks = [];
    let decksStats;

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
            var indicatorColorClass = "text-bg-danger";
            if (percentage.correct >= 60) {
                indicatorColorClass = "text-bg-success";
            }
            indicator[deck.id] =
                '<span class="badge ' +
                indicatorColorClass +
                '" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here\'s some..." title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        }
        return indicator;
    })();
</script>

{#each decks as deck}
    <div class="col-lg-6 mb-1">
        <div class="card">
            <div class="card-header">
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
                <p class="card-subtitle mb-2 text-muted">
                    {format(
                        parseISO(deck.created_at),
                        "dd/MM/yyyy HH:mm"
                    )}
                </p>

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
