<script>
    import { run, preventDefault } from 'svelte/legacy';

    import Chart from 'chart.js/auto';

    let { decks, moduleId } = $props();

    let validQuestionsInModule = $state([]);
    let validAnswerChoices = $state([]);

    let chartAnsweredQuestions = $state();
    let canvasAnsweredQuestions = $state();

    run(() => {
        decks, (() => {
            if (!decks) {
                // No decks loaded yet
                return;
            }

            const questionsInModule = decks.map(d => d.questions).flat();

            validQuestionsInModule = questionsInModule.filter(q => !q.is_invalid);

            const answerChoices = [];
            for (const deck of decks) {
                // For each deck, get the latest session from the list of sessions

                const sessions = deck.sessions.sort((a, b) => b.id - a.id /* sort by ID desc */);
                if (sessions.length === 0) {
                    continue;
                }

                const latestSession = sessions[0];

                // Take all answer choices from the latest session
                answerChoices.push(...latestSession.answer_choices);
            }

            // Filter out answer choices for questions that are not in the module
            // or not valid
            validAnswerChoices = answerChoices.filter(
                e => validQuestionsInModule.some(({ id }) => id === e.question_id)
            );
        })();
    });

    let numQuestionsInModule = $derived(validQuestionsInModule.length);
    let numAnsweredQuestions = $derived(validAnswerChoices.length);
    let numUnansweredQuestions = $derived(numQuestionsInModule - numAnsweredQuestions);
    let numCorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && !a.help_used).length);
    let numCorrectWithHelpAnsweredQuestions = $derived(validAnswerChoices.filter(a => a.is_correct && a.help_used).length);
    let numIncorrectAnsweredQuestions = $derived(validAnswerChoices.filter(a => !a.is_correct).length)
    let incorrectAnsweredQuestionsIds = $derived(validAnswerChoices.filter(a => !a.is_correct).map(ac => ac.question_id));

    run(() => {
        if (canvasAnsweredQuestions) {
            (() => {
                const config = {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Correct',
                            'Correct with help',
                            'Incorrect',
                            'Unanswered'
                        ],
                        datasets: [
                            {
                                label: 'n',
                                data: [
                                    numCorrectAnsweredQuestions,
                                    numCorrectWithHelpAnsweredQuestions,
                                    numIncorrectAnsweredQuestions,
                                    numUnansweredQuestions
                                ],
                                backgroundColor: [
                                    '#198754',
                                    '#ffc107',
                                    '#dc3545',
                                    '#bbbbbb'
                                ],
                                hoverOffet: 4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        hover: {
                            mode: null
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                };

                if (chartAnsweredQuestions) {
                    chartAnsweredQuestions.destroy();
                }
                var ctx = canvasAnsweredQuestions.getContext('2d');
                chartAnsweredQuestions = new Chart(ctx, config);
            })();
        }
    });;

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
    <div class="row">
        <div class="col-md">
            <p>Number of questions (duplicates included): <span class="badge text-bg-light font-monospace"><i class="bi bi-collection"></i> {numQuestionsInModule}</span></p>
        </div>
    </div>
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
