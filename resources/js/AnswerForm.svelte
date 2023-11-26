<script>
    import debounce from "lodash/debounce";

    export let answer;

    let editorAnswer;
    let editorHint;

    let savingStatus = "";

    $: if (editorAnswer) {
        configureEditorEventListener(editorAnswer);
    }
    $: if (editorHint) {
        configureEditorEventListener(editorHint);
    }

    function configureEditorEventListener(editor) {
        editor.addEventListener("trix-change", function () {
                answer.text = document.getElementById("answerText" + answer.id).value;
                answer.hint = document.getElementById("answerHint" + answer.id).value;
                savingStatus = '<p class="text-end">Saving ...</p>';
                handleChange();
            });

        editor.toolbarElement.style.display = "none";

        editor.addEventListener("trix-focus", function(event) {
            event.target.toolbarElement.style.display = "block";
        });
        editor.addEventListener("trix-blur", function(event) {
            event.target.toolbarElement.style.display = "none";
        });
    };

    var debounced;

    function handleChange() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                axios
                    .put("/api/answers/" + answer.id, answer)
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
</script>

<form action="#" class="mt-3">
    <div class="mb-3">
        <label for="answerText{answer.id}" class="form-label">Answer text</label>
        <input id="answerText{answer.id}" type="hidden" bind:value={answer.text} />
        <trix-editor id="editor-answer{answer.id}" class="bg-light" bind:this={editorAnswer} input="answerText{answer.id}" />
        {@html savingStatus}
    </div>

    <div class="mb-3">
        <label for="answerHint{answer.id}t" class="form-label">Answer hint (optional)</label>
        <input id="answerHint{answer.id}" type="hidden" bind:value={answer.hint} />
        <trix-editor id="editor-answerHint{answer.id}" class="bg-light" bind:this={editorHint} input="answerHint{answer.id}" />
        {@html savingStatus}
    </div>
</form>
