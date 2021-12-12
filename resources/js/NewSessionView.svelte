<script>
    import { onMount } from 'svelte';

    var data;

    onMount(() => {
        axios.get('/api/modules')
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
    <div class="accordion accordion-flush" id="accordion-modules">
        {#each data.modules as module, index}
            <div class="accordian-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{index}">
                        {module.name}
                    </button>
                </h2>
                <div id="collapse{index}" class="accordion-collapse collapse show" data-bs-parent="accordion-modules">
                    <ul>
                        {#each module.decks as deck}
                            <li><button on:click|preventDefault={() => createSession(deck.id)} type="button" class="btn btn-link">{deck.name}</button></li>
                        {/each}
                    </ul>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <p>Loading ...</p>
{/if}
