<script>
    import debounce from 'lodash/debounce';
    import { onMount } from 'svelte';
    import SessionQuestionIndexView from './SessionQuestionIndexView.svelte';
    import SessionQuestionView from './SessionQuestionView.svelte';
    import SessionQuestionNav from './SessionQuestionNav.svelte';
    import Messages from './Messages.svelte';

    export let id;

    var data;

    $: answerChoice = data ? data.session.answer_choices.find(e => e.question_id === currentQuestionId) : null;
    $: currentQuestion = data ? data.deck.questions.find(q => q.id === data.session.current_question_id) : null;
    $: currentQuestionId = data ? data.session.current_question_id : -1;

    // Whenever the current question gets changed, update the question
    // data (it could have been updated on the server side meanwhile)
    // and we want to update the session to remember the current question.
    $: currentQuestionId, updateCurrentQuestionData();
    $: currentQuestionId, updateSession();

    $: currentQuestionAnswered = data ? !!answerChoice : false;

    onMount(() => {
        axios.get('/api/sessions/' + id)
            .then(function (response) {
                data = response.data;
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
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

        debouncedUpdateCurrentQuestionData = debounce(() => {
            axios.get('/api/questions/' + cqid)
                .then(function (response) {
                    var currentQuestionIndex = data.deck.questions.findIndex(q => q.id === cqid);
                    data.deck.questions[currentQuestionIndex] = response.data;
                })
                .catch(function (error) {
                    alert(error);
                });
        }, 500, { 'maxWait': 1000 });

        debouncedUpdateCurrentQuestionData();
    };

    var debounced;

    function updateSession() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(() => {
            axios.put('/api/sessions/' + data.session.id, data.session)
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        }, 1000, { 'maxWait': 2000 });

        debounced();
    }

    function submitAnswer(answerId) {
        if (currentQuestionAnswered) {
            return;
        }

        var is_correct = false;
        if (currentQuestion.type === 'card') {
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
            is_correct: is_correct
        };

        axios.post('/api/sessions/' + id + '/answerchoices', answerChoice)
            .then(function (response) {
                data.session.answer_choices = [...data.session.answer_choices, response.data];
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<style>
button.show-answer {
    text-decoration: none;
}
</style>

{#if data}
    <div class="row">
        <div class="col-lg-3 d-none d-lg-block">
            <SessionQuestionIndexView bind:data />
        </div>
        <div class="col-lg-9 col-md-12">
            <SessionQuestionNav bind:data bind:currentQuestionId={data.session.current_question_id} bind:currentQuestionAnswered />
            {#if currentQuestion }
                <SessionQuestionView bind:question={currentQuestion} bind:answerChoice submitAnswer={submitAnswer} />
                {#if !currentQuestionAnswered}
                    <div class="mt-3">
                        <button on:click|preventDefault={() => submitAnswer('')} type="button" class="btn btn-link text-muted show-answer">Show answer</button>
                    </div>
                {/if}
                <Messages bind:questionId={currentQuestion.id} />
            {/if}
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
