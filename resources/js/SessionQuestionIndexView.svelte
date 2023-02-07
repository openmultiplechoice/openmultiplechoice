<script>
    import DOMPurify from "dompurify";

    export let data;

    $: numberQuestions = data.deck.questions.length;
    $: indexCurrentQuestion =
        data.deck.questions.findIndex(
            (q) => q.id == data.session.current_question_id
        ) + 1;

    $: data.session.current_question_id,
        (() => {
            var e = document.getElementById(
                "question" + data.session.current_question_id
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
        if (answerChoice.is_correct) {
            if (answerChoice.help_used) {
                return '<span class="text-warning fw-bold">&check;</span>';
            } else {
                return '<span class="text-success fw-bold">&check;</span>';
            }
        } else {
            return '<span class="text-danger fw-bold">&cross;</span>';
        }
    };
</script>

<p>
    <strong>{data.deck.name}</strong><br />
    {indexCurrentQuestion}/{numberQuestions}
</p>

<div class="overflow-scroll" style="max-height: 85vh;">
    <ul class="list-group">
        {#each data.deck.questions as question, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() =>
                    (data.session.current_question_id = question.id)}
                class="list-group-item list-group-item-action {question.id ===
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
    li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    li:hover {
        cursor: pointer;
    }
</style>
