<script>
    import { onMount } from "svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import DeckFormQuestionIndex from "./DeckFormQuestionIndex.svelte";

    export let id;
    export let name;
    export let moduleId;

    var modules = [];

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

        axios
            .get("/api/modules")
            .then(function (response) {
                modules = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function addNewQuestion(type) {
        var newQuestion = {
            id: null,
            text: "",
            type: type ? type : "mc",
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

    function updateModule(newModuleId) {
        var update = {
            module_id: newModuleId,
        };

        axios
            .put("/api/decks/" + id, update)
            .then(function (response) {
                moduleId = newModuleId;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="row">
    <div class="col">
        <h4>{name}</h4>
    </div>
</div>

<div class="row">
    <div class="col">
        <button type="button" class="btn btn-sm btn-primary" on:click={() => { addNewQuestion("mc"); }}>Add MC question</button>
        <button type="button" class="btn btn-sm btn-primary" on:click={() => { addNewQuestion("card"); }}>Add card question</button>
    </div>

    <div class="col">
        <select
            bind:value={moduleId}
            on:change={() => updateModule(moduleId)}
            class="form-select">
            <option value="" disabled>Select module ...</option>
            {#each modules as module (module.id)}
                <option value={module.id.toString()}>{module.name}</option>>
            {/each}
        </select>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="mt-3 mb-3 border-dark" style="border-bottom: dotted; border-width: 1px;">
        </div>
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
