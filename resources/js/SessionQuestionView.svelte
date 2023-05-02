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
    export let examMode;

    var showEditor = false;
    var showHint = questionAnswered;

    $: question,
        (() => {
            showHint = questionAnswered;
            helpUsed = questionAnswered;
        })();

    // For all list elements in the question text, add an event handler
    // to toggle the background color. This is helpful for multiple
    // choice questions where users have to choose under a variety of
    // answer options.
    $: question, (() => {
        var listItems = document.querySelectorAll("#questionText li");
        [].map.call(listItems, function(item) {
            item.addEventListener('click', toggleListItemColor, false);
        });
    })();

    // Toogle none -> red -> yellow -> green -> none
    function toggleListItemColor(event) {
        const li = event.target;
        if (!li.classList.contains('bg-danger-subtle') &&
            !li.classList.contains('bg-warning-subtle') &&
            !li.classList.contains('bg-success-subtle')) {

            li.classList.add('bg-success-subtle');
        } else if (li.classList.contains('bg-success-subtle')) {
            li.classList.remove('bg-success-subtle');
            li.classList.add('bg-danger-subtle');
        } else if (li.classList.contains('bg-danger-subtle')) {
            li.classList.remove('bg-danger-subtle');
            li.classList.add('bg-warning-subtle');
        } else if (li.classList.contains('bg-warning-subtle')) {
            li.classList.remove('bg-warning-subtle');
        }
    }

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
                        <p id="questionText">{@html DOMPurify.sanitize(question.text)}</p>
                    </div>
                {/if}
                {#if question.images && question.images.length > 0}
                    <SessionImageView bind:images={question.images} />
                {/if}
            </div>
            {#if !examMode && question.hint}
                {#if showHint}
                    <div
                        class="row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3">
                        <p>{@html DOMPurify.sanitize(question.hint)}</p>
                    </div>
                {:else}
                    <button
                        on:click|preventDefault={() => {
                            showHint = true;
                            helpUsed = true;
                        }}
                        type="button"
                        class="btn btn-outline-secondary btn-sm mb-3"
                        >Show hint</button>
                {/if}
            {/if}
            {#if question.type === "mc"}
                {#each question.answers as answer, index}
                    <SessionAnswerView
                        bind:answer
                        bind:answerChoice
                        bind:examMode={examMode}
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
            {#if !examMode && questionAnswered && question.comment}
                <div class="row">
                    <div class="col">
                        <div class="alert alert-light" role="alert">
                            {question.comment}
                        </div>
                    </div>
                </div>
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
                        ><i class="bi bi-pencil" /> Edit</button>
                    <a class="btn btn-sm btn-outline-secondary ms-1" href="/questions/{question.id}" target="_blank" role="button">Link <i class="bi bi-box-arrow-up-right"/></a>
                </div>
            </div>
        </div>
    {/if}

    {#if !questionAnswered && !examMode}
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
