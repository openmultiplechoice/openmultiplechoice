<script>
    import debounce from "lodash/debounce";
    import { onMount } from "svelte";

    export let answer;

    let editorAnswer;
    let editorHint;

    let showAnswerHint;

    let savingStatus = "";

    $: if (editorAnswer) {
        configureEditorEventListener(editorAnswer);
    }
    $: if (editorHint) {
        configureEditorEventListener(editorHint);
    }

    onMount(() => {
        const answerHintAccordion = document.getElementById('collapseAnswerHint' + answer.id);
        if (answerHintAccordion) {
            answerHintAccordion.addEventListener('shown.bs.collapse', () => {
                if (editorHint) {
                    editorHint.focus();
                }
            });
        }

        showAnswerHint = !!answer.hint;
    })

    function configureEditorEventListener(editor) {
        editor.addEventListener("trix-change", function () {
                answer.text = document.getElementById("answerText" + answer.id).value;
                answer.hint = document.getElementById("answerHint" + answer.id).value;
                savingStatus = '<p class="text-end">Saving ...</p>';
                handleChange();
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

<form action="#">
    <div class="mb-3">
        <label for="answerText{answer.id}" class="form-label">Answer text</label>
        <input id="answerText{answer.id}" type="hidden" bind:value={answer.text} />
        <trix-editor id="editor-answer{answer.id}" class="bg-light trix-content" bind:this={editorAnswer} input="answerText{answer.id}" />
        {@html savingStatus}
    </div>

    <div class="accordion my-2 " id="accordionAnswerHint{answer.id}">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button text-black bg-white py-2 px-3 {showAnswerHint ? '' : 'collapsed'}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAnswerHint{answer.id}"
                        aria-expanded="false"
                        aria-controls="#collapseAnswerHint{answer.id}">
                    Answer hint (optional)
                </button>
            </h2>
            <div id="collapseAnswerHint{answer.id}" class="accordion-collapse collapse {showAnswerHint ? 'show' : ''}">
                <div class="accordion-body">
                    <div class="mb-3">
                        <input id="answerHint{answer.id}" type="hidden" bind:value={answer.hint} />
                        <trix-editor id="editor-answerHint{answer.id}" class="bg-light trix-content" bind:this={editorHint} input="answerHint{answer.id}" />
                        {@html savingStatus}
                        <div id="answerHint{answer.id}" class="form-text">
                            A hint that will be shown once the user has answered the question.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
