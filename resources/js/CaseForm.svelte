<script>
    import { run, preventDefault } from 'svelte/legacy';

    import debounce from "lodash/debounce";

    let { kase = $bindable(), cases = $bindable(), handleCaseRemove } = $props();

    let editorCase = $state();

    let savingStatus = $state("");

    run(() => {
        if (editorCase) {
            configureEditorEventListener(editorCase);
        }
    });

    function configureEditorEventListener(editor) {
        editor.addEventListener("trix-change", function () {
                kase.text = document.getElementById("caseText" + kase.id).value;
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
    };

    var debounced;

    function handleChange() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                axios
                    .put("/api/cases/" + kase.id, kase)
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

{#key kase.id}
    <form action="#" class="mt-3">
        <div class="mb-3">
            <label for="caseText{kase.id}" class="form-label">Case text</label>
            <input id="caseText{kase.id}" type="hidden" bind:value={kase.text} />
            <trix-editor id="editor-case{kase.id}" class="bg-light trix-content" bind:this={editorCase} input="caseText{kase.id}"></trix-editor>
            {@html savingStatus}
        </div>
    </form>
{/key}

{#if handleCaseRemove}
    <div class="alert alert-light mt-5" role="alert">
        <p>
            <strong>Delete case?</strong> A case can only be deleted if it's not associated with any question.
        </p>
        <button type="button" class="btn btn-sm btn-danger"
            onclick={preventDefault(() => {
                if (confirm("Are you sure you want to delete this case?")) {
                    handleCaseRemove(kase.id);
                }
            })}
            disabled={cases.some(c => c.questions ? c.questions.some(q => q.case_id === kase.id) : false)}>
                <i class="bi bi-trash"></i> Delete case
        </button>
    </div>
{/if}
