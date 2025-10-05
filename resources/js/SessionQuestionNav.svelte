<script>
    import { preventDefault } from 'svelte/legacy';

    import hotkeys from 'hotkeys-js';
    import { onMount } from 'svelte';

    let { data = $bindable(), currentQuestionId, currentQuestionContext } = $props();

    onMount(() => {
        hotkeys('left', 'questions', function (event, handler) {
            handleBack();
        });
        hotkeys('right', 'questions', function (event, handler) {
            handleNext();
        });
        hotkeys.setScope('questions');
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

<div class="row mb-3 pt-1 pb-1 sticky-top bg-white">
    {#if data.session.current_question_id && data.session.current_question_id != data.deck.questions[0].id}
        <div class="col-6">
            <button onclick={preventDefault(handleBack)} class="btn btn-sm btn-light w-100">
                <span class="fw-bold">&leftarrow;</span> Previous</button>
        </div>
    {:else}
        <div class="col-6">
        </div>
    {/if}
    {#if data.session.current_question_id != data.deck.questions[data.deck.questions.length-1].id}
        <div class="col-6">
            <button onclick={preventDefault(handleNext)}
            class="btn btn-sm w-100"
            class:btn-warning={currentQuestionContext.isAnswered}
            class:btn-light={!currentQuestionContext.isAnswered}>
            Next <span class="fw-bold">&rightarrow;</span>
        </button>
        </div>
    {:else}
        <div class="col-6">
        </div>
    {/if}
</div>
