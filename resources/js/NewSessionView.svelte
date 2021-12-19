<script>
    import { onMount } from 'svelte';

    var data;

    onMount(() => {
        axios.get('/api/subjects')
            .then(function (response) {
                data = response.data;
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    });

    function createSession(deckId) {
        var data = {
            'deck_id': deckId,
        };
        axios.post('/api/sessions', data)
            .then(function (response) {
                window.location.href = '/sessions/' + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if data}
    <ul>
        {#each data.subjects as subject}
            <li>
                {subject.name}
                <ul>
                    {#each subject.modules as module}
                        <li>
                            {module.name}
                            <ul>
                                {#each module.decks as deck}
                                    <li><button on:click|preventDefault={() => createSession(deck.id)} type="button" class="btn btn-link">{deck.name}</button></li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
{:else}
    <p>Loading ...</p>
{/if}
