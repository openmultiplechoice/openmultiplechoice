<script>
    import DOMPurify from "dompurify";
    import { scrollToCenter } from "./lib/utils.js";

    let { data = $bindable(), examMode } = $props();

    let currentQuestionId = $derived(data.session.current_question_id);

    // Scroll to current question when it changes
    $effect(() => {
        if (!currentQuestionId) return;
        let e = document.getElementById("questionLink" + currentQuestionId);
        scrollToCenter(e);
    });

    let answerChoiceIndicator = $derived(function (question) {
        var answerChoice = data.session.answer_choices.find(
            (e) => e.question_id === question.id
        );
        if (!answerChoice) {
            return '<span class="text-dark fw-bold">&rightarrow;</span>';
        }
        if (examMode) {
            return '<span class="text-dark fw-bold">&check;</span>';
        }
        if (answerChoice.is_correct) {
            if (answerChoice.help_used) {
                return '<span class="text-warning-dark fw-bold">&check;</span>';
            } else {
                return '<span class="text-success-dark fw-bold">&check;</span>';
            }
        } else {
            return '<span class="text-danger-dark fw-bold">&cross;</span>';
        }
    });
</script>

<div class="overflow-scroll" style="max-height: 75vh;">
    <ul class="list-group">
        {#each data.deck.questions as question, index}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <li
                onclick={() =>
                    (data.session.current_question_id = question.id)}
                class="list-group-item list-group-item-action text-truncate {question.id ===
                data.session.current_question_id
                    ? 'list-group-item-dark'
                    : 'list-group-item-light'}"
                id="questionLink{question.id}">
                <small>
                    {@html answerChoiceIndicator(question)}
                    {#if question.text}
                        {DOMPurify.sanitize(question.text).replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                        )}
                    {:else}
                        Question Nr. {index + 1}
                    {/if}
                </small>
            </li>
        {:else}
            <li>Loading ...</li>
        {/each}
    </ul>
</div>

<style>
    li:hover {
        cursor: pointer;
    }
</style>
