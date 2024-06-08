<script>
    import debounce from "lodash/debounce";

    import { onMount, tick } from "svelte";

    import MagicGifView from "./MagicGIFView.svelte";
    import Messages from "./Messages.svelte";
    import SessionOutro from "./SessionOutro.svelte";
    import SessionProgressBar from "./SessionProgressBar.svelte";
    import SessionQuestionIndexView from "./SessionQuestionIndexView.svelte";
    import SessionQuestionNav from "./SessionQuestionNav.svelte";
    import SessionQuestionView from "./SessionQuestionView.svelte";

    import { sessionProgressPercentage } from "./StatsHelper.js";
    import { UserSettings } from "./UserSettingsStore.js";

    export let id;

    var currentQuestionContext;
    var data;
    var helpUsed = false;
    var magicGIFPath = '';

    $: examMode = !sessionComplete ? $UserSettings.session_exam_mode : false;
    $: settingsShowSidebar = $UserSettings.session_show_sidebar;
    $: settingsExamMode = $UserSettings.session_exam_mode;
    $: settingsShuffleAnswers = $UserSettings.session_shuffle_answers;
    $: settingsMultipleAnswerTries = $UserSettings.session_multiple_answer_tries;

    $: settingsShowSidebar,
        (()=> {
            axios
                .put("/api/users/me/settings", {
                    session_show_sidebar: settingsShowSidebar
                })
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        })();

    $: settingsExamMode,
        (()=> {
            axios
                .put("/api/users/me/settings", {
                    session_exam_mode: settingsExamMode
                })
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        })();

    $: settingsShuffleAnswers,
        (()=> {
            axios
                .put("/api/users/me/settings", {
                    session_shuffle_answers: settingsShuffleAnswers
                })
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        })();

    // editorconfig-checker-disable
    $: validQuestions = data
        ? data.deck.questions.filter((q) => !q.is_invalid)
        : null;
    $: answerChoice = data
        ? data.session.answer_choices.find(
              (e) => e.question_id === currentQuestionId
          )
        : null;
    $: answerChoices = data
        ? data.session.answer_choices.filter(
            e => validQuestions.some(({ id }) => id === e.question_id)
          )
        : null;
    $: currentQuestion = data
        ? data.deck.questions.find(
              (q) => q.id === data.session.current_question_id
          )
        : null;
    $: sessionComplete = data
        ? validQuestions.length === answerChoices.length
        : false;
    $: if (sessionComplete) {
        examMode = false;
    }
    // editorconfig-checker-enable
    $: currentQuestionId = data ? data.session.current_question_id : null;

    // Whenever the current question gets changed, we want to update
    // the session to remember the current question.
    $: currentQuestionId, updateSession();

    $: currentQuestionAnswered = data ? !!answerChoice : false;

    $: if (currentQuestionId) {
        // Current question changed, update the question context
        currentQuestionContext = updateCurrentQuestionContext();
    }

    // The question context is a helper object that holds the
    // current state of the question:
    //
    // - Is the question answered and should we reveal all
    //   answers etc.? (isAnswered)
    // - Which answers are correct, submitted or selected?
    //   (answerContext)
    //
    // The context is updated whenever the current question
    // changes or when the user resets their answer.
    function updateCurrentQuestionContext() {
        const context = {
            // If the current question is answered already, we
            // can reveal answers, hints and comments right away
            isAnswered: !!currentQuestionAnswered,

            answerContext: currentQuestion.answers.reduce((acc, obj) => {
                acc[obj.id] = {
                    isCorrectAnswer: obj.id === currentQuestion.correct_answer_id,
                    isSubmittedAnswer: answerChoice ? obj.id === answerChoice.answer_id : false,
                    isSelectedAnswer: answerChoice ? obj.id === answerChoice.answer_id : false,
                };
                return acc;
            }, {}),
        };

        return context;
    }

    // Whenever the number of questions or the given answers change,
    // recalculate the progress of the user in percent
    // editorconfig-checker-disable
    $: progressPercentage = data
        ? sessionProgressPercentage(
              validQuestions.length,
              answerChoices
          )
        : null;

    $: numberQuestions = data ? data.deck.questions.length : 0;
    $: indexCurrentQuestion = data
        ? data.deck.questions.findIndex(
              (q) => q.id == data.session.current_question_id
          ) + 1
        : null;
    // editorconfig-checker-enable

    var previousProgressPercentageCorrect = -1;

    // When the user reaches 60%, we want to show a success message
    // (TODO), but it should be shown only once per session, hence
    // we have to also track the previous value
    $: progressPercentage,
        (() => {
            if (!progressPercentage) {
                return;
            }
            var progressPercentageCorrect = progressPercentage.correct;
            if (progressPercentageCorrect < 60) {
                previousProgressPercentageCorrect = progressPercentageCorrect;
                return;
            }
            if (previousProgressPercentageCorrect === -1) {
                previousProgressPercentageCorrect = progressPercentageCorrect;
                return;
            }
            if (previousProgressPercentageCorrect < 60) {
                previousProgressPercentageCorrect = progressPercentageCorrect;

                axios
                    .get('/api/magic-gif')
                    .then(function (response) {
                        magicGIFPath = 'magic-gifs/' + response.data.id;
                    })
                    .catch(function (error) {
                        // Ignore errors
                    });
            }
        })();

    onMount(() => {
        axios
            .get("/api/sessions/" + id)
            .then(function (response) {
                data = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function updateCurrentQuestionData() {
        return axios
            .get("/api/questions/" + currentQuestion.id)
            .then(function (response) {
                var currentQuestionIndex =
                    data.deck.questions.findIndex((q) => q.id === currentQuestion.id);
                var questionData = response.data;
                data.deck.questions[currentQuestionIndex] =
                    questionData;
                updateQuestionAnswerChoice(questionData);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function updateQuestionAnswerChoice(question) {
        if (question.type === "card") {
            // Questions of type 'card' don't need to be updated, since
            // there is no right or wrong answer. The "answer choice"
            // merely is a flag to know if the user wishes to see the
            // question again or if they learned the card already.
            return;
        }
        var answerChoiceIndex = data.session.answer_choices.findIndex(
            (a) => a.question_id === question.id
        );
        if (answerChoiceIndex === -1) {
            // This question has no answer yet - no need to check if the
            // answer is still correct
            return;
        }
        data.session.answer_choices[answerChoiceIndex].is_correct =
            data.session.answer_choices[answerChoiceIndex].answer_id ===
            question.correct_answer_id;
    }

    var debounced;

    function updateSession() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                axios
                    .put("/api/sessions/" + data.session.id, data.session)
                    .then(function (response) {})
                    .catch(function (error) {
                        alert(error);
                    });
            },
            1000,
            { maxWait: 2000 }
        );

        debounced();
    }

    function submitAnswer(answerId) {
        if (answerId) {
            // Mark clicked answer as selected for it to reveal
            // its status and render accordingly
            currentQuestionContext.answerContext[answerId].isSelectedAnswer = true;
        } else {
            // If no answer ID is given, the user clicked the
            // "show answer" button or it's a card question,
            // so we want to reveal all answers
            currentQuestionContext.isAnswered = true;
        }

        if (currentQuestionAnswered && answerId && answerId === currentQuestion.correct_answer_id) {
            // The user already answered the question and now clicked
            // the correct answer, reveal all answers
            currentQuestionContext.isAnswered = true;
            return;
        } else if (currentQuestionAnswered) {
            // The user already answered the question and now clicked
            // another wrong answer, let them try again
            return;
        }

        // No answer was submitted yet, submit given answer

        var isCorrect = false;
        if (currentQuestion.type === "card") {
            // This is a bit of a hack..
            // If we don't get an answerId, count it as "wrong"
            // If we do get an answerId, count it as "correct"
            //
            // This way we can store results for 'card' questions
            // without special code and without the need for a more
            // complex data model.
            isCorrect = !!answerId;
        } else {
            isCorrect = currentQuestion.correct_answer_id === answerId;
        }

        var answerChoice = {
            question_id: currentQuestionId,
            answer_id: answerId,
            is_correct: isCorrect,
            help_used: helpUsed,
        };

        axios
            .post("/api/sessions/" + id + "/answerchoices", answerChoice)
            .then(function (response) {
                data.session.answer_choices = [
                    ...data.session.answer_choices,
                    response.data,
                ];


                if (isCorrect || examMode || !settingsMultipleAnswerTries) {
                    // With the correct answer or with exam mode enabled
                    // or if the user has disabled multiple answer tries,
                    // the question is considered answered and we want to
                    // reveal all answers etc.
                    currentQuestionContext.isAnswered = true;
                }

                if (answerId) {
                    // Update context of selected answer
                    currentQuestionContext.answerContext[answerId].isSubmittedAnswer = true;
                    currentQuestionContext.answerContext[answerId].isCorrectAnswer = isCorrect;
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function deleteAnswer() {
        if (!currentQuestionAnswered) {
            return;
        }

        answerChoice = data.session.answer_choices.find(e => e.question_id === currentQuestionId);
        if (!answerChoice) {
            return;
        }

        axios
            .delete("/api/sessions/" + id + "/answerchoices/" + answerChoice.id)
            .then(function (response) {
                data.session.answer_choices = [...data.session.answer_choices.filter(e => e.question_id !== currentQuestionId)];

                // Await the next tick to ensure the answer choice is deleted
                // before we update the current question context
                tick().then(() => {
                    currentQuestionContext = updateCurrentQuestionContext();
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if data}
    <div class="row">
        <div class="col mb-1">
            <p class="text-overflow">
                <button
                    class="btn btn-sm d-none d-sm-none d-md-none d-lg-inline"
                    class:bg-light={!settingsShowSidebar}
                    class:bg-dark-subtle={settingsShowSidebar}
                    title="Toggle sidebar"
                    on:click|preventDefault={() => {
                        $UserSettings.session_show_sidebar = !$UserSettings.session_show_sidebar;
                    }}>
                    <i class="bi bi-layout-sidebar" />
                </button>
                <button
                    class="btn btn-sm"
                    class:bg-light={!settingsShuffleAnswers}
                    class:bg-dark-subtle={settingsShuffleAnswers}
                    title="Toggle answer shuffling"
                    on:click|preventDefault={() => {
                        $UserSettings.session_shuffle_answers = !$UserSettings.session_shuffle_answers;
                    }}>
                    <i class="bi bi-shuffle" />
                </button>
                <button
                    class="btn btn-sm"
                    class:bg-light={!settingsExamMode}
                    class:bg-dark-subtle={settingsExamMode}
                    title="Toggle exam mode"
                    on:click|preventDefault={() => {
                        $UserSettings.session_exam_mode = !$UserSettings.session_exam_mode;
                    }}>
                    <i class="bi bi-exclamation-square" />
                </button>

                <span class="ms-1 float-end fw-bold font-monospace badge text-dark"
                    class:text-bg-light={!answerChoice || examMode}
                    class:bg-success={!examMode && !currentQuestion.is_invalid && answerChoice && answerChoice.is_correct}
                    class:bg-danger={!examMode && !currentQuestion.is_invalid && answerChoice && !answerChoice.is_correct}>{indexCurrentQuestion}/{numberQuestions}</span>
                <strong>{data.deck.name}</strong>
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col mb-1">
            {#if !examMode && !sessionComplete || !currentQuestionContext.isAnswered}
                <SessionProgressBar
                    bind:progressPercentage />
            {/if}
            {#if sessionComplete && currentQuestionContext.isAnswered}
                <SessionOutro bind:progressPercentage sessionId={data.session.id} />
            {/if}
        </div>
    </div>
    <div class="row mt-3">
        {#if settingsShowSidebar}
            <div class="col-lg-3 d-none d-lg-block">
                <SessionQuestionIndexView bind:data bind:examMode={examMode} />
            </div>
        {/if}
        <div
            class:col-lg-9={settingsShowSidebar}
            class:col-lg-10={!settingsShowSidebar}
            class:offset-lg-1={!settingsShowSidebar}
            class="col-md-12">
            <SessionQuestionNav
                bind:data
                bind:currentQuestionId={data.session.current_question_id}
                bind:currentQuestionContext />
            {#if currentQuestion}
                <SessionQuestionView
                    bind:question={currentQuestion}
                    bind:questionContext={currentQuestionContext}
                    bind:helpUsed
                    bind:answerChoice
                    bind:examMode={examMode}
                    bind:settingsShuffleAnswers
                    {submitAnswer}
                    {deleteAnswer}
                    {updateCurrentQuestionData} />
                {#if !examMode && currentQuestionContext.isAnswered}
                    <Messages bind:questionId={currentQuestion.id} />
                {/if}
            {/if}
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}

{#if !examMode}
    <MagicGifView bind:magicGIFPath />
{/if}

<style>
    .text-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
