<script>
    import _ from 'lodash';
    import debounce from "lodash/debounce";
    import DOMPurify from "dompurify";

    import AnswerForm from "./AnswerForm.svelte";

    export let question;
    export let cases;
    export let toggleEditor;
    export let handleQuestionRemove;
    // For inline editing from the session or question
    // view, we don't want to show all config options
    export let showConfigEditor = false;
    export let showCaseSelector = false;

    let editorQuestion;
    let editorComment;
    let editorHint;
    let selectedCase;

    let savingStatus = "";

    $: correctAnswerId = question.correct_answer_id;
    $: if (editorQuestion) {
        configureEditorEventListener(editorQuestion);
    }
    $: if (editorComment) {
        configureEditorEventListener(editorComment);
    }
    $: if (editorHint) {
        configureEditorEventListener(editorHint);
    }

    $: if (question.case) {
        selectedCase = question.case.id;
    } else {
        selectedCase = "";
    }

    function configureEditorEventListener(editor) {
        editor.addEventListener("trix-change", function () {
            question.text = document.getElementById("questionText").value;
            question.comment = document.getElementById("questionComment").value;
            question.hint = document.getElementById("questionHint").value;
            savingStatus = '<p class="text-end">Saving ...</p>';
            handleChange();
        });

        editor.toolbarElement.style.display = "none";

        editor.addEventListener("trix-focus", function(event) {
            event.target.toolbarElement.style.display = "block";
        });
        editor.addEventListener("trix-blur", function(event) {
            // Don't hide the toolbar if we've unfocused to focus on the link dialog
            if (!event.target.toolbarElement.contains(document.activeElement)) {
                event.target.toolbarElement.style.display = "none";
            }
        });
    }

    function updateCorrectAnswer(newCorrectAnswerId) {
        if (newCorrectAnswerId === question.correct_answer_id) {
            return;
        }
        question.correct_answer_id = newCorrectAnswerId;
        axios
            .put("/api/questions/" + question.id, question)
            .then(function (response) {})
            .catch(function (error) {
                alert(error);
            });
    }

    var debounced;

    function handleChange() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                axios
                    .put("/api/questions/" + question.id, question)
                    .then(function (response) {
                        savingStatus = '<p class="text-end">Saved <span class="text-success-dark">&check;</span></p>';
                    })
                    .catch(function (error) {
                        savingStatus = '<p class="text-end">Saving ... <span class="text-danger-dark">failed!</span></p>';
                        alert(error);
                    });
            },
            500,
            { maxWait: 2000 }
        );

        debounced();
    }

    function handleImageAdd() {
        var formData = new FormData();
        var imageFile = document.getElementById("imageInput" + question.id);
        formData.set("image", imageFile.files[0]);
        axios
            .post("/api/questions/" + question.id + "/images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                imageFile.value = "";
                var image = response.data;
                question.images = [...question.images, image];
            })
            .catch(function (error) {
                imageFile.value = "";
                alert(error);
            });
    }

    function handleImageRemove(imageId) {
        axios
            .delete("/api/images/" + imageId)
            .then(function (response) {
                question.images = question.images.filter(
                    (i) => i.id !== imageId
                );
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleAnswerAdd() {
        axios
            .post("/api/questions/" + question.id + "/answers", {})
            .then(function (response) {
                question.answers = [...question.answers, response.data];
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleAnswerRemove(answerId) {
        axios
            .delete("/api/answers/" + answerId)
            .then(function (response) {
                question.answers = question.answers.filter(
                    (a) => a.id !== answerId
                );
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleQuestionTypeChange() {
        axios
            .put("/api/questions/" + question.id, {
                type: question.type === "mc" ? "mc" : "card",
            })
            .then(function (response) {
                question.type = response.data.type;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleQuestionCaseChange() {
        axios
            .put("/api/questions/" + question.id, {
                case_id: selectedCase,
            })
            .then(function (response) {
                question.case_id = response.data.case_id;

                const kase = cases.find((c) => c.id === response.data.case_id);

                question.case = kase;

                if (!kase.questions) {
                    kase.questions = [];
                }
                kase.questions.push({
                    id: question.id,
                    case_id: kase.id,
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleRemoveCase() {
        axios
            .put("/api/questions/" + question.id, {case_id: null})
            .then(function (response) {
                question.case_id = null;
                question.case = null;
                cases.map((c) => {
                    c.questions = c.questions.filter((q) => q.id !== question.id);
                });
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function toggleQuestionValid() {
        axios
            .put("/api/questions/" + question.id, {
                is_invalid: !question.is_invalid,
            })
            .then(function (response) {
                question.is_invalid = !question.is_invalid;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function toggleQuestionNeedsReview() {
        axios
            .put("/api/questions/" + question.id, {
                needs_review: !question.needs_review,
            })
            .then(function (response) {
                question.needs_review = !question.needs_review;
            })
            .catch(function (error) {
                alert(error);
            });
        }
</script>

<form action="#" on:submit|preventDefault={handleChange} class="mt-3">
    {#if toggleEditor}
        <button
            type="button"
            on:click|preventDefault={toggleEditor}
            class="btn btn-outline-secondary btn-sm">Close editor</button>
    {/if}

    {#key question.id}
        {#if showCaseSelector && question.case_id}
            <div class="alert alert-light m-1" role="alert">
                <p class="small fw-bold"><i class="bi bi-clipboard2-pulse"></i> CASE</p>
                <p>{@html DOMPurify.sanitize(cases.find(c => c.id === question.case_id).text)}</p>
            </div>
            <div class="text-end m-1">
                <button type="button" class="btn btn-sm btn-light" title="Remove case"
                    on:click|preventDefault={handleRemoveCase}><i class="bi bi-trash" /> Remove case</button>
            </div>
        {:else if showCaseSelector && cases && cases.length > 0}
            <div class="alert alert-light" role="alert">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="case" class="col-form-label small fw-bold"><i class="bi bi-clipboard2-pulse"></i> CASE</label>
                    </div>
                    <div class="col-auto">
                        <select id="case" class="form-select" bind:value={selectedCase} on:change={handleQuestionCaseChange}>
                            <option value="">Select case</option>
                            {#each cases as c}
                                <option value={c.id} selected={question.case_id == c.id}>{_.truncate(DOMPurify.sanitize(c.text, {ALLOWED_TAGS: []}), {'length': 30})}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        {/if}

        <div class="mt-3 mb-3">
            <label for="questionText" class="form-label">Question text</label>
            <input id="questionText" type="hidden" bind:value={question.text} />
            <trix-editor id="editor-questionText" class="bg-light" bind:this={editorQuestion} input="questionText" />
            {@html savingStatus}
        </div>

        <div class="mt-3 mb-3">
            <label for="questionHint" class="form-label">Question hint (optional)</label>
            <input id="questionHint" type="hidden" bind:value={question.hint} />
            <trix-editor id="editor-questionHint" class="bg-light" bind:this={editorHint} input="questionHint" />
            {@html savingStatus}
            <div id="questionHint" class="form-text">
                A hint that can be shown to the user if they are stuck.
            </div>
        </div>

        <div class="mt-3 mb-3">
            <label for="questionComment" class="form-label">Question comment (optional)</label>
            <input id="questionComment" type="hidden" bind:value={question.comment} />
            <trix-editor id="editor-questionComment" class="bg-light" bind:this={editorComment} input="questionComment" />
            {@html savingStatus}
            <div id="questionHint" class="form-text">
                A comment that will be shown once the user has answered the question.
                It can be used to explain the correct answer or provide additional
                information, for example sources.
            </div>
        </div>

        <div class="mb-3 p-3 bg-light rounded">
            <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="checkInvalidQuestion" bind:checked={question.is_invalid} on:click|preventDefault={toggleQuestionValid}>
                <label class="form-check-label" for="checkInvalidQuestion"><i class="bi bi-cone-striped" /> <strong>Invalid question</strong> - Is the answer unknown or disputed? Invalid questions remain in deck but are not counted into results.</label>
            </div>

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="checkNeedsReview" bind:checked={question.needs_review} on:click|preventDefault={toggleQuestionNeedsReview}>
                <label class="form-check-label" for="checkNeedsReview"><i class="bi bi-eraser-fill" /> <strong>Needs review</strong> - Does this question need to be reviewed and improved? Questions marked for review remain in deck and are counted into results.</label>
            </div>
        </div>
    {/key}

    <div class="mb-3">
        <label for="image" class="form-label">Add image</label>
        <input
            on:input={handleImageAdd}
            class="form-control"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            id="imageInput{question.id}"
            name="image" />
        <div id="imageHelp" class="form-text">
            Supported formats are JPEG, PNG, and WebP.
        </div>
    </div>
</form>

{#if !correctAnswerId && question.type === "mc"}
    <div class="col">
        <div class="alert alert-warning" role="alert">
            Don't forget to set the correct answer!
        </div>
    </div>
{/if}

<div class="row row-cols-1 row-cols-lg-3 g4">
    {#each question.images as image (image.id)}
        <div class="col">
            <div class="card" style="width: 18rem">
                <div class="card-header bg-transparent">
                    <button
                        on:click|preventDefault={() => {
                            if (confirm("Are you sure you want to delete this image?")) {
                                handleImageRemove(image.id);
                            }
                        }}
                        type="button"
                        class="btn btn-sm btn-light"><i class="bi bi-trash" /></button>
                </div>
                <img src="/{image.path}" class="card-img-top" alt="" />
                {#if image.comment}
                    <div class="card-body">
                        <p class="card-text">
                            {image.comment}
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>

{#each question.answers as answer (answer.id)}
    <AnswerForm bind:answer />
    <div class="text-end mb-2">
        {#if question.type === "mc"}
            <button
                on:click|preventDefault={() => {
                    updateCorrectAnswer(answer.id);
                }}
                type="button"
                class="btn btn-sm {correctAnswerId ===
                answer.id
                    ? 'btn-success'
                    : 'btn-light'}"
                title="Set as correct answer"
                ><i class="bi bi-check-lg" /></button>
        {/if}
        <button
            on:click|preventDefault={() => {
                if (confirm("Are you sure you want to delete this answer?")) {
                    handleAnswerRemove(answer.id);
                }
            }}
            type="button" class="btn btn-sm btn-light"
            title="Delete answer"><i class="bi bi-trash" /></button>
    </div>
{/each}

{#if question.type === "mc" || question.answers.length === 0}
    <button on:click={handleAnswerAdd} class="btn btn-sm btn-primary"
        >Add answer</button>
{/if}

{#if showConfigEditor}
    <div class="row">
        <div class="col">
            <div class="mt-5 mb-5 border-dark" style="border-bottom: dotted; border-width: 1px;">
            </div>
        </div>
    </div>

    <div class="alert alert-light" role="alert">
        <div class="input-group mb-3">
            <span class="input-group-text">ID</span>
            <input type="text" class="form-control" value="{question.id}" disabled readonly>
        </div>


        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <label for="questionType" class="col-form-label fw-bold">Question type:</label>
            </div>
            <div class="col-auto">
                <select id="questionType" class="form-select font-monospace text-uppercase"
                    disabled={question.answers.length > 1}
                    bind:value={question.type} on:change={handleQuestionTypeChange}>

                    {#if question.answers.length <= 1 || question.type === "card"}
                        <option value="card" selected={question.type == "card"}>card</option>
                    {/if}
                    <option value="mc" selected={question.type == "mc"}>mc</option>
                </select>
            </div>
            <div class="col-auto">
                <span id="questionTypeHelp" class="form-text">
                    Can be either multiple choice (MC) or card (CARD). <strong>Card Questions
                    can have only one or no answer.</strong>
                </span>
            </div>
        </div>
    </div>

    {#if handleQuestionRemove}
        <div class="alert alert-light" role="alert">
            <p>
                <strong>Delete question?</strong> Deleting a question will also delete all associated answers and images.
            </p>
            <button
                on:click|preventDefault={() => {
                    if (confirm("Are you sure you want to delete this question?")) {
                        handleQuestionRemove(question.id);
                    }
                }}
                type="button" class="btn btn-sm btn-danger">
                    <i class="bi bi-trash" /> Delete question
            </button>
        </div>
    {/if}
{/if}
