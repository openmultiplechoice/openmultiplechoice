<script>
    import { onMount } from "svelte";

    import IndexSessionSingleView from "./IndexSessionSingleView.svelte";

    export let userId;

    var sessions = [];

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

{#each sessions as session}
    <IndexSessionSingleView bind:session />
{:else}
    <p>No sessions yet</p>
{/each}
