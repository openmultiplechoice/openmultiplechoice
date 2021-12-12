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
            c => c.is_correct
        ).length;
        const numIncorrectAnswers = sessionData.answerchoices.filter(
            c => !c.is_correct
        ).length;

        const percentage = {
            correct: Math.round(100 * (numCorrectAnswers / numQuestions)),
            incorrect: Math.round(100 * (numIncorrectAnswers / numQuestions)),
        }

        return percentage;
    }
</script>

<div class="progress" style="height: 20px;">
    <div class="progress-bar bg-success" role="progressbar" style="width: {percentage.correct}%">{percentage.correct}%</div>
    <div class="progress-bar bg-danger" role="progressbar" style="width: {percentage.incorrect}%">{percentage.incorrect}%</div>
</div>
