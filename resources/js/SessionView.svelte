<script>
    import debounce from "lodash/debounce";

    import { onMount } from "svelte";

    import SessionQuestionIndexView from "./SessionQuestionIndexView.svelte";
    import SessionQuestionView from "./SessionQuestionView.svelte";
    import SessionQuestionNav from "./SessionQuestionNav.svelte";
    import SessionProgressBar from "./SessionProgressBar.svelte";
    import Messages from "./Messages.svelte";
    import { sessionProgressPercentage } from "./StatsHelper.js";
    import { UserSettings } from "./UserSettingsStore.js";
    import MagicGifView from "./MagicGIFView.svelte";

    export let id;

    var data;
    var helpUsed = false;
    var magicGIFPath = '';

    $: examMode = !sessionComplete ? $UserSettings.session_exam_mode : false;
    $: showSidebar = $UserSettings.session_show_sidebar;

    $: showSidebar,
        (()=> {
            axios
                .put("/api/users/me/settings", {
                    session_show_sidebar: showSidebar
                })
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        })();

    // editorconfig-checker-disable
    $: answerChoice = data
        ? data.session.answer_choices.find(
              (e) => e.question_id === currentQuestionId
          )
        : null;
    $: currentQuestion = data
        ? data.deck.questions.find(
              (q) => q.id === data.session.current_question_id
          )
        : null;
    $: sessionComplete = data
        ? data.deck.questions.length === data.session.answer_choices.length
        : false;
    $: if (sessionComplete) {
        examMode = false;
    }
    // editorconfig-checker-enable
    $: currentQuestionId = data ? data.session.current_question_id : -1;

    // Whenever the current question gets changed, update the question
    // data (it could have been updated on the server side meanwhile)
    // and we want to update the session to remember the current question.
    $: currentQuestionId, updateCurrentQuestionData();
    $: currentQuestionId, updateSession();

    $: currentQuestionAnswered = data ? !!answerChoice : false;

    // Whenever the number of questions or the given answers change,
    // recalculate the progress of the user in percent
    // editorconfig-checker-disable
    $: progressPercentage = data
        ? sessionProgressPercentage(
              data.deck.questions.length,
              data.session.answer_choices
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

                console.debug("progressPercentag", progressPercentage);

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

    var debouncedUpdateCurrentQuestionData;

    function updateCurrentQuestionData() {
        if (debouncedUpdateCurrentQuestionData) {
            debouncedUpdateCurrentQuestionData.cancel();
        }

        // Avoid race condition by checking if currentQuestion
        // is set right now (user could be switching questions
        // simultaneously)
        if (!currentQuestion) {
            return;
        }

        // Avoid race condition in the debounced function
        // by storing the currentQuestion.id in a private
        // variable
        var cqid = currentQuestion.id;

        debouncedUpdateCurrentQuestionData = debounce(
            () => {
                axios
                    .get("/api/questions/" + cqid)
                    .then(function (response) {
                        var currentQuestionIndex =
                            data.deck.questions.findIndex((q) => q.id === cqid);
                        var questionData = response.data;
                        data.deck.questions[currentQuestionIndex] =
                            questionData;
                        updateQuestionAnswerChoice(questionData);
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            },
            500,
            { maxWait: 1000 }
        );

        debouncedUpdateCurrentQuestionData();
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
        if (currentQuestionAnswered) {
            return;
        }

        var is_correct = false;
        if (currentQuestion.type === "card") {
            // This is a bit of a hack..
            // If we don't get an answerId, count it as "wrong"
            // If we do get an answerId, count it as "correct"
            //
            // This way we can store results for 'card' questions
            // without special code and without the need for a more
            // complex data model.
            is_correct = !!answerId;
        } else {
            is_correct = currentQuestion.correct_answer_id === answerId;
        }

        var answerChoice = {
            question_id: currentQuestionId,
            answer_id: answerId,
            is_correct: is_correct,
            help_used: helpUsed,
        };

        axios
            .post("/api/sessions/" + id + "/answerchoices", answerChoice)
            .then(function (response) {
                data.session.answer_choices = [
                    ...data.session.answer_choices,
                    response.data,
                ];
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if data}
    <div class="row">
        <div class="col mb-1">
            {#if !showSidebar}
                <p class="text-overflow mb-1">
                    <button
                        class="btn btn-small btn-light"
                        on:click|preventDefault={() => {
                            $UserSettings.session_show_sidebar = true;
                        }}><i class="bi bi-layout-sidebar" /></button>
                    <strong>{data.deck.name}</strong>
                    {indexCurrentQuestion}/{numberQuestions}
                </p>
            {/if}
            {#if !examMode}
                <SessionProgressBar
                    bind:answerChoices={data.session.answer_choices}
                    bind:questions={data.deck.questions} />
            {/if}
        </div>
    </div>
    <div class="row">
        {#if showSidebar}
            <div class="col-lg-3 d-none d-lg-block">
                <button
                    class="btn btn-small btn-light float-end"
                    on:click|preventDefault={() => {
                        $UserSettings.session_show_sidebar = false;
                    }}><i class="bi bi-arrow-left-square" /></button>
                <p class="text-overflow">
                    <strong>{data.deck.name}</strong><br />
                    {indexCurrentQuestion}/{numberQuestions}
                </p>
                <SessionQuestionIndexView bind:data bind:examMode={examMode} />
            </div>
        {/if}
        <div
            class:col-lg-9={showSidebar}
            class:col-lg-10={!showSidebar}
            class:offset-lg-1={!showSidebar}
            class="col-md-12">
            <SessionQuestionNav
                bind:data
                bind:currentQuestionId={data.session.current_question_id}
                bind:currentQuestionAnswered />
            {#if currentQuestion}
                <SessionQuestionView
                    bind:question={currentQuestion}
                    bind:questionAnswered={currentQuestionAnswered}
                    bind:helpUsed
                    bind:answerChoice
                    bind:examMode={examMode}
                    {submitAnswer} />
                {#if !examMode && currentQuestionAnswered}
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
