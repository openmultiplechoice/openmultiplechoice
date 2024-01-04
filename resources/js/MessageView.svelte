<script>
    import DOMPurify from "dompurify";
    import { format, parseISO } from "date-fns";
    import MessageView from "./MessageView.svelte";
    import { UserSettings } from "./UserSettingsStore.js";

    export let message;
    export let indent;
    export let addMessage;
    export let questionId;

    var showEditor = false;
    var showEditorReply = false;

    function toggleEditor() {
        showEditor = !showEditor;
    }

    function toggleEditorReply() {
        showEditorReply = !showEditorReply;
    }

    function handleSubmit() {
        var newMessage = {
            text: document.getElementById("message").value,
            is_anonymous: document.getElementById("anonymous").checked,
        };
        axios
            .put("/api/messages/" + message.id, newMessage)
            .then(function (response) {
                toggleEditor();
                message.text = response.data.text;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleReply() {
        var newMessage = {
            text: document.getElementById("replyMessage").value,
            parent_message_id: document.getElementById("parentMessageId").value,
            is_anonymous: document.getElementById("replyAnonymous").checked,
        };
        axios
            .post("/api/questions/" + questionId + "/messages", newMessage)
            .then(function (response) {
                toggleEditorReply();
                addMessage(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleDelete() {
        var newMessage = {
            text: "",
        };
        axios
            .put("/api/messages/" + message.id, newMessage)
            .then(function (response) {
                message.text = "";
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="mt-1 mb-1">
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
                <p class="text-muted text-end mb-0">
                    <small>
                        {#if $UserSettings.id === message.author_id}
                            <button
                                class="btn btn-sm btn-link"
                                on:click|preventDefault={toggleEditor}
                                >Edit</button>
                            <button
                                class="btn btn-sm btn-link"
                                on:click|preventDefault={handleDelete}
                                >Delete</button>
                        {/if}
                        <button
                            class="btn btn-sm btn-link"
                            on:click|preventDefault={toggleEditorReply}
                            >Reply</button>
                        {format(
                            parseISO(message.created_at),
                            "dd/MM/yyyy HH:mm"
                        )}
                        {#if message.author}
                            {message.author.name}
                        {/if}
                    </small>
                </p>
            </div>
        {:else}
            <div class="col-md">
                <form on:submit|preventDefault={handleSubmit} class="mt-3 mb-3">
                    <div class="mb-3">
                        <input id="message" type="hidden" name="message" value={message.text} />
                        <trix-editor input="message" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="anonymous" checked={message.is_anonymous}>
                        <label class="form-check-label" for="anonymous">Anonymous</label>
                    </div>
                    <input
                        class="btn btn-sm btn-primary"
                        type="submit"
                        value="Save" />
                    <button
                        on:click|preventDefault={toggleEditor}
                        class="btn btn-link mr-0">
                            Cancel
                    </button>
                </form>
            </div>
        {/if}
    </div>
    {#if showEditorReply}
        <div class="row">
            <div class="col-md">
                <form on:submit|preventDefault={handleReply} class="mt-3 mb-3">
                    <input id="parentMessageId" type="hidden" value={message.id} />
                    <div class="mb-3">
                        <input id="replyMessage" type="hidden" name="replyMessage" value="" />
                        <trix-editor input="replyMessage" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="replyAnonymous" checked>
                        <label class="form-check-label" for="replyAnonymous">Anonymous</label>
                    </div>
                    <input
                        class="btn btn-sm btn-primary"
                        type="submit"
                        value="Send reply" />
                    <button
                        on:click|preventDefault={toggleEditorReply}
                        class="btn btn-link mr-0">
                            Cancel
                    </button>
                </form>
            </div>
        </div>
    {/if}
</div>

{#if message.childs}
    {#each message.childs as child}
        <MessageView
            bind:message={child}
            indent={indent + 1}
            {addMessage}
            {questionId} />
    {/each}
{/if}
