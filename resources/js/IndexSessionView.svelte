<script>
    import { onMount } from 'svelte';
    import SessionProgressBar from './SessionProgressBar.svelte';

    export let userId;

    var sessions = [];

    onMount(() => {
        axios.get('/api/sessions?take=15&user-id=' + userId)
            .then(function (response) {
                sessions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });
</script>

{#each sessions as session}
    <div class="mb-2">
        <SessionProgressBar bind:sessionData={session} />
        <p><strong>{session.name}</strong> <a href="/sessions/{ session.id }">Continue</a><br>
        <small>{session.created_at}</small></p>
    </div>
{:else}
    <p>No sessions yet</p>
{/each}
