<script>
    import DOMPurify from "dompurify";
    import { format, parseISO } from "date-fns";
    import MessageView from "./MessageView.svelte";
    import { UserSettings } from "./UserSettingsStore.js";

    export let message;
    export let indent;
    export let addMessage;
    export let updateMessage;
    export let questionId;

    $: num_upvotes = message.thumbs.filter((vote) => vote.thumb === "up").length ?? 0
    $: num_downvotes = message.thumbs.filter((vote) => vote.thumb === "down").length ?? 0
    $: user_vote = message.thumbs.find((entry) => entry.user_id !== undefined) ?? null

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
                message.is_anonymous = response.data.is_anonymous;
                updateMessage(message);
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
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }
        axios
            .delete("/api/messages/" + message.id)
            .then(function (response) {
                message.text = "";
                message.is_deleted = true;
                updateMessage(message);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleThumb(type) {
        // If the user already voted on the message:
        if (user_vote !== null) {
            // and the vote is the same as the one they clicked, delete the vote
            if (user_vote.thumb === type) {
                axios
                    .delete("/api/messages/" + message.id + "/thumbs/" + user_vote.id)
                    .then(function(response) {
                        // update the thumbs array to remove the user's vote in the local copy
                        message.thumbs = message.thumbs.filter((entry) => entry.user_id === undefined);
                        updateMessage(message);
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            // if the vote is different, update the vote
            } else {
                axios
                    .put("/api/messages/" + message.id + "/thumbs/" + user_vote.id, { type: type })
                    .then(function(response) {
                        // update the thumbs array to update the user's vote in the local copy
                        message.thumbs.find((entry) => entry.user_id !== undefined).thumb = type;
                        updateMessage(message);
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            }
        // If the user hasn't voted on the message yet, create a new vote
        } else {
            axios
                .post("/api/messages/" + message.id + "/thumbs", { type: type })
                .then(function(response) {
                    // add the new vote to the thumbs array in the local copy
                    message.thumbs.push({
                        "thumb": response.data.type,
                        "user_id": response.data.user_id,
                        "id": response.data.id
                    });
                    updateMessage(message);
                })
                .catch(function(error) {
                    alert(error);
                });
        }
    }
</script>

{#if !message.is_deleted || (message.is_deleted && message.childs)}
    <div class="mt-1 mb-1">
        <div class="row">
            {#if !showEditor}
                <div class="col-md offset-md-{indent}">
                    {#if !message.is_deleted}
                        <p class="rounded-2 bg-light p-2 mb-0">
                            {#if message.text}
                                {@html DOMPurify.sanitize(message.text)}
                            {/if}
                        </p>
                    {:else}
                        <p class="rounded-2 bg-light-subtle p-1 mb-0 text-muted">
                            <small><i>deleted</i></small>
                        </p>
                    {/if}
                    <p class="text-muted text-end mb-0">
                        <small>
                            {#if !message.is_deleted}
                                {num_upvotes}
                                <button class="btn"
                                        on:click|preventDefault={() => handleThumb("up")}>
                                        <i class="bi"
                                            class:bi-hand-thumbs-up-fill={user_vote?.thumb === "up"}
                                            class:bi-hand-thumbs-up={!(user_vote?.thumb === "up")}></i>
                                </button>
                                {num_downvotes}
                                <button class="btn"
                                        on:click|preventDefault={() => handleThumb("down")}>
                                        <i class="bi"
                                            class:bi-hand-thumbs-down-fill={user_vote?.thumb === "down"}
                                            class:bi-hand-thumbs-down={!(user_vote?.thumb === "down")}></i>
                                </button>
                                {#if $UserSettings.id === message.author_id}
                                    <button
                                        class="btn btn-sm btn-link link-dark"
                                        on:click|preventDefault={toggleEditor}
                                        >Edit</button>
                                    <button
                                        class="btn btn-sm btn-link link-dark"
                                        on:click|preventDefault={handleDelete}
                                        >Delete</button>
                                {/if}
                                <button
                                    class="btn btn-sm btn-link link-dark"
                                    on:click|preventDefault={toggleEditorReply}
                                    >Reply</button>
                            {/if}
                            {format(
                                parseISO(message.created_at),
                                "dd.MM.yyyy HH:mm"
                            )}
                            {#if message.is_anonymous}
                                <i class="bi bi-incognito" title="anonymous"></i>
                            {:else if message.author && !message.is_deleted}
                                <strong>
                                    {message.author.public_name ? message.author.public_name : message.author.name}
                                </strong>
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
{/if}

{#if message.childs}
    {#each message.childs as child}
        <MessageView
            bind:message={child}
            indent={indent + 1}
            {addMessage}
            {updateMessage}
            {questionId} />
    {/each}
{/if}
