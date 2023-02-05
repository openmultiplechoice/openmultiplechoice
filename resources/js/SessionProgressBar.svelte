<script>
    import { onMount } from "svelte";

    import { sessionProgressPercentage } from "./StatsHelper.js";

    export let sessionData;

    var percentage = {};

    onMount(() => {
        percentage = sessionProgressPercentage(
            sessionData.deck.questions.length,
            sessionData.answerchoices
        );
    });
</script>

<div class="progress" style="height: 20px;">
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #155724; background-color: #d4edda; width: {percentage.correct}%">
        {percentage.correct}%
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #664d03; background-color: #fff3cd; width: {percentage.correctWithHelp}%">
        {percentage.correctWithHelp}%
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #721c24; background-color: #f8d7da; width: {percentage.incorrect}%">
        {percentage.incorrect}%
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #1b1e21; background-color: #d6d8d9; width: {percentage.unanswered}%">
        {percentage.unanswered}%
    </div>
</div>
