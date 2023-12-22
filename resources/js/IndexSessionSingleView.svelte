<script>
    import { format, formatDistance, parseISO } from "date-fns";
    import SessionProgressBar from "./SessionProgressBar.svelte";
    import { sessionProgressPercentage } from "./StatsHelper.js";

    export let session;

    $: sessionAtPretty = formatDistance(parseISO(session.created_at), new Date());

    $: sessionAt = format(parseISO(session.created_at), "dd/MM/yyyy HH:mm")

    $: validQuestions = session
        ? session.deck.questions.filter((q) => !q.is_invalid)
        : null;

    $: progressPercentage = session
        ? sessionProgressPercentage(validQuestions.length, session.answerchoices.filter(
            e => validQuestions.some(({ id }) => id === e.question_id)
        ))
        : null;

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


<div class="mt-3 mb-3">
    <SessionProgressBar
        bind:progressPercentage />
    <div class="row mt-1">
        <div class="col-md-4">
            <strong>{session.name}</strong>
        </div>
        <div class="col-md-4">
            {#if progressPercentage.unanswered > 0}
                <a href="/sessions/{session.id}" class="btn btn-sm btn-primary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"><i class="bi bi-rocket-takeoff" /> Continue</a>
            {:else}
                <a href="/sessions/{session.id}" class="btn btn-sm btn-outline-secondary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"><i class="bi bi-rocket-takeoff" /> Open</a>
            {/if}
            {#if progressPercentage.unanswered === 0 && progressPercentage.incorrect > 0}
                <button on:click|preventDefault={() => createSession(session.id)}
                    class="btn btn-sm btn-outline-secondary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" type="button">
                        <i class="bi bi-repeat" /> Repeat incorrect
                </button>
            {/if}
        </div>
        <div class="col-md-4" title="{sessionAt}">
            <span class="float-end d-none d-sm-none d-md-inline">
                <small>{sessionAtPretty} ago</small>
            </span>
            <span class="d-inline d-sm-inline d-md-none">
                <small>{sessionAtPretty} ago</small>
            </span>
        </div>
    </div>
</div>

