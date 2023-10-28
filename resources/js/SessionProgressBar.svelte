<script>
    export let progressPercentage;

    $: title = JSON.stringify(progressPercentage, null, 2);
</script>

<div class="progress" style="height: 20px;" title="{title}">
    <div
        class="progress-bar bg-success text-dark"
        role="progressbar"
        style="width: {progressPercentage.correct}%">
        {progressPercentage.correct > 4 ? progressPercentage.correct + "%" : ""}
    </div>
    <div
        class="progress-bar bg-warning text-dark"
        role="progressbar"
        style="width: {progressPercentage.correctWithHelp}%">
        {progressPercentage.correctWithHelp > 4 ? progressPercentage.correctWithHelp + "%" : ""}
    </div>
    <div
        class="progress-bar bg-danger text-dark"
        role="progressbar"
        style="width: {progressPercentage.incorrect}%">
        {progressPercentage.incorrect > 4 ? progressPercentage.incorrect + "%" : ""}
    </div>
    <div
        class="progress-bar"
        role="progressbar"
        style="color: #1b1e21; background-color: #d6d8d9; width: {progressPercentage.unanswered}%">
        {progressPercentage.unanswered > 4 ? progressPercentage.unanswered + "%" : ""}
    </div>
</div>
