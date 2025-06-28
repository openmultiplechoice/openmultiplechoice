<script>
    import { preventDefault } from 'svelte/legacy';

    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";

    import { sessionProgressPercentage } from "./StatsHelper.js";
    import { createSession } from "./NewSessionHelper.js";

    let { deck = $bindable(), selectDeck, selectedDecks = $bindable() } = $props();

    let progressIndicator = $state(undefined);

    let isBookmarked = $state(deck.bookmarks.length > 0);

    onMount(() => {
        const validQuestions = deck.questions.filter(q => !q.is_invalid);

        const sessions = deck.sessions.sort((a, b) => b.id - a.id /* sort by ID desc */);
        if (sessions.length === 0) {
            return;
        }

        const latestSession = sessions[0];

        const filteredAnswerChoices = latestSession.answer_choices.filter(
            e => validQuestions.some(({ id }) => id === e.question_id)
        );

        const percentage = sessionProgressPercentage(
            validQuestions.length,
            filteredAnswerChoices
        );

        if (percentage.correct >= 60) {
            progressIndicator = '<span class="badge text-bg-success" title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        } else {
            progressIndicator = '<span class="badge text-bg-danger" title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        }
    });

    function toggleBookmark() {
        if (isBookmarked) {
            axios
                .delete("/api/decks/" + deck.id + "/bookmark/" + deck.bookmarks[0].id)
                .then(function (response) {
                    if (response.status === 204) {
                        isBookmarked = false;
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
        } else {
            axios
                .post("/api/decks/" + deck.id + "/bookmark")
                .then(function (response) {
                    if (response.status === 200) {
                        isBookmarked = true;
                        deck.bookmarks = [response.data];
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
</script>

<div class="col-md-6 mb-3">
    <div class="card">
        <div class="card-header">
            {#if deck.exam_at}
                <span class="badge text-bg-light">
                    {format(
                        parseISO(deck.exam_at),
                        "dd.MM.yyyy"
                    )}
                </span>
            {:else}
                <span class="badge text-bg-light">
                    {format(
                        parseISO(deck.created_at),
                        "dd.MM.yyyy"
                    )}
                </span>
            {/if}
            <span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {deck.questions.length}</span>
            {#if deck.sessions}
                <span class="badge text-bg-light font-monospace" title="Number of sessions"><i class="bi bi-rocket"></i> {deck.sessions.length}</span>
            {/if}
            {#if progressIndicator}
                {@html progressIndicator}
            {/if}
            <button
                class="btn btn-sm btn-link"
                onclick={toggleBookmark}>
                <i class:bi-bookmark-check-fill={isBookmarked}
                    class:bi-bookmark={!isBookmarked}>
                </i>
            </button>
            <input type="checkbox" class="form-check-input float-end" value="" id="selected{deck.id}"
                onclick={() => selectDeck(deck.id)}
                checked={selectedDecks.has(deck.id)} />
        </div>

        <div class="card-body">
            <h6 class="card-title text-truncate" title="{deck.name}">
                {deck.name}
            </h6>
            <button type="button" class="btn btn-sm btn-primary"
                onclick={preventDefault(() => createSession(deck.id))}>

                <i class="bi bi-rocket-takeoff"></i> Start session
            </button>
            <a href="/decks/{deck.id}" class="card-link">Browse deck</a>
        </div>
    </div>
</div>
