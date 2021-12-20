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
            unanswered: 0,
        }

        percentage.unanswered = 100 - percentage.correct - percentage.incorrect;

        return percentage;
    }
</script>

<div class="progress" style="height: 20px;">
    <div class="progress-bar" role="progressbar" style="color: #155724; background-color: #d4edda; width: {percentage.correct}%">{percentage.correct}%</div>
    <div class="progress-bar" role="progressbar" style="color: #721c24; background-color: #f8d7da; width: {percentage.incorrect}%">{percentage.incorrect}%</div>
    <div class="progress-bar" role="progressbar" style="color: #1b1e21; background-color: #d6d8d9; width: {percentage.unanswered}%">{percentage.unanswered}%</div>
</div>
