<script>
    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";

    let decks = [];
    let modules = [];
    let subjects = [];

    let selectedDecksStats;
    let selectedModules = [];
    let selectedModule;
    let selectedSubject;

    // $: selectedDecks, console.log("selectedDecks", selectedDecks);
    // $: selectedSubject, console.log("selectedSubject", selectedSubject);

    $: selectedDecks = (() => {
        return decks.filter((d) =>
            selectedModule
                ? d.module
                    ? d.module.id === selectedModule.id
                    : false
                : true
        );
    })();

    $: selectedDecks,
        (() => {
            if (selectedDecks.length === 0) {
                return;
            }
            const requestParameters = selectedDecks.map(
                (d) => "decks[]=" + d.id
            );
            axios
                .get("/api/stats?" + requestParameters.join("&"))
                .then(function (response) {
                    selectedDecksStats = response.data;
                })
                .catch(function (error) {
                    alert(error);
                });
        })();

    $: deckStatsIndicator = (() => {
        var indicator = {};
        if (!selectedDecksStats) {
            return indicator;
        }
        for (const deck of selectedDecks) {
            if (!selectedDecksStats[deck.id]) {
                indicator[deck.id] =
                    '<span class="badge text-bg-light">?</span>';
                continue;
            }
            const deckStats = selectedDecksStats[deck.id];
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

    $: selectedSubject,
        (() => {
            selectedModules = modules.filter((m) =>
                selectedSubject
                    ? m.subject
                        ? m.subject.id === selectedSubject.id
                        : false
                    : true
            );
            // If a subject was selected and if there are modules
            // for the subject, default select the first module.
            if (selectedSubject && selectedModules.length > 0) {
                selectedModule = selectedModules[0];
            } else {
                selectedModule = undefined;
            }
        })();

    onMount(() => {
        axios
            .get("/api/decks")
            .then(function (response) {
                decks = response.data;
                var modulesArr = decks.map((d) => d.module).filter((v) => !!v);
                // Make `subjects` and `modules` sets (each subject/module
                // should be in the list only once). We don't use a `Set()`
                // to have arrays and be able to `.filter()`
                modules = modulesArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                );
                var subjectsArr = modules
                    .map((m) => m.subject)
                    .filter((v) => !!v);
                subjects = subjectsArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                );
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function createSession(deckId) {
        var data = {
            deck_id: deckId,
        };
        axios
            .post("/api/sessions", data)
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function sessionProgressPercentage(numQuestions, answerChoices) {
        const numCorrectAnswers = answerChoices.filter(
            (c) => c.is_correct && !c.help_used
        ).length;
        const numCorrectAnswersWithHelp = answerChoices.filter(
            (c) => c.is_correct && c.help_used
        ).length;
        const numIncorrectAnswers = answerChoices.filter(
            (c) => !c.is_correct
        ).length;

        const percentage = {
            correct: Math.round(100 * (numCorrectAnswers / numQuestions)),
            correctWithHelp: Math.round(
                100 * (numCorrectAnswersWithHelp / numQuestions)
            ),
            incorrect: Math.round(100 * (numIncorrectAnswers / numQuestions)),
            unanswered: Math.round(
                100 *
                    ((numQuestions -
                        numCorrectAnswers -
                        numCorrectAnswersWithHelp -
                        numIncorrectAnswers) /
                        numQuestions)
            ),
        };

        // Make sure to have 100% in total
        if (
            percentage.correct +
                percentage.correctWithHelp +
                percentage.incorrect +
                percentage.unanswered !=
            100
        ) {
            if (percentage.unanswered > 0) {
                percentage.unanswered = percentage.unanswered + 1;
            } else if (percentage.incorrect > 0) {
                percentage.incorrect = percentage.incorrect + 1;
            } else if (percentage.correctWithHelp > 0) {
                percentage.incorrectWithHelp = percentage.correctWithHelp + 1;
            } else if (percentage.correct > 0) {
                percentage.correct = percentage.correct + 1;
            }
        }

        return percentage;
    }
</script>

{#if decks}
    <div class="row">
        <div class="col-md-4">
            <select
                bind:value={selectedSubject}
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example">
                <option selected value={undefined}>All subjects</option>
                {#each subjects as subject}
                    <option value={subject}>{subject.name}</option>
                {/each}
            </select>
            {#if selectedSubject}
                <select
                    bind:value={selectedModule}
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example">
                    {#each selectedModules as module, index (module.id)}
                        <option
                            selected={selectedModule === module.id}
                            value={module}>{module.name}</option>
                    {/each}
                </select>
            {/if}
        </div>
        <div class="col-md-8">
            <div class="row">
                {#each selectedDecks as deck}
                    <div class="col-lg-6 mb-1">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">
                                    {deck.name}
                                    {#if deckStatsIndicator[deck.id]}
                                        {@html deckStatsIndicator[deck.id]}
                                    {/if}
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
                                    class="btn btn-primary">New session</button>
                                <a href="/decks/{deck.id}" class="card-link"
                                    >Browse deck</a>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
