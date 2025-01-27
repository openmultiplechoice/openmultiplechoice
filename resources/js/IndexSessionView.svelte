<script>
    import { onMount } from "svelte";

    import IndexSessionSingleView from "./IndexSessionSingleView.svelte";

    export let userId;

    var sessions = undefined;

    onMount(() => {
        axios
            .get("/api/sessions?take=15&user-id=" + userId)
            .then(function (response) {
                sessions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });
</script>

{#if sessions}
    {#each sessions as session}
        <IndexSessionSingleView bind:session />
    {:else}
        <div class="alert alert-light text-center" role="alert">
            No sessions yet <i class="bi bi-rocket"></i>
        </div>
    {/each}
{:else}
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading sessions ...</span>
        </div>
    </div>
{/if}
