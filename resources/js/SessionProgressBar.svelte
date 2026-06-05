<script>
    let { progressPercentage = $bindable(), variant = "default" } = $props();

    let answeredPercentage = $derived(
        (progressPercentage?.correct ?? 0)
        + (progressPercentage?.correctWithHelp ?? 0)
        + (progressPercentage?.incorrect ?? 0)
    );
</script>

<div class="progress" style="height: 20px;">
    {#if variant === "unicorn"}
        <div
            class="progress-bar fw-bold text-dark"
            role="progressbar"
            style="width: {answeredPercentage}%; background: linear-gradient(90deg, #ff6b6b 0%, #ffd93d 25%, #6bcB77 50%, #4d96ff 75%, #b983ff 100%);">
            {answeredPercentage > 5 ? answeredPercentage + "%" : ""}
        </div>
        <div
            class="progress-bar bg-secondary-subtle text-body fw-bold"
            role="progressbar"
            style="width: {progressPercentage.unanswered}%">
            {progressPercentage.unanswered > 5 ? progressPercentage.unanswered + "%" : ""}
        </div>
    {:else if variant === "basic"}
        <div
            class="progress-bar bg-secondary fw-bold"
            role="progressbar"
            style="width: {answeredPercentage}%">
            {answeredPercentage > 5 ? answeredPercentage + "%" : ""}
        </div>
        <div
            class="progress-bar bg-secondary-subtle text-body fw-bold"
            role="progressbar"
            style="width: {progressPercentage.unanswered}%">
            {progressPercentage.unanswered > 5 ? progressPercentage.unanswered + "%" : ""}
        </div>
    {:else}
        <div
            class="progress-bar bg-success fw-bold"
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
            class="progress-bar bg-danger fw-bold"
            role="progressbar"
            style="width: {progressPercentage.incorrect}%">
            {progressPercentage.incorrect > 5 ? progressPercentage.incorrect + "%" : ""}
        </div>
        <div
            class="progress-bar bg-secondary-subtle text-body fw-bold"
            role="progressbar"
            style="width: {progressPercentage.unanswered}%">
            {progressPercentage.unanswered > 5 ? progressPercentage.unanswered + "%" : ""}
        </div>
    {/if}
</div>
