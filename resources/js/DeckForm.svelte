<script>
    import { onMount, tick } from "svelte";
    import CaseForm from "./CaseForm.svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import DeckFormIndex from "./DeckFormIndex.svelte";
    import hotkeys from "hotkeys-js";

    export let id;
    export let name;

    let data = {
        cases: [],
        questions: []
    };
    let lastHotkeyTime = 0;

    const HOTKEY_DEBOUNCED_DELAY = 1000;

    $: currentQuestion = data
        ? data.questions.find((q) => q.id === data.current_question_id)
        : null;

    $: currentCase = data
        ? data.cases.find((c) => c.id === data.current_case_id)
        : null;

    onMount(() => {
        hotkeys.filter = function() {
            // Return true to allow the hotkey to trigger even in form elements
            return true;
        };

        hotkeys('alt+Q', function(event) {
            event.preventDefault();
            const now = Date.now();

            if (now - lastHotkeyTime > HOTKEY_DEBOUNCED_DELAY) {
                addNewQuestion('mc');
                lastHotkeyTime = now;
            }
        })

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

                tick().then(() => {
                    const newQuestionInput = document.getElementById("editor-questionText");
                    if (newQuestionInput) {
                        newQuestionInput.focus();
                    }
                });
            })
            .catch(function (error) {
                alert(error);
            });

        window.scrollTo({top: 0, behavior: 'smooth'});
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

                tick().then(() => {
                    const newCaseInput = document.getElementById("editor-case" + response.data.id);
                    if (newCaseInput) {
                        newCaseInput.focus();
                    }
                });
            })
            .catch(function (error) {
                alert(error);
            });

        window.scrollTo({top: 0, behavior: 'smooth'});
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
        <h4 class="text-truncate" title="{name}">
            <a href="/decks/{id}" class="text-reset text-decoration-none">{name}</a>
        </h4>
    </div>
</div>

<div class="sticky-top bg-white mb-3" style="z-index: 20;">
    <div class="row">
        <div class="col d-grid d-sm-block gap-2 py-3">
            <button type="button" class="btn btn-sm btn-primary" title="Add a new MC question (Shortcut: Alt+Q)"
                    on:click={() => { addNewQuestion("mc"); }}>Add MC question</button>
            <button type="button" class="btn btn-sm btn-primary" on:click={() => { addNewQuestion("card"); }}>Add card question</button>
            <button type="button" class="btn btn-sm btn-light" on:click={addNewCase}><i class="bi bi-clipboard2-pulse"></i> Add case</button>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="border-dark" style="border-bottom: dotted; border-width: 1px;">
            </div>
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
