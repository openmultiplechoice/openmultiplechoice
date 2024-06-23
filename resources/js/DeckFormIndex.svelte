<script>
    import DOMPurify from "dompurify";

    export let data;

    $: currentQuestion = data
        ? data.questions.find((q) => q.id === data.current_question_id)
        : null;
</script>

{#if data}
    <div class="list-group">
        {#each data.questions as question, index}
            <button
                type="button"
                on:click|preventDefault={() => {
                    data.current_question_id = question.id;
                    data.current_case_id = null;
                }}
                class="list-group-item list-group-item-action text-overflow"
                class:list-group-item-dark={question.id === data.current_question_id}
                class:list-group-item-light={!(question.id === data.current_question_id)}
                class:bg-warning-subtle={data.current_case_id && question.case_id === data.current_case_id}
                aria-current="true">
                <small>
                    {#if question.text}
                        {DOMPurify.sanitize(question.text).replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                        )}
                    {:else}
                        Question Nr. {index + 1}
                    {/if}
                </small>
            </button>
        {/each}
    </div>
    <div class="list-group mt-2">
        {#each data.cases as kase, index}
            <button
                type="button"
                on:click|preventDefault={() => {
                    data.current_case_id = kase.id;
                    data.current_question_id = null;
                }}
                class="list-group-item list-group-item-action text-overflow"
                class:list-group-item-dark={kase.id === data.current_case_id}
                class:list-group-item-info={!(kase.id === data.current_case_id) && !(currentQuestion && currentQuestion.case_id === kase.id)}
                class:list-group-item-warning={currentQuestion && currentQuestion.case_id === kase.id}
                aria-current="true">
                <small>
                    <i class="bi bi-clipboard2-pulse"></i>
                    {#if kase.text}
                        {DOMPurify.sanitize(kase.text).replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                        )}
                    {:else}
                        Case Nr. {index + 1}
                    {/if}
                </small>
            </button>
        {/each}
    </div>
{:else}
    <p>Loading ...</p>
{/if}

<style>
    .text-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
