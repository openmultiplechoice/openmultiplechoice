<script>
    import DOMPurify from "dompurify";

    export let data;
    export let handleQuestionRemove;
</script>

{#if data}
    <div class="list-group">
        {#each data.questions as question, index}
            <button
                type="button"
                on:click|preventDefault={() => {
                    data.current_question_id = question.id;
                }}
                class="list-group-item {question.id ===
                data.current_question_id
                    ? 'list-group-item-secondary'
                    : 'list-group-item-light'}"
                aria-current="true">
                <div class="d-flex w-100 justify-content-between mb-1">
                    <p class="mb-1 font-monospace">ID: {question.id}</p>
                    <p class="mb-1 font-monospace text-uppercase">
                        Type: {question.type}
                    </p>
                    <button
                        on:click|preventDefault={() => {
                            handleQuestionRemove(question.id);
                        }}
                        type="button"
                        class="btn btn-sm btn-light"
                        ><i class="bi bi-trash" /></button>
                </div>
                <p class="mb-1 index-list-item">
                    {#if question.text}
                        {DOMPurify.sanitize(question.text).replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                        )}
                    {:else}
                        Question Nr. {index + 1}
                    {/if}
                </p>
            </button>
        {/each}
    </div>
{:else}
    <p>Loading ...</p>
{/if}

<style>
    .index-list-item {
        width: 100%;
        display: block;
        overflow: hidden !important;
        white-space: nowrap;
        text-overflow: ellipsis !important;
        text-align: left;
    }
</style>
