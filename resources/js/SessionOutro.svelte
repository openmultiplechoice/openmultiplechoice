<script>
    import { formatDuration, intervalToDuration } from "date-fns";

    import SessionProgressBar from "./SessionProgressBar.svelte";

    let { answerChoices = $bindable(), sessionStartTime = $bindable(), progressPercentage = $bindable(), sessionId } = $props();

    let timeDiff = $state();

    $effect(() => {
        if (answerChoices.length < 2) {
            // cannot compute a diff w/o at least two answers
            return;
        }

        const dateSessionStart = new Date(sessionStartTime);
        const answerChoicesSorted = answerChoices.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
        });
        const dateLastAnswer = new Date(answerChoicesSorted.at(-1).created_at);

        const duration = intervalToDuration({ start: dateSessionStart, end: dateLastAnswer });
        timeDiff = formatDuration(duration);
    });

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

<div class="border rounded-3 shadow-sm bg-body">
<div class="container">
    <div class="row py-4">
        <div class="col">
            <SessionProgressBar bind:progressPercentage />
        </div>
    </div>
    <div class="row px-2 py-4">
        <div class="col-lg-7">
            {#if progressPercentage.correct > 0}
                <div class="row align-items-center lh-1 mb-1">
                    <div class="col-auto"><span class="text-success fw-bold fs-4">✓</span></div>
                    <div class="col-auto"><span class="badge text-bg-success font-monospace">{progressPercentage.numCorrectAnswers}/{progressPercentage.numAnswers} <span class="ms-4">{progressPercentage.correct}%</span></span></div>
                    <div class="col">
                        <div class="progress" role="progressbar" style="height: 1.25rem">
                            <div class="progress-bar bg-success fw-bold" style="width: {progressPercentage.correct}%"></div>
                        </div>
                    </div>
                </div>
            {/if}
            {#if progressPercentage.correctWithHelp > 0}
                <div class="row align-items-center lh-1 mb-1">
                    <div class="col-auto"><span class="text-warning fw-bold fs-4">✓</span></div>
                    <div class="col-auto"><span class="badge text-bg-warning font-monospace">{progressPercentage.numCorrectAnswersWithHelp}/{progressPercentage.numAnswers}  <span class="ms-4">{progressPercentage.correctWithHelp}%</span></span></div>
                    <div class="col">
                        <div class="progress" role="progressbar" style="height: 1.25rem">
                            <div class="progress-bar bg-warning fw-bold" style="width: {progressPercentage.correctWithHelp}%"></div>
                        </div>
                    </div>
                </div>
            {/if}
            {#if progressPercentage.incorrect > 0}
                <div class="row align-items-center lh-1 mb-1">
                    <div class="col-auto"><span class="text-danger fw-bold fs-4">✗</span></div>
                    <div class="col-auto"><span class="badge text-bg-danger font-monospace">{progressPercentage.numIncorrectAnswers}/{progressPercentage.numAnswers} <span class="ms-4">{progressPercentage.incorrect}%</span></span></div>
                    <div class="col">
                        <div class="progress" role="progressbar" style="height: 1.25rem">
                            <div class="progress-bar bg-danger fw-bold" style="width: {progressPercentage.incorrect}%"></div>
                        </div>
                    </div>
                </div>
            {/if}
            <div class="row align-items-center mt-3 mb-3">
                {#if timeDiff}
                    <div class="col-auto fw-bold fs-5"><i class="bi bi-stopwatch"></i></div>
                    <div class="col-auto"><span class="badge text-bg-secondary font-monospace">{timeDiff}</span></div>
                {/if}
            </div>
        </div>
        <div class="col-lg-4 offset-lg-1 py-2">
            <div class="d-grid gap-2">
                <a href="/sessions/create" class="btn btn-sm btn-primary">
                    <i class="bi bi-rocket-takeoff"></i> New session</a>
                {#if progressPercentage.incorrect > 0}
                    <button onclick={(() => createSession(sessionId))}
                        class="btn btn-sm btn-secondary" type="button">
                            <i class="bi bi-repeat"></i> Repeat <span class="badge text-bg-light font-monospace">{progressPercentage.numIncorrectAnswers}</span> incorrect
                    </button>
                {/if}
                <a href="/" class="btn btn-sm btn-outline-secondary mt-3">Home</a>
            </div>
        </div>
    </div>
</div>
</div>
