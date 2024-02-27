<script>
    export let progressPercentage;

    $: title = JSON.stringify(progressPercentage, null, 2);
</script>

<div class="progress" style="height: 20px;" title="{title}">
    <div
        class="progress-bar bg-success text-dark fw-bold"
        role="progressbar"
        style="width: {progressPercentage.correct}%">
        {progressPercentage.correct > 5 ? progressPercentage.correct + "%" : ""}
    </div>
    <div
        class="progress-bar bg-warning text-dark fw-bold"
        role="progressbar"
        style="width: {progressPercentage.correctWithHelp}%">
        {progressPercentage.correctWithHelp > 5 ? progressPercentage.correctWithHelp + "%" : ""}
    </div>
    <div
        class="progress-bar bg-danger text-dark fw-bold"
        role="progressbar"
        style="width: {progressPercentage.incorrect}%">
        {progressPercentage.incorrect > 5 ? progressPercentage.incorrect + "%" : ""}
    </div>
    <div
        class="progress-bar fw-bold"
        role="progressbar"
        style="color: #1b1e21; background-color: #d6d8d9; width: {progressPercentage.unanswered}%">
        {progressPercentage.unanswered > 5 ? progressPercentage.unanswered + "%" : ""}
    </div>
</div>
