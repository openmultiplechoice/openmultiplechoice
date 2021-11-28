<script>
    import DOMPurify from 'dompurify';

    import SessionAnswerView from './SessionAnswerView.svelte';
    import SessionCardAnswerView from './SessionCardAnswerView.svelte';
    import SessionImageView from './SessionImageView.svelte';
    import QuestionForm from './QuestionForm.svelte';

    export let question;
    export let answerChoice;
    export let submitAnswer;

    var showEditor = false;

    function toggleEditor() {
        showEditor = !showEditor;
    }
</script>

{#if question}
    {#if showEditor}
        <div class="row m-1 pt-2">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary btn-sm" on:click|preventDefault={toggleEditor}>Close editor</button>
            </div>
        </div>
        <QuestionForm bind:question={question} />
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
                <div class="row border-start border-3 border-info m-1 mt-3 mb-3">
                    <p>{@html DOMPurify.sanitize(question.hint)}</p>
                </div>
            {/if}
            {#if question.type === 'mc'}
                {#each question.answers as answer, index}
                    <SessionAnswerView bind:answer bind:answerChoice submitAnswer={submitAnswer} badgeText={'ABCDEFGHIJKLMN'.charAt(index)} isCorrectAnswer={question.correct_answer_id === answer.id} hasAnswer={!!answerChoice} isChosenAnswer={answerChoice && answerChoice.answer_id === answer.id} />
                {/each}
            {:else}
                <SessionCardAnswerView bind:answer={question.answers[0]} submitAnswer={submitAnswer} hasAnswer={!!answerChoice} />
            {/if}
            <div class="row m-1 pt-2">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-secondary btn-sm" on:click|preventDefault={toggleEditor}>Edit question</button>
                </div>
            </div>
        </div>
    {/if}
{:else}
    <p>Loading ...</p>
{/if}
