<script>
    import DOMPurify from 'dompurify';

    export let data;

    $: numberQuestions = data.deck.questions.length;
    $: indexCurrentQuestion = data.deck.questions.findIndex(q => q.id == data.session.current_question_id) + 1;

    $: answerChoiceIndicator = function (question) {
        var answerChoice = data.session.answer_choices.find(e => e.question_id === question.id);
        if (!answerChoice) {
            return '<span class="text-dark fw-bold">&rightarrow;</span>';
        }
        if (question.correct_answer_id === answerChoice.answer_id) {
            return '<span class="text-success fw-bold">&check;</span>';
        } else {
            return '<span class="text-danger fw-bold">&cross;</span>';
        }
    }
</script>

<style>
li:hover {
    cursor: pointer;
}
</style>

<p><strong>{data.deck.name}</strong><br>
{indexCurrentQuestion}/{numberQuestions}</p>

<ul class="list-group ">
    {#each data.deck.questions as question}
        <li on:click={() => data.session.current_question_id = question.id} class="list-group-item list-group-item-action {question.id === data.session.current_question_id ? 'list-group-item-dark' : 'list-group-item-light'}">
            <small>
                {@html answerChoiceIndicator(question)} {DOMPurify.sanitize(question.text).substr(0, 25).replace(/<\/?[^>]+(>|$)/g, "")} ...
            </small>
        </li>
    {:else}
        <li>Loading ...</li>
    {/each}
</ul>
