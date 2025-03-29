<script>
    import { preventDefault } from 'svelte/legacy';

    import { format, formatDistance, parseISO } from "date-fns";
    import SessionProgressBar from "./SessionProgressBar.svelte";
    import { sessionProgressPercentage } from "./StatsHelper.js";

    let { session } = $props();

    let sessionAtPretty = $derived(formatDistance(parseISO(session.created_at), new Date()));

    let sessionAt = $derived(format(parseISO(session.created_at), "dd.MM.yyyy HH:mm"))

    let validQuestions = $derived(session
        ? session.deck.questions.filter((q) => !q.is_invalid)
        : null);

    let progressPercentage = $derived(session
        ? sessionProgressPercentage(validQuestions.length, session.answerchoices.filter(
            e => validQuestions.some(({ id }) => id === e.question_id)
        ))
        : null);

    function createSession(sessionId) {
        axios
            .post('/api/sessions/' + sessionId + '/newfromincorrect')
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>


<div class="mt-1 mb-2 p-2 rounded-2 border shadow-sm session-hover">
    <SessionProgressBar
        bind:progressPercentage />
    <div class="row mt-1">
        <div class="col-md-5 text-truncate" title="{session.name}">
            <strong>{session.name}</strong>
        </div>
        <div class="col-md-4 d-flex gap-1">
            <a href="/sessions/{session.id}" class="btn btn-sm flex-fill"
                class:btn-primary={progressPercentage.unanswered}
                class:btn-outline-secondary={!progressPercentage.unanswered}
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    <i class="bi bi-rocket-takeoff"></i> Open
            </a>
            {#if progressPercentage.unanswered === 0 && progressPercentage.incorrect > 0}
                <button onclick={preventDefault(() => createSession(session.id))}
                    class="btn btn-sm btn-outline-secondary flex-fill"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" type="button">
                        <i class="bi bi-repeat"></i> Repeat incorrect
                </button>
            {/if}
            <a href="/sessions/{session.id}/edit" class="btn btn-sm btn-outline-secondary"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    <i class="bi bi-three-dots-vertical"></i>
            </a>
        </div>
        <div class="col-md-3 text-muted align-bottom" title="{sessionAt}">
            <span class="float-end d-none d-sm-none d-md-inline">
                <small>{sessionAtPretty} ago</small>
            </span>
            <span class="d-inline d-sm-inline d-md-none">
                <small>{sessionAtPretty} ago</small>
            </span>
        </div>
    </div>
</div>

<style>
    .session-hover:hover {
        background-color: var(--bs-tertiary-bg);
    }
</style>
