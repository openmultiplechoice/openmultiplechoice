<script>
    import DOMPurify from "dompurify";

    export let data;
    export let examMode;

    $: currentQuestionId = data.session.current_question_id;

    $: currentQuestionId,
        (() => {
            var e = document.getElementById(
                "question" + currentQuestionId
            );
            if (e) {
                e.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        })();

    $: answerChoiceIndicator = function (question) {
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
    };
</script>

<div class="overflow-scroll" style="max-height: 85vh;">
    <ul class="list-group">
        {#each data.deck.questions as question, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() =>
                    (data.session.current_question_id = question.id)}
                class="list-group-item list-group-item-action text-truncate {question.id ===
                data.session.current_question_id
                    ? 'list-group-item-dark'
                    : 'list-group-item-light'}"
                id="question{question.id}">
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
