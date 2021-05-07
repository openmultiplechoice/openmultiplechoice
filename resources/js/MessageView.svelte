<script>
    export let message;

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

{#if !showEditor}
    <div class="mt-3">
        {#if message.text && message.text != ""}
            {@html message.text}
        {:else}
            <i>Deleted</i>
        {/if}
    </div>
    <div class="mb-3">
        <p class="text-muted text-end">
            <small>
                <button class="btn btn-sm btn-link" on:click|preventDefault={toggleEditor}>Edit</button>
                <button class="btn btn-sm btn-link" on:click|preventDefault={handleDelete}>Delete</button>
                {message.created_at}
                {message.author.name}
            </small>
        </p>
    </div>
{:else}
    <div class="mt-3">
        <form on:submit|preventDefault={handleSubmit} class="mt-3 mb-3">
            <div class="mb-3">
                <input id="message" type="hidden" value={message.text}>
                <trix-editor input="message"></trix-editor>
            </div>
            <input class="btn btn-sm btn-primary" type="submit" value="Save">
        </form>
    </div>
{/if}
