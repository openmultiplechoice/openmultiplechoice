<script>
    import DOMPurify from "dompurify";
    import { scrollToCenter } from "./lib/utils.js";

    let { data = $bindable() } = $props();

    let currentQuestion = $derived(data
        ? data.questions.find((q) => q.id === data.current_question_id)
        : null);

    let currentQuestionId = $derived(data ? data.current_question_id : null);
    let currentCaseId = $derived(data ? data.current_case_id : null);

    let hasCases = $derived(data && data.cases && data.cases.length > 0);

    // Scroll to current question when it changes
    $effect(() => {
        if (!currentQuestionId) return;
        let e = document.getElementById("editor-question" + currentQuestionId);
        scrollToCenter(e);
    });

    // Scroll to current case when it changes
    $effect(() => {
        if (!currentCaseId) return;
        let e = document.getElementById("editor-case-item" + currentCaseId);
        scrollToCenter(e);
    });
</script>

{#if data}
    <div class="overflow-scroll" style="max-height: {hasCases ? '50vh' : '75vh'};">
        <div class="list-group">
            {#each data.questions as question, index}
                <button
                    type="button"
                    id="editor-question{question.id}"
                    onclick={() => {
                        data.current_question_id = question.id;
                        data.current_case_id = null;
                    }}
                    class="list-group-item list-group-item-action text-truncate"
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
    </div>
    {#if hasCases}
        <div class="overflow-scroll mt-2" style="max-height: 25vh;">
            <div class="list-group">
                {#each data.cases as kase, index}
                    <button
                        type="button"
                        id="editor-case-item{kase.id}"
                        onclick={() => {
                            data.current_case_id = kase.id;
                            data.current_question_id = null;
                        }}
                        class="list-group-item list-group-item-action text-truncate"
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
        </div>
    {/if}
{:else}
    <p>Loading ...</p>
{/if}
