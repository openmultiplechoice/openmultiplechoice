<script>
    import DOMPurify from "dompurify";

    export let answer;
    export let answerContext;
    export let badgeText;
    export let questionIsAnswered;
    export let submitAnswer;
    export let examMode;

    var answerStatusIndicator;
    var cancelled;

    $: if (answer) {
        cancelled = false;
        answerStatusIndicator = "border-secondary";

        if (!examMode) {
            if (questionIsAnswered) {
                if (answerContext.isCorrectAnswer) {
                    answerStatusIndicator = "border-success";
                } else if (answerContext.isSubmittedAnswer) {
                    answerStatusIndicator = "border-danger";
                }
            } else if (answerContext.isSelectedAnswer) {
                answerStatusIndicator = "border-danger";
            }
        }
    }
</script>

<div
    id="answer{answer.id}"
    class="row border-start border-3 m-1 pt-2 {answerStatusIndicator}"
    class:bg-light={
        examMode ||
        (!questionIsAnswered && !answerContext.isSelectedAnswer && !answerContext.isSubmittedAnswer) ||
        (questionIsAnswered && !answerContext.isSubmittedAnswer && !answerContext.isCorrectAnswer)
    }
    class:text-bg-success={!cancelled && !examMode && questionIsAnswered && answerContext.isCorrectAnswer}
    class:text-bg-danger={!cancelled && !examMode && answerContext.isSelectedAnswer && !answerContext.isCorrectAnswer}
    class:bg-cancelled={cancelled}>
    {#if !questionIsAnswered && !answerContext.isSubmittedAnswer}
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

    {#if !questionIsAnswered && !answerContext.isSelectedAnswer}
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

    <div class="col-1 ps-1">
        {#if !questionIsAnswered && !answerContext.isSelectedAnswer}
            <button
                on:click|preventDefault={() => (cancelled = !cancelled)}
                type="button"
                class="btn-close" />
        {:else if !examMode && answerContext.isCorrectAnswer && answerContext.isSubmittedAnswer}
            <span class="text-success-dark fw-bold fs-3">&check;</span>
        {:else if !examMode && answerContext.isCorrectAnswer && !answerContext.isSubmittedAnswer && questionIsAnswered}
            <span class="text-success-dark fw-bold fs-3">&#8672;</span>
        {:else if !examMode && answerContext.isSubmittedAnswer}
            <span class="text-danger-dark fw-bold fs-3">&cross;</span>
        {:else if examMode && answerContext.isSubmittedAnswer}
            <span class="text-secondary fw-bold fs-3">&check;</span>
        {/if}
    </div>
</div>

<div class="row ms-1 mb-2 me-1">
    {#if !examMode && answer.hint && (questionIsAnswered || answerContext.isSelectedAnswer)}
        <div class="col-1 border-3 border-start border-secondary-subtle" />
        <div class="col-11">
            <p class="p-1">{@html DOMPurify.sanitize(answer.hint)}</p>
        </div>
    {/if}
</div>

<style>
    .cursor-pointer:hover {
        cursor: pointer;
    }
</style>
