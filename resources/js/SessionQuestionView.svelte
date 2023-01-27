<script>
    import DOMPurify from "dompurify";

    import SessionAnswerView from "./SessionAnswerView.svelte";
    import SessionCardAnswerView from "./SessionCardAnswerView.svelte";
    import SessionImageView from "./SessionImageView.svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import AddToDeckDialog from "./AddToDeckDialog.svelte";

    export let question;
    export let questionAnswered;
    export let helpUsed;
    export let answerChoice;
    export let submitAnswer;

    var showEditor = false;
    var showHint = questionAnswered;

    $: question,
        (() => {
            showHint = questionAnswered;
            helpUsed = questionAnswered;
        })();

    function toggleEditor() {
        showEditor = !showEditor;
    }
</script>

{#if question}
    {#if showEditor}
        <QuestionForm bind:question {toggleEditor} />
    {:else}
        <div id="question{question.id}">
            <div class="row border-start border-3 border-dark m-1 mb-3 pt-2">
                {#if question.text}
                    <div class="col-lg">
                        <p>{@html DOMPurify.sanitize(question.text)}</p>
                    </div>
                {/if}
                {#if question.images && question.images.length > 0}
                    <SessionImageView bind:images={question.images} />
                {/if}
            </div>
            {#if question.hint}
                {#if showHint}
                    <div
                        class="row border-start border-3 border-info m-1 mt-3 mb-3">
                        <p>{@html DOMPurify.sanitize(question.hint)}</p>
                    </div>
                {:else}
                    <button
                        on:click|preventDefault={() => {
                            showHint = true;
                            helpUsed = true;
                        }}
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        >Show hint</button>
                {/if}
            {/if}
            {#if question.type === "mc"}
                {#each question.answers as answer, index}
                    <SessionAnswerView
                        bind:answer
                        bind:answerChoice
                        {submitAnswer}
                        badgeText={"ABCDEFGHIJKLMN".charAt(index)}
                        isCorrectAnswer={question.correct_answer_id ===
                            answer.id}
                        hasAnswer={!!answerChoice}
                        isChosenAnswer={answerChoice &&
                            answerChoice.answer_id === answer.id} />
                {/each}
            {:else}
                <SessionCardAnswerView
                    bind:answer={question.answers[0]}
                    {submitAnswer}
                    hasAnswer={!!answerChoice} />
            {/if}
            <div class="row mt-1 mb-1 pt-2">
                <div class="d-flex justify-content-end">
                    {#key question.id}
                        <AddToDeckDialog questionId={question.id} />
                    {/key}
                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm ms-1"
                        on:click|preventDefault={toggleEditor}
                        ><i class="bi bi-pencil" /> Edit question</button>
                </div>
            </div>
        </div>
    {/if}

    {#if !questionAnswered}
        <div class="mt-3">
            <button
                on:click|preventDefault={() => submitAnswer("")}
                type="button"
                class="btn btn-outline-secondary btn-sm">Show answer</button>
        </div>
    {/if}
{:else}
    <p>Loading ...</p>
{/if}
