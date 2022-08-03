<script>
    import { onMount } from "svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import DeckFormQuestionIndex from "./DeckFormQuestionIndex.svelte";

    export let id;
    export let name;

    let data = { questions: [] };

    $: currentQuestion = data
        ? data.questions.find((q) => q.id === data.current_question_id)
        : null;

    onMount(() => {
        axios
            .get("/api/decks/" + id + "/questions")
            .then(function (response) {
                data.questions = response.data;
                if (data.questions.length > 0) {
                    data.current_question_id =
                        data.questions[data.questions.length - 1].id;
                }
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function addNewQuestion(type) {
        var newQuestion = {
            id: null,
            text: "",
            type: "mc",
            correct_answer_id: null,
            images: [],
            answers: [],
        };

        axios
            .post("/api/decks/" + id + "/questions", newQuestion)
            .then(function (response) {
                newQuestion.id = response.data.id;
                data.questions = [...data.questions, newQuestion];
                data.current_question_id = newQuestion.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleQuestionRemove(questionId) {
        axios
            .delete("/api/decks/" + id + "/questions/" + questionId)
            .then(function (response) {
                data.questions = data.questions.filter(
                    (q) => q.id !== questionId
                );
                if (data.questions.length > 0) {
                    data.current_question_id =
                        data.questions[data.questions.length - 1].id;
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="row">
    <div class="col">
        <h4>{name}</h4>

        <button on:click={addNewQuestion} class="btn btn-primary"
            >Add question</button>

        <hr />
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <DeckFormQuestionIndex bind:data {handleQuestionRemove} />
        <div
            class="btn-group-vertical btn-group-sm"
            style="width: 100%;"
            role="group"
            aria-label="Vertical button group" />
    </div>
    <div class="col-md-8">
        {#if currentQuestion}
            <div class="mt-2 p-3">
                <QuestionForm bind:question={currentQuestion} />
            </div>
        {/if}
    </div>
</div>
