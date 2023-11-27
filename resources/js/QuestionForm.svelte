<script>
    import debounce from "lodash/debounce";
    import AnswerForm from "./AnswerForm.svelte";

    export let question;
    export let toggleEditor;

    let editorQuestion;
    let editorComment;
    let editorHint;

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

    function newAnswerObj() {
        return {
            id: null,
            text: "",
        };
    }

    function handleAnswerAdd() {
        var newAnswer = newAnswerObj();

        axios
            .post("/api/questions/" + question.id + "/answers", newAnswer)
            .then(function (response) {
                newAnswer.id = response.data.id;
                question.answers = [...question.answers, newAnswer];
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
</script>

<div class="mt-1 mb-1">
    <form action="#" on:submit|preventDefault={handleChange} class="mt-3">
        {#if toggleEditor}
            <button
                type="button"
                on:click|preventDefault={toggleEditor}
                class="btn btn-outline-secondary btn-sm">Close editor</button>
        {/if}

        {#key question.id}
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
            </div>

            <div class="mt-3 mb-3">
                <label for="questionComment" class="form-label">Question comment (optional)</label>
                <input id="questionComment" type="hidden" bind:value={question.comment} />
                <trix-editor id="editor-questionComment" class="bg-light" bind:this={editorComment} input="questionComment" />
                {@html savingStatus}
            </div>

            <div class="mb-3">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="checkInvalidQuestion" bind:checked={question.is_invalid} on:click|preventDefault={toggleQuestionValid}>
                    <label class="form-check-label" for="checkInvalidQuestion">Invalid question - Is the answer unknown or disputed? Invalid questions remain in deck but are not counted into results.</label>
                </div>
            </div>
        {/key}

        <div class="mb-3">
            <label for="image" class="form-label">Add image</label>
            <input
                on:input={handleImageAdd}
                class="form-control"
                type="file"
                id="imageInput{question.id}"
                name="image" />
        </div>
    </form>

    {#if !correctAnswerId && question.type === "mc"}
        <div class="col">
            <div class="alert alert-secondary" role="alert">
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
                                handleImageRemove(image.id);
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
                    handleAnswerRemove(answer.id);
                }}
                type="button"
                class="btn btn-sm btn-light"
                title="Remove answer"><i class="bi bi-trash" /></button>
        </div>
    {/each}

    {#if question.type === "mc" || question.answers.length === 0}
        <button on:click={handleAnswerAdd} class="btn btn-sm btn-primary"
            >Add answer</button>
    {/if}
</div>
