<script>
    import DOMPurify from "dompurify";
    import { onMount } from "svelte";
    import QuestionForm from "./QuestionForm.svelte";

    export let id;
    export let name;

    let questions = [];
    let currentQuestion;

    onMount(() => {
        axios
            .get("/api/decks/" + id + "/questions")
            .then(function (response) {
                questions = response.data;
                if (questions.length > 0) {
                    currentQuestion = questions[questions.length - 1];
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
                questions = [...questions, newQuestion];
                currentQuestion = newQuestion;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleQuestionRemove(questionId) {
        axios
            .delete("/api/decks/" + id + "/questions/" + questionId)
            .then(function (response) {
                questions = questions.filter((q) => q.id !== questionId);
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
        <div
            class="btn-group-vertical btn-group-sm"
            style="width: 100%;"
            role="group"
            aria-label="Vertical button group">
            {#each [...questions].reverse() as question}
                <div class="btn-group" role="group">
                    <span class="btn-index">
                        <button
                            on:click|preventDefault={() => {
                                currentQuestion = question;
                            }}
                            type="button"
                            class="btn btn-light btn-index text-start"
                            ><span class="badge bg-secondary me-1"
                                >ID: {question.id}</span>
                            {DOMPurify.sanitize(question.text).replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                            )}</button>
                    </span>
                    <button
                        type="button"
                        class="btn btn-outline-dark dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li
                            class="dropdown-item"
                            on:click|preventDefault={() => {
                                handleQuestionRemove(question.id);
                            }}>
                            Remove question
                        </li>
                    </ul>
                </div>
            {/each}
        </div>
    </div>
    <div class="col-md-8">
        {#if currentQuestion}
            <div class="mt-2 p-3">
                <QuestionForm bind:question={currentQuestion} />
            </div>
        {/if}
    </div>
</div>

<style>
    .btn-index {
        width: 100%;
        display: block;
        overflow: hidden !important;
        white-space: nowrap;
        text-overflow: ellipsis !important;
    }
</style>
