<script>
    import Chart from 'chart.js/auto';

    export let questionsInModule;
    export let answerChoices;
    export let moduleId;

    let chartAnsweredQuestions;
    let canvasAnsweredQuestions;

    $: validQuestionsInModule = questionsInModule.filter(q => !q.is_invalid);
    $: validAnswerChoices = answerChoices.filter(
        e => validQuestionsInModule.some(({ id }) => id === e.question_id)
    );

    $: numQuestionsInModule = validQuestionsInModule.length;
    $: numAnsweredQuestions = validAnswerChoices.length;
    $: numUnansweredQuestions = numQuestionsInModule - numAnsweredQuestions;
    $: numCorrectAnsweredQuestions = validAnswerChoices.filter(a => a.is_correct === 1 && a.help_used === 0).length;
    $: numCorrectWithHelpAnsweredQuestions = validAnswerChoices.filter(a => a.is_correct === 1 && a.help_used === 1).length;
    $: numIncorrectAnsweredQuestions = validAnswerChoices.filter(a => a.is_correct === 0).length

    $: incorrectAnsweredQuestionsIds = validAnswerChoices.filter(a => a.is_correct === 0).map(ac => ac.question_id);

    $: if (canvasAnsweredQuestions) {
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
                                '#d4edda',
                                '#fff3cd',
                                '#f8d7da',
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
    };

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

{#if numQuestionsInModule === numUnansweredQuestions}
    <div class="row">
        <div class="col-md-5">
            <p>Number of questions in this module (duplicates included): <span class="badge text-bg-secondary"><i class="bi bi-collection" /> {numQuestionsInModule}</span></p>
        </div>
    </div>
{:else}
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
                        <button on:click|preventDefault={() => createSession(incorrectAnsweredQuestionsIds.slice(0, 30))}
                            class="btn btn-sm btn-outline-secondary" type="button">
                                <i class="bi bi-repeat" /> Repeat 30 incorrect
                        </button>
                    {/if}
                    {#if numIncorrectAnsweredQuestions >= 70}
                        <button on:click|preventDefault={() => createSession(incorrectAnsweredQuestionsIds.slice(0, 60))}
                            class="btn btn-sm btn-outline-secondary" type="button">
                                <i class="bi bi-repeat" /> Repeat 60 incorrect
                        </button>
                    {/if}
                    <button on:click|preventDefault={() => createSession(incorrectAnsweredQuestionsIds)}
                        class="btn btn-sm btn-outline-secondary" type="button">
                            <i class="bi bi-repeat" /> Repeat {numIncorrectAnsweredQuestions} incorrect
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
