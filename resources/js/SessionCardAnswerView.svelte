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
    {#if !hasAnswer}
        <div class="row">
            <div class="col-md-6 mb-1">
                <button type="button" class="btn btn-danger btn-sm w-100" on:click|preventDefault={() => submitAnswer()} >Ask me again</button>
            </div>
            <div class="col-md-6 mb-1">
                <button type="button" class="btn btn-success btn-sm w-100" on:click|preventDefault={() => submitAnswer(answer.id)} >I got it!</button>
            </div>
        </div>
    {/if}
{:else}
    <div class="row">
        <div class="col-md">
            <button type="button" class="btn btn-warning btn-sm w-100" on:click|preventDefault={toggleShowAnswer} >Show answer</button>
        </div>
    </div>
{/if}
