<script>
    import QuestionForm from './QuestionForm.svelte';
    import SessionAnswerView from './SessionAnswerView.svelte';

    export let question;
    export let answerChoice;
    export let submitAnswer;
</script>

<div id="question{question.id}">
    <div class="row border-start border-3 border-dark m-1 mb-3 pt-2">
        <div class="col">
            <p>{question.text}</p>
        </div>
    </div>
    {#each question.answers as answer, index}
        <SessionAnswerView bind:answer bind:answerChoice submitAnswer={submitAnswer} badgeText={'ABCDEFGHIJKLMN'.charAt(index)} isCorrectAnswer={question.correct_answer_id === answer.id} hasAnswer={!!answerChoice} isChosenAnswer={answerChoice && answerChoice.answer_id === answer.id} />
    {/each}
</div>
