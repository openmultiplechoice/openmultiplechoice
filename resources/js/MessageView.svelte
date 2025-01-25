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

    $: userThumb = message.thumbs.find((entry) => entry.user_id !== undefined) ?? null

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
        // If the user already clicked thumb up/down on the message..
        if (userThumb !== null) {
            // ..and the thumb is the same as the previous one, delete the thumb up/down:
            if (userThumb.type === type) {
                axios
                    .delete("/api/messages/" + message.id + "/thumbs/" + userThumb.id)
                    .then(function(response) {
                        // Remove the thumb from the thumbs array in the local copy
                        message.thumbs = message.thumbs.filter((entry) => entry.user_id === undefined);
                        if (type === "up") {
                            message.thumbs_up_count -= 1;
                        } else {
                            message.thumbs_down_count -= 1;
                        }
                        updateMessage(message);
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            // ..and the thumb is different from the previous one, update the thumb up/down:
            } else {
                axios
                    .put("/api/messages/" + message.id + "/thumbs/" + userThumb.id, { type: type })
                    .then(function(response) {
                        // Persist the new thumb in the thumbs array in the local copy
                        message.thumbs.find((entry) => entry.user_id !== undefined).type = type;
                        if (type === "up") {
                            message.thumbs_up_count += 1;
                            message.thumbs_down_count -= 1;
                        } else {
                            message.thumbs_down_count += 1;
                            message.thumbs_up_count -= 1;
                        }
                        updateMessage(message);
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            }
        // If the user has not clicked thumb up/down on the message yet, add the thumb up/down:
        } else {
            axios
                .post("/api/messages/" + message.id + "/thumbs", { type: type })
                .then(function(response) {
                    // Persist the new thumb in the thumbs array in the local copy
                    message.thumbs.push({
                        "type": response.data.type,
                        "user_id": response.data.user_id,
                        "id": response.data.id
                    });
                    if (type === "up") {
                        message.thumbs_up_count += 1;
                    } else {
                        message.thumbs_down_count += 1;
                    }
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
                        <p class="rounded-2 bg-light p-2 mb-0 text-break">
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
                            <div class="d-flex align-items-center py-1">
                                {#if !message.is_deleted}
                                    <div class="d-flex rounded-4 align-items-center bg-light ms-auto px-2">
                                        <button class="btn mx-0 ps-0 pe-1"
                                                on:click|preventDefault={() => handleThumb("up")}>
                                                <i class="bi"
                                                    class:bi-hand-thumbs-up-fill={userThumb?.type === "up"}
                                                    class:bi-hand-thumbs-up={!(userThumb?.type === "up")}></i>
                                        </button>
                                        <span class="pe-1 font-monospace">{message.thumbs_up_count}</span>
                                        <span class="px-1">|</span>
                                        <button class="btn mx-0 px-1"
                                                on:click|preventDefault={() => handleThumb("down")}>
                                                <i class="bi"
                                                    class:bi-hand-thumbs-down-fill={userThumb?.type === "down"}
                                                    class:bi-hand-thumbs-down={!(userThumb?.type === "down")}></i>
                                        </button>
                                        <span class="pe-1 font-monospace">{message.thumbs_down_count}</span>
                                    </div>
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
                                    <i class="bi bi-incognito ps-2" title="anonymous"></i>
                                {:else if message.author && !message.is_deleted}
                                    <strong>
                                        <span class="ps-2"> {message.author.public_name ? message.author.public_name : message.author.name}</span>
                                    </strong>
                                {/if}
                            </div>
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
