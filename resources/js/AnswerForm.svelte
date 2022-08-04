<script>
    import debounce from "lodash/debounce";
    import { onMount } from "svelte";

    export let answer;

    onMount(() => {
        document
            .getElementById("editor-answer" + answer.id)
            .addEventListener("trix-change", function () {
                answer.text = document.getElementById(
                    "answer" + answer.id
                ).value;
                handleChange();
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
                    .then(function (response) {})
                    .catch(function (error) {
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
        <trix-editor id="editor-answer{answer.id}" input="answer{answer.id}" />
    </div>
</form>
