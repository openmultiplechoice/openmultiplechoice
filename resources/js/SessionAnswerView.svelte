<script>
    import DOMPurify from "dompurify";
    import hotkeys from "hotkeys-js";

    export let answer;
    export let answerContext;
    export let answerNumber;
    export let questionIsAnswered;
    export let submitAnswer;
    export let examMode;
    export let settingsShowAnswerStats;

    var answerStatusIndicator;
    var cancelled;
    var badgeText = answer.badgeText;

    $: {
        hotkeys.unbind(`${badgeText}, ${answerNumber}`, 'questions')
        hotkeys(`${badgeText}, ${answerNumber}`, 'questions', function () {
            submitAnswer(answer.id);
        });
    }

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
    style="min-height: 3rem;"
    class="row border-start border-3 m-1 py-2 d-flex align-items-center {answerStatusIndicator}"
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
            <p class="badge text-dark my-0">{badgeText}</p>
        </div>
    {:else}
        <div class="col-1 border-start-3">
            <p class="badge text-dark my-0">{badgeText}</p>
        </div>
    {/if}

    {#if !questionIsAnswered && !answerContext.isSelectedAnswer}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            on:click={() => submitAnswer(answer.id)}
            class="col-9 cursor-pointer">
            <p class="px-1 my-0">{@html DOMPurify.sanitize(answer.text)}</p>
        </div>
    {:else}
        <div class="col-9">
            <p class="px-1 my-0">{@html DOMPurify.sanitize(answer.text)}</p>
        </div>
    {/if}

    <div class="col-2">
        <div class="row text-end d-flex align-items-center">
            <div class="col">
                {#if questionIsAnswered && !examMode && settingsShowAnswerStats && answer.answer_percentage != null}
                    <span class="badge text-muted" title="Percentage of users who chose this answer">{answer.answer_percentage}%</span>
                {/if}
            </div>
            <div class="col">
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
