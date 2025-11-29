<script>
    import { onMount } from "svelte";

    import IndexSessionSingleView from "./IndexSessionSingleView.svelte";

    let { userId } = $props();

    var sessions = $state(undefined);

    onMount(() => {
        axios
            .get("/api/sessions?take=10&user-id=" + userId)
            .then(function (response) {
                sessions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });
</script>

{#if sessions}
    {#each sessions as session, i}
        <IndexSessionSingleView bind:session={sessions[i]} />
    {:else}
        <div class="alert alert-light text-center" role="alert">
            <i class="bi bi-rocket"></i> No sessions yet
        </div>
    {/each}
{:else}
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading sessions ...</span>
        </div>
    </div>
{/if}
