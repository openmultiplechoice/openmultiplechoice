<script>
    import DOMPurify from 'dompurify';

    export let answer;
    export let hasAnswer;
    export let submitAnswer;

    var showAnswer = false;

    $: if (hasAnswer) {
        showAnswer = true;
    } else {
        showAnswer = false;
    };

    function toggleShowAnswer() {
        showAnswer = !showAnswer;
    }
</script>

{#if showAnswer}
    <div class="row border-light border-start border-3 m-1 p-2">
        <p class="p-1">{@html DOMPurify.sanitize(answer.text)}</p>
    </div>
    <div class="text-center">
        <button type="button" class="btn btn-danger btn-sm" on:click|preventDefault={() => submitAnswer()} >Not sure yet</button>
        <button type="button" class="btn btn-success btn-sm" on:click|preventDefault={() => submitAnswer(answer.id)} >I got it!</button>
    </div>
{:else}
    <div class="text-center">
        <button type="button" class="btn btn-secondary btn-sm" on:click|preventDefault={toggleShowAnswer} >Show answer</button>
    </div>
{/if}
