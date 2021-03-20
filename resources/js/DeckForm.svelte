<script>
    import { onMount } from 'svelte';
    import QuestionForm from './QuestionForm.svelte';

    export let id;
    export let name;

    let questions = [];

    onMount(() => {
        axios.get('/api/decks/' + id + '/questions')
            .then(function (response) {
                questions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function newQuestionObj() {
        return {
            id: null,
            text: "",
            correct_answer_id: null,
            images: [],
            answers: []
        };
    }

    function addNewQuestion() {
        var newQuestion = newQuestionObj();

        axios.post('/api/decks/' + id + '/questions', newQuestion)
            .then(function (response) {
                newQuestion.id = response.data.id;
                questions = [...questions, newQuestion];
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleQuestionRemove(questionId) {
        axios.delete('/api/decks/' + id + '/questions/' + questionId)
            .then(function (response) {
                questions = questions.filter(q => q.id !== questionId);
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<h4>{name}</h4>

<button on:click={addNewQuestion} class="btn btn-primary">Add question</button>

{#each [...questions].reverse() as question, i}
    <div class="mt-2 p-3 { i % 2 == 0 ? 'border bg-light' : '' }">
        <div class="text-end">
            <button on:click|preventDefault={() => { handleQuestionRemove(question.id) }} type="button" class="btn btn-outline-danger btn-sm">Remove question</button>
        </div>
        <QuestionForm bind:question={question} />
    </div>
{/each}
