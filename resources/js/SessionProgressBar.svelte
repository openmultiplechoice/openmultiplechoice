<script>
    import { onMount } from 'svelte';

    export let sessionData;

    var percentage = {};

    onMount(() => {
        percentage = sessionProgressPercentage(sessionData);
    });

    function sessionProgressPercentage(sessionData) {
        const numQuestions = sessionData.deck.questions.length;
        const numCorrectAnswers = sessionData.answerchoices.filter(
            c => c.is_correct && !c.help_used
        ).length;
        const numCorrectAnswersWithHelp = sessionData.answerchoices.filter(
            c => c.is_correct && c.help_used
        ).length;
        const numIncorrectAnswers = sessionData.answerchoices.filter(
            c => !c.is_correct
        ).length;

        const percentage = {
            correct: Math.round(100 * (numCorrectAnswers / numQuestions)),
            correctWithHelp: Math.round(100 * (numCorrectAnswersWithHelp / numQuestions)),
            incorrect: Math.round(100 * (numIncorrectAnswers / numQuestions)),
            unanswered: Math.round(100 * ((numQuestions - numCorrectAnswers - numCorrectAnswersWithHelp - numIncorrectAnswers) / numQuestions))
        }

        // Make sure to have 100% in total
        if (percentage.correct + percentage.correctWithHelp + percentage.incorrect + percentage.unanswered != 100) {
            if (percentage.unanswered > 0) {
                percentage.unanswered = percentage.unanswered + 1;
            } else if (percentage.incorrect > 0) {
                percentage.incorrect = percentage.incorrect + 1;
            } else if (percentage.correctWithHelp > 0) {
                percentage.incorrectWithHelp = percentage.correctWithHelp + 1;
            } else if (percentage.correct > 0) {
                percentage.correct = percentage.correct + 1;
            }
        }

        return percentage;
    }
</script>

<div class="progress" style="height: 20px;">
    <div class="progress-bar" role="progressbar" style="color: #155724; background-color: #d4edda; width: {percentage.correct}%">{percentage.correct}%</div>
    <div class="progress-bar" role="progressbar" style="color: #664d03; background-color: #fff3cd; width: {percentage.correctWithHelp}%">{percentage.correctWithHelp}%</div>
    <div class="progress-bar" role="progressbar" style="color: #721c24; background-color: #f8d7da; width: {percentage.incorrect}%">{percentage.incorrect}%</div>
    <div class="progress-bar" role="progressbar" style="color: #1b1e21; background-color: #d6d8d9; width: {percentage.unanswered}%">{percentage.unanswered}%</div>
</div>
