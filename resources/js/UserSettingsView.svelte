<script>
    import { onMount } from "svelte";

    var settings;

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

    $: if (settings) {
            console.debug('update settings', settings);
            axios
                .put("/api/users/me/settings", settings)
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        };
</script>

{#if settings}
    <h4>Session</h4>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_show_sidebar}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Show sidebar in session view</label>
    </div>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" bind:checked={settings.session_exam_mode}>
        <label class="form-check-label" for="flexSwitchCheckDefault">Use "exam mode": answers and comments remain hidden until all questions are answered</label>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
