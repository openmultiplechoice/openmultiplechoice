<script>
    import debounce from 'lodash/debounce';
    import { onMount } from 'svelte';
    import MessageView from './MessageView.svelte';

    export let questionId;

    var showEditor = false;
    var messages = [];
    var messageInfo = 'Loading comments ...';

    $: questionId, (() => {
        showEditor = false;
        loadMessages();
    })();

    var debounced;

    function loadMessages() {
        messages = [];
        messageInfo = 'Loading comments ...';

        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(() => {
            axios.get('/api/questions/' + questionId + '/messages')
                .then(function (response) {
                    messages = response.data;
                    if (messages.length === 0) {
                        messageInfo = 'No comments yet';
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
        }, 1000, { 'maxWait': 2000 });

        debounced();
    }

    function handleSubmit() {
        var newMessage = {
            "text": document.getElementById('message').value
        };
        axios.post('/api/questions/' + questionId + '/messages', newMessage)
            .then(function (response) {
                toggleEditor();
                messages = [...messages, response.data];
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function toggleEditor() {
        showEditor = !showEditor;
    }
</script>

<div class="mt-3 mb-3">
    {#each messages as message (message.id)}
        <MessageView bind:message />
    {:else}
        <p>{messageInfo}</p>
    {/each}

    {#if showEditor}
        <div class="mt-3">
            <form action="#" on:submit|preventDefault={handleSubmit} class="mt-3 mb-3">
                <div class="mb-3">
                    <input id="message" type="hidden" name="message" value="">
                    <trix-editor input="message"></trix-editor>
                </div>
                <input class="btn btn-sm btn-primary" type="submit" value="Send">
            </form>
        </div>
    {:else}
        <button on:click|preventDefault={toggleEditor} class="btn btn-sm btn-primary">Add comment</button>
    {/if}
</div>
