<script>
    import debounce from 'lodash/debounce';
    import { onMount } from 'svelte';
    import SessionQuestionIndexView from './SessionQuestionIndexView.svelte';
    import SessionQuestionView from './SessionQuestionView.svelte';
    import SessionQuestionNav from './SessionQuestionNav.svelte';

    export let id;

    var data;
    var currentQuestion;
    var currentQuestionId;

    $: answerChoice = data ? data.session.answer_choices.find(e => e.question_id === currentQuestionId) : null;
    $: currentQuestion = data ? data.deck.questions.find(q => q.id === data.session.current_question_id) : null;
    $: currentQuestionId = data ? data.session.current_question_id : -1;
    $: currentQuestionId, updateSession();
    $: currentQuestionAnswered = data ? !!answerChoice : false;

    onMount(() => {
        axios.get('/api/sessions/' + id)
            .then(function (response) {
                data = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });

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
            // A question must not be answered multiple times..
            return;
        }

        var answerChoice = {
            question_id: currentQuestionId,
            answer_id: answerId
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
            {#if currentQuestion}
                <SessionQuestionView bind:question={currentQuestion} bind:answerChoice bind:sessionId={id} submitAnswer={submitAnswer} />
                <div class="mt-3">
                    <button on:click|preventDefault={() => submitAnswer('')} type="button" class="btn btn-link text-muted show-answer">Show answer</button>
                </div>
            {/if}
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
