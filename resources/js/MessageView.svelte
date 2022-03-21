<script>
    import DOMPurify from 'dompurify';
    import { format, parseISO } from 'date-fns';
    import MessageView from './MessageView.svelte';
    import { UserSettings } from './UserSettingsStore.js';

    export let message;
    export let indent;

    var showEditor = false;

    function toggleEditor() {
        showEditor = !showEditor;
    }

    function handleSubmit() {
        var newMessage = {
            "text": document.getElementById('message').value
        };
        axios.put('/api/messages/' + message.id, newMessage)
            .then(function (response) {
                toggleEditor();
                message.text = response.data.text
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleDelete() {
        var newMessage = {
            "text": ""
        }
        axios.put('/api/messages/' + message.id, newMessage)
            .then(function (response) {
                message.text = "";
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="mt-3 mb-3">
    <div class="row">
        {#if !showEditor}
            <div class="col-md offset-md-{indent}">
                <p class="rounded-2 bg-light p-2 mb-0">
                    {#if message.text && message.text != ""}
                        {@html DOMPurify.sanitize(message.text)}
                    {:else}
                        <i>Deleted</i>
                    {/if}
                </p>
                <p class="text-muted text-end">
                    <small>
                        {#if ($UserSettings.id === message.author_id)}
                            <button class="btn btn-sm btn-link" on:click|preventDefault={toggleEditor}>Edit</button>
                            <button class="btn btn-sm btn-link" on:click|preventDefault={handleDelete}>Delete</button>
                        {/if}
                        {format(parseISO(message.created_at), 'dd/MM/yyyy HH:mm')}
                        {#if message.author }{message.author.name}{:else}anonymous{/if}
                    </small>
                </p>
            </div>
        {:else}
            <div class="col-md">
                <form on:submit|preventDefault={handleSubmit} class="mt-3 mb-3">
                    <div class="mb-3">
                        <input id="message" type="hidden" value={message.text}>
                        <trix-editor input="message"></trix-editor>
                    </div>
                    <input class="btn btn-sm btn-primary" type="submit" value="Save">
                </form>
            </div>
        {/if}
    </div>
</div>

{#if message.childs}
    {#each message.childs as child}
        <MessageView bind:message={child} indent={indent + 1} />
    {/each}
{/if}
