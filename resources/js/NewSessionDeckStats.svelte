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
    let percentAnsweredQuestions = $derived(Math.round(100 * numAnsweredQuestions/numQuestionsInModule))

    let numUnansweredQuestions = $derived(numQuestionsInModule - numAnsweredQuestions);

    let numCorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && !a.help_used).length);
    let percentCorrectAnsweredQuestions = $derived(Math.round(100 * numCorrectAnsweredQuestions/numAnsweredQuestions))

    let numCorrectWithHelpAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && a.help_used).length);
    let percentCorrectWithHelpAnsweredQuestions = $derived(Math.round(100 * numCorrectWithHelpAnsweredQuestions/numAnsweredQuestions));

    let numIncorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => !a.is_correct).length)
    let percentIncorrectAnsweredQuestions = $derived(Math.round(100 * numIncorrectAnsweredQuestions/numAnsweredQuestions));

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

    function formatCount(count, total) {
        return String(count).padStart(String(total).length, '\u00A0');
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
    <div class="row align-items-center lh-1 mb-1 alert">
            <div class="col-auto"><span class="text-secondary fw-bold fs-4">✓</span></div>
            <div class="col-auto"><span class="badge text-bg-secondary font-monospace">{formatCount(numAnsweredQuestions, numQuestionsInModule)}/{numQuestionsInModule} <span class="ms-4">{String(percentAnsweredQuestions).padStart(3, '\u00A0')}%</span></span></div>
            <div class="col">
                <div class="progress" role="progressbar" style="height: 1.25rem">
                    <div class="progress-bar bg-secondary fw-bold" style="width: {percentAnsweredQuestions}%"></div>
                </div>
            </div>
    </div>
    <div class="row mb-1">
        <div class="col-lg-7">
            <div class="alert border rounded-3 vstack gap-2">
                {#if numCorrectAnsweredQuestions > 0}
                    <div class="row align-items-center lh-1">
                        <div class="col-auto"><span class="text-success fw-bold fs-4">✓</span></div>
                        <div class="col-auto"><span class="badge text-bg-success font-monospace">{formatCount(numCorrectAnsweredQuestions, numAnsweredQuestions)}/{numAnsweredQuestions} <span class="ms-4">{String(percentCorrectAnsweredQuestions).padStart(3, '\u00A0')}%</span></span></div>
                        <div class="col">
                            <div class="progress" role="progressbar" style="height: 1.25rem">
                                <div class="progress-bar bg-success fw-bold" style="width: {percentCorrectAnsweredQuestions}%"></div>
                            </div>
                        </div>
                    </div>
                {/if}
                {#if numCorrectWithHelpAnsweredQuestions > 0}
                    <div class="row align-items-center lh-1">
                        <div class="col-auto"><span class="text-warning fw-bold fs-4">✓</span></div>
                        <div class="col-auto"><span class="badge text-bg-warning font-monospace">{formatCount(numCorrectWithHelpAnsweredQuestions, numAnsweredQuestions)}/{numAnsweredQuestions}  <span class="ms-4">{String(percentCorrectWithHelpAnsweredQuestions).padStart(3, '\u00A0')}%</span></span></div>
                        <div class="col">
                            <div class="progress" role="progressbar" style="height: 1.25rem">
                                <div class="progress-bar bg-warning fw-bold" style="width: {percentCorrectWithHelpAnsweredQuestions}%"></div>
                            </div>
                        </div>
                    </div>
                {/if}
                {#if numIncorrectAnsweredQuestions > 0}
                    <div class="row align-items-center lh-1">
                        <div class="col-auto"><span class="text-danger fw-bold fs-4">✗</span></div>
                        <div class="col-auto"><span class="badge text-bg-danger font-monospace">{formatCount(numIncorrectAnsweredQuestions, numAnsweredQuestions)}/{numAnsweredQuestions} <span class="ms-4">{String(percentIncorrectAnsweredQuestions).padStart(3, '\u00A0')}%</span></span></div>
                        <div class="col">
                            <div class="progress" role="progressbar" style="height: 1.25rem">
                                <div class="progress-bar bg-danger fw-bold" style="width: {percentIncorrectAnsweredQuestions}%"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="col-lg-5">
            {#if numIncorrectAnsweredQuestions > 0}
                <div class="alert py-0">
                    <div class="d-grid gap-2">
                        {#if numIncorrectAnsweredQuestions >= 40}
                            <button onclick={() => createSession(incorrectAnsweredQuestionsIds.slice(0, 30))}
                                class="btn btn-sm btn-primary" type="button">
                                    <i class="bi bi-repeat"></i> Repeat <span class="badge text-bg-light font-monospace">30</span> incorrect
                            </button>
                        {/if}
                        {#if numIncorrectAnsweredQuestions >= 70}
                            <button onclick={() => createSession(incorrectAnsweredQuestionsIds.slice(0, 60))}
                                class="btn btn-sm btn-primary" type="button">
                                    <i class="bi bi-repeat"></i> Repeat <span class="badge text-bg-light font-monospace">60</span> incorrect
                            </button>
                        {/if}
                        <button onclick={() => createSession(incorrectAnsweredQuestionsIds)}
                            class="btn btn-sm btn-primary" type="button">
                                <i class="bi bi-repeat"></i> Repeat <span class="badge text-bg-light font-monospace">{numIncorrectAnsweredQuestions}</span> incorrect
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}
