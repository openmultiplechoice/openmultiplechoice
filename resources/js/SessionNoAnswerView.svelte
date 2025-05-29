<script>
    import { preventDefault } from 'svelte/legacy';

    let { hasAnswer, submitAnswer } = $props();
</script>

{#if !hasAnswer}
    <!--
        Submitting no answer ID signals "ask me again",
        submitting a bogus answer ID of '-1' signals OK.
        See comments in `submitAnswer()` for details.
    -->
    <div class="row">
        <div class="col-md-6 mb-1">
            <button type="button" class="btn btn-danger btn-sm w-100" onclick={preventDefault(() => submitAnswer())} >Ask me again</button>
        </div>
        <div class="col-md-6 mb-1">
            <button type="button" class="btn btn-success btn-sm w-100" onclick={preventDefault(() => submitAnswer(-1))} >I got it!</button>
        </div>
    </div>
{/if}
