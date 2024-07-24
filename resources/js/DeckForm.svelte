<script>
    import { onMount } from "svelte";
    import CaseForm from "./CaseForm.svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import DeckFormIndex from "./DeckFormIndex.svelte";

    export let id;
    export let name;

    let data = {
        cases: [],
        questions: []
    };

    $: currentQuestion = data
        ? data.questions.find((q) => q.id === data.current_question_id)
        : null;

    $: currentCase = data
        ? data.cases.find((c) => c.id === data.current_case_id)
        : null;

    onMount(() => {
        axios
            .get("/api/decks/" + id)
            .then(function (response) {
                data = response.data;

                const questionId = getQuestionIdParam();
                if (questionId && data.questions.some(q => q.id === parseInt(questionId))) {
                    data.current_question_id = parseInt(questionId);
                } else if (data.questions.length > 0) {
                    data.current_question_id =
                        data.questions[data.questions.length - 1].id;
                }
            })
            .catch(function (error) {
                alert(error);
            });
    });

    function getQuestionIdParam() {
        return new URLSearchParams(window.location.search).get("question_id");
    }

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

    function addNewCase() {
        var newCase = {
            deck_id: id,
        };

        axios
            .post("/api/cases", newCase)
            .then(function (response) {
                data.cases = [...data.cases, response.data];
                data.current_case_id = response.data.id;
                data.current_question_id = null;
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

    function handleCaseRemove(caseId) {
        axios
            .delete("/api/decks/" + id + "/cases/" + caseId)
            .then(function (response) {
                data.cases = data.cases.filter(
                    (c) => c.id !== caseId
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
        <h4><a href="/decks/{id}" class="text-reset text-decoration-none">{name}</a></h4>
    </div>
</div>

<div class="row">
    <div class="col d-grid d-sm-block gap-2">
        <button type="button" class="btn btn-sm btn-primary" on:click={() => { addNewQuestion("mc"); }}>Add MC question</button>
        <button type="button" class="btn btn-sm btn-primary" on:click={() => { addNewQuestion("card"); }}>Add card question</button>
        <button type="button" class="btn btn-sm btn-light" on:click={addNewCase}><i class="bi bi-clipboard2-pulse"></i> Add case</button>
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
        <DeckFormIndex bind:data />
    </div>
    <div class="col-md-8">
        {#if currentQuestion}
            <QuestionForm
                bind:question={currentQuestion}
                bind:cases={data.cases}
                showConfigEditor=true
                showCaseSelector=true
                {handleQuestionRemove} />
        {/if}
        {#if currentCase}
            <CaseForm
                bind:kase={currentCase}
                bind:cases={data.cases}
                {handleCaseRemove} />
        {/if}
    </div>
</div>
