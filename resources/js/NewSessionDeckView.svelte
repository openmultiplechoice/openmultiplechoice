<script>
    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";

    import { sessionProgressPercentage } from "./StatsHelper.js";
    import { createSession } from "./NewSessionHelper.js";

    export let deck;
    export let selectDeck;
    export let selectedDecks;

    let progressIndicator = undefined;

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
            progressIndicator = '<span style="color: #155724; background-color: #d4edda;" class="badge" title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        } else {
            progressIndicator = '<span style="color: #721c24; background-color: #f8d7da;" class="badge" title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        }
    });
</script>

<div class="col-lg-6 mb-1">
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
            <span class="badge text-bg-light" title="Number of questions"><i class="bi bi-collection" /> {deck.questions.length}</span>
            {#if deck.sessions}
                <span class="badge text-bg-light" title="Number of sessions"><i class="bi bi-rocket" /> {deck.sessions.length}</span>
            {/if}
            {#if progressIndicator}
                {@html progressIndicator}
            {/if}
            <input type="checkbox" class="form-check-input float-end" value="" id="selected{deck.id}"
                on:click={() => selectDeck(deck.id)}
                checked={selectedDecks.has(deck.id)} />
        </div>

        <div class="card-body">
            <h6 class="card-title">
                {deck.name}
            </h6>
            <button type="button" class="btn btn-sm btn-primary"
                on:click|preventDefault={() => createSession(deck.id)}>

                <i class="bi bi-rocket-takeoff" /> Start session
            </button>
            <a href="/decks/{deck.id}" class="card-link">Browse deck</a>
        </div>
    </div>
</div>
