<script>
    import { untrack } from 'svelte';

    let { decks, moduleId } = $props();

    let questionIds = $state([]);
    let validAnswerChoices = $state([]);
    let statsRequestId = 0;

    $effect(() => {
        // Whenever `decks` updates (for example when the user
        // changes the deck kind from main to user decks), we
        // have to re-fetch the answers for the list of current
        // `questionIds` to show the correct stats for the given
        // set of questions
        const d = decks;
        if (!d) {
            // No decks loaded yet
            return;
        }
        untrack(() => fetchAnswers(d));
    });

    function fetchAnswers(decks) {
        const requestId = ++statsRequestId;

        const questionsInModule = decks.map(d => d.questions).flat();
        const validQuestions = questionsInModule.filter(q => !q.is_invalid);

        questionIds = [...new Set(validQuestions.map(q => q.id))];

        axios.post('/api/answerchoices/latest_by_question_id', { question_ids: questionIds })
            .then(response => {
                // Ignore this response, as a newer request has been made since this one
                if (requestId !== statsRequestId) {
                    return;
                }
                validAnswerChoices = response.data.answer_choices;
            })
            .catch(error => {
                if (requestId !== statsRequestId) {
                    return;
                }
                console.error("Failed to fetch latest answers", error);
                validAnswerChoices = [];
            })
            .finally(() => {
                if (requestId !== statsRequestId) {
                    return;
                }
            });
    }

    let numQuestionsInModule = $derived(questionIds.length);

    let numAnsweredQuestions = $derived(validAnswerChoices.length);
    let numUnansweredQuestions = $derived(numQuestionsInModule - numAnsweredQuestions);
    let numCorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && !a.help_used).length);
    let numCorrectWithHelpAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && a.help_used).length);
    let numIncorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => !a.is_correct).length)
    let incorrectAnsweredQuestionsIds = $derived(validAnswerChoices.filter(a => !a.is_correct).map(ac => ac.question_id));

    function createSession(questionIds) {
        const data = {
            module_id: moduleId,
            question_ids: questionIds,
        };
        axios
            .post('/api/sessions/newfromquestionids', data)
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if decks && numQuestionsInModule === numUnansweredQuestions}
    {#if numQuestionsInModule > 0}
        <div class="row">
            <div class="col-md">
                <div class="alert alert-light mb-3 py-2">
                    <span class="badge text-body font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {numQuestionsInModule}</span>
                </div>
            </div>
        </div>
    {/if}
{:else if decks}
    <div class="row mb-5">
        <div class="col-md-5">
            <canvas bind:this={canvasAnsweredQuestions}></canvas>
        </div>
        <div class="col-md-7 mt-3">
            <table class="table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>Questions</td>
                        <td class="font-monospace text-end">{numQuestionsInModule}</td>
                    </tr>
                    <tr>
                        <td>Answered</td>
                        <td class="font-monospace text-end">{numAnsweredQuestions}
                            ({Math.round(100 * numAnsweredQuestions/numQuestionsInModule).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}%)</td>
                    </tr>
                    <tr>
                        <td>Unanswered</td>
                        <td class="font-monospace text-end">{numUnansweredQuestions}
                            ({Math.round(100 * numUnansweredQuestions/numQuestionsInModule).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}%)</td>
                    </tr>
                    <tr>
                        <td>Correct</td>
                        <td class="font-monospace text-end">{numCorrectAnsweredQuestions}
                            ({Math.round(100 * numCorrectAnsweredQuestions/numAnsweredQuestions).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}%)</td>
                    </tr>
                    <tr>
                        <td>Correct with help</td>
                        <td class="font-monospace text-end">{numCorrectWithHelpAnsweredQuestions}
                            ({Math.round(100 * numCorrectWithHelpAnsweredQuestions/numAnsweredQuestions).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}%)</td>
                    </tr>
                    <tr>
                        <td>Incorrect</td>
                        <td class="font-monospace text-end">{numIncorrectAnsweredQuestions}
                            ({Math.round(100 * numIncorrectAnsweredQuestions/numAnsweredQuestions).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}%)</td>
                    </tr>
                </tbody>
            </table>

            {#if numIncorrectAnsweredQuestions > 0}
                <div class="d-grid gap-2">
                    {#if numIncorrectAnsweredQuestions >= 40}
                        <button onclick={preventDefault(() => createSession(incorrectAnsweredQuestionsIds.slice(0, 30)))}
                            class="btn btn-sm btn-outline-secondary" type="button">
                                <i class="bi bi-repeat"></i> Repeat 30 incorrect
                        </button>
                    {/if}
                    {#if numIncorrectAnsweredQuestions >= 70}
                        <button onclick={preventDefault(() => createSession(incorrectAnsweredQuestionsIds.slice(0, 60)))}
                            class="btn btn-sm btn-outline-secondary" type="button">
                                <i class="bi bi-repeat"></i> Repeat 60 incorrect
                        </button>
                    {/if}
                    <button onclick={preventDefault(() => createSession(incorrectAnsweredQuestionsIds))}
                        class="btn btn-sm btn-outline-secondary" type="button">
                            <i class="bi bi-repeat"></i> Repeat {numIncorrectAnsweredQuestions} incorrect
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
