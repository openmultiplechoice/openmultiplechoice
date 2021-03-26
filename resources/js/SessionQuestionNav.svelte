<script>
    import hotkeys from 'hotkeys-js';
    import { onMount } from 'svelte';

    export let data;
    export let currentQuestionId;
    export let currentQuestionAnswered;

    onMount(() => {
        hotkeys('left', function (event, handler) {
            handleBack();
        });
        hotkeys('right', function (event, handler) {
            handleNext();
        });
    });

    function questionIndex(id) {
        return data.deck.questions.findIndex(element => element.id === id);
    }

    function handleBack() {
        var currentQuestionIdx = questionIndex(currentQuestionId);
        var next = data.deck.questions[currentQuestionIdx-1];
        if (!next) {
            return;
        }
        data.session.current_question_id = next.id;
    }

    function handleNext() {
        var currentQuestionIdx = questionIndex(currentQuestionId);
        var next = data.deck.questions[currentQuestionIdx+1];
        if (!next) {
            return;
        }
        data.session.current_question_id = next.id;
    }
</script>

<div class="row mb-3">
    {#if data.session.current_question_id && data.session.current_question_id != data.deck.questions[0].id }
        <div class="col-6">
            <button on:click|preventDefault={handleBack} class="btn btn-sm btn-light w-100"><span class="fw-bold">&leftarrow;</span> Previous</button>
        </div>
    {:else}
        <div class="col-6">
        </div>
    {/if}
    {#if data.session.current_question_id != data.deck.questions[data.deck.questions.length-1].id }
        <div class="col-6">
            <button on:click|preventDefault={handleNext} class="btn btn-sm {currentQuestionAnswered ? 'btn-success' : 'btn-light'} w-100">Next <span class="fw-bold">&rightarrow;</span></button>
        </div>
    {:else}
        <div class="col-6">
        </div>
    {/if}
</div>
