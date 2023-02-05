<script>
    import DOMPurify from "dompurify";

    export let answer;
    export let badgeText;
    export let hasAnswer;
    export let isChosenAnswer;
    export let isCorrectAnswer;
    export let submitAnswer;

    var answerCancelledIndicator;
    var answerStatusIndicator;
    var cancelled;

    $: if (answer) {
        cancelled = false;
        answerStatusIndicator = "border-light";

        if (hasAnswer) {
            if (isCorrectAnswer) {
                answerStatusIndicator = "border-success bg-answer";
            } else if (isChosenAnswer) {
                answerStatusIndicator = "border-danger bg-answer";
            }
        }
    }

    $: if (cancelled) {
        answerCancelledIndicator = "bg-cancelled-answer";
    } else {
        answerCancelledIndicator = "";
    }
</script>

<div
    id="answer{answer.id}"
    class="row border-start border-3 {answerStatusIndicator} {answerCancelledIndicator} m-1 pt-2 {hasAnswer
        ? ''
        : 'bg-light-hover'}">
    {#if !hasAnswer}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            on:click={() => submitAnswer(answer.id)}
            class="col-1 border-start-3 cursor-pointer">
            <p class="badge text-dark">{badgeText}</p>
        </div>
    {:else}
        <div class="col-1 border-start-3">
            <p class="badge text-dark">{badgeText}</p>
        </div>
    {/if}

    {#if !hasAnswer}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            on:click={() => submitAnswer(answer.id)}
            class="col-10 cursor-pointer">
            <p class="p-1">{@html DOMPurify.sanitize(answer.text)}</p>
        </div>
    {:else}
        <div class="col-10">
            <p class="p-1">{@html DOMPurify.sanitize(answer.text)}</p>
        </div>
    {/if}

    <div class="col-1">
        {#if !hasAnswer}
            <button
                on:click|preventDefault={() => (cancelled = !cancelled)}
                type="button"
                class="btn-close" />
        {:else if isCorrectAnswer && isChosenAnswer}
            <span class="text-success fw-bold fs-3">&check;</span>
        {:else if isChosenAnswer}
            <span class="text-danger fw-bold fs-3">&cross;</span>
        {/if}
    </div>
</div>

<div class="row ms-1 mb-2 me-1">
    {#if hasAnswer && answer.hint}
        <div class="col-10 offset-sm-1 border-3 border-start border-info">
            <p class="p-1">{@html DOMPurify.sanitize(answer.hint)}</p>
        </div>
    {/if}
</div>

<style>
    .bg-answer {
        background: #f8f9fa;
    }
    .cursor-pointer:hover {
        cursor: pointer;
    }
    .bg-light-hover:hover {
        background: #f8f9fa;
    }
    .bg-cancelled-answer {
        color: #495057 !important;
        background: #f8d7da !important;
    }
</style>
