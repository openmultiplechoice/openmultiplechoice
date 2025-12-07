<script>
    import { run } from 'svelte/legacy';

    import { onMount } from "svelte";

    var settings = $state();

    onMount(() => {
        axios
            .get("/api/users/me/settings")
            .then(function (response) {
                settings = response.data;
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    });

    run(() => {
        if (settings) {
                axios
                    .put("/api/users/me/settings", settings)
                    .then(function (response) {})
                    .catch(function (error) {
                        alert(error);
                    });
            }
    });;
</script>

{#if settings}
    <h4>Session</h4>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_shuffle_answers}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Shuffle answers</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_show_sidebar}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Show sidebar</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_show_progress_bar}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Show progress bar</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_show_answer_stats}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Show answer distribution stats</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_exam_mode}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Keep answers and comments hidden until all questions are answered (<i>"exam mode"</i>)</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_multiple_answer_tries}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Allow selecting multiple answers: the correct answer remains hidden until it is selected</label>
    </div>

    <h4 class="mt-3">Add to deck</h4>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.add_to_deck_current_module_only}>
        <label class="form-check-label" for="flexSwitchCheckDefault">List only decks of <a href="/sessions/create">your current module</a> or with the question added</label>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
