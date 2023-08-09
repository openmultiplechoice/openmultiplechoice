<script>
    import debounce from "lodash/debounce";
    import { onMount } from "svelte";

    export let answer;

    let editor;
    let savingStatus = "";

    onMount(() => {
        document
            .getElementById("editor-answer" + answer.id)
            .addEventListener("trix-change", function () {
                answer.text = document.getElementById("answer" + answer.id).value;
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
    });

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
        <input id="answer{answer.id}" type="hidden" bind:value={answer.text} />
        <trix-editor id="editor-answer{answer.id}" class="bg-light" bind:this={editor} input="answer{answer.id}" />
        {@html savingStatus}
    </div>
</form>
