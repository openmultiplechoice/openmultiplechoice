<script>
    import { sessionProgressPercentage } from "./StatsHelper.js";

    export let answerChoices;
    export let questions;

    $: numQuestions = questions.length;

    // `answerChoices` can contain answers to questions that are
    // not in `questions`, for example because a question was removed
    // from the deck. Pick the answer choices for the given questions
    // and ignore the rest
    $: relevantAnswerChoices = answerChoices.filter(
        ac => questions.some(q => q.id === ac.question_id)
    );

    $: percentage = (() => {
        if (!answerChoices) {
            return {};
        }
        return sessionProgressPercentage(numQuestions, relevantAnswerChoices);
    })();
</script>

<div class="progress" style="height: 20px;">
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #155724; background-color: #d4edda; width: {percentage.correct}%">
        {percentage.correct > 4 ? percentage.correct + "%" : ""}
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #664d03; background-color: #fff3cd; width: {percentage.correctWithHelp}%">
        {percentage.correctWithHelp > 4 ? percentage.correctWithHelp + "%" : ""}
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #721c24; background-color: #f8d7da; width: {percentage.incorrect}%">
        {percentage.incorrect > 4 ? percentage.incorrect + "%" : ""}
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #1b1e21; background-color: #d6d8d9; width: {percentage.unanswered}%">
        {percentage.unanswered > 4 ? percentage.unanswered + "%" : ""}
    </div>
</div>
