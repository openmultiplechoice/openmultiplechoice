<script>
    import DOMPurify from "dompurify";

    export let answer;
    export let badgeText;
    export let hasAnswer;
    export let isChosenAnswer;
    export let isCorrectAnswer;
    export let submitAnswer;
    export let examMode;

    var answerStatusIndicator;
    var cancelled;

    $: if (answer) {
        cancelled = false;
        answerStatusIndicator = "border-secondary";

        if (!examMode && hasAnswer) {
            if (isCorrectAnswer) {
                answerStatusIndicator = "border-success";
            } else if (isChosenAnswer) {
                answerStatusIndicator = "border-danger";
            }
        }
    }
</script>

<div
    id="answer{answer.id}"
    class="row border-start border-3 m-1 pt-2 {answerStatusIndicator}"
    class:bg-light={!cancelled}
    class:bg-correct={!cancelled && !examMode && hasAnswer && isCorrectAnswer}
    class:bg-incorrect={!cancelled && !examMode && hasAnswer && !isCorrectAnswer && isChosenAnswer}
    class:bg-cancelled={cancelled}>
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

    <div class="col-1 ps-1">
        {#if !hasAnswer}
            <button
                on:click|preventDefault={() => (cancelled = !cancelled)}
                type="button"
                class="btn-close" />
        {:else if !examMode && isCorrectAnswer && isChosenAnswer}
            <span class="text-success fw-bold fs-3">&check;</span>
        {:else if !examMode && isCorrectAnswer && !isChosenAnswer}
            <span class="text-success fw-bold fs-3">&#8672;</span>
        {:else if !examMode && isChosenAnswer}
            <span class="text-danger fw-bold fs-3">&cross;</span>
        {:else if examMode && isChosenAnswer}
            <span class="text-secondary fw-bold fs-3">&cross;</span>
        {/if}
    </div>
</div>

<div class="row ms-1 mb-2 me-1">
    {#if !examMode && hasAnswer && answer.hint}
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
    .bg-cancelled {
        color: #495057 !important;
        background: #f8d7da !important;
    }
    .bg-correct {
        background-color: #d4edda !important;
    }
    .bg-incorrect {
        background-color: #f8d7da !important;
    }
</style>
