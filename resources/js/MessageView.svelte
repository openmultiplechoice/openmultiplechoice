<script>
    import DOMPurify from "dompurify";
    import { format, parseISO, formatDistance } from "date-fns";
    import hotkeys from "hotkeys-js";

    import { UserSettings } from "./UserSettingsStore.js";
    import MessageView from "./MessageView.svelte";

    let {
        message = $bindable(),
        indent,
        addMessage,
        updateMessage,
        questionId = $bindable(),
    } = $props();

    let userThumb = $derived(message.thumbs.find((entry) => entry.user_id !== undefined) ?? null)

    let hasHighRating = $derived((message.thumbs_up_count - message.thumbs_down_count) > 4);
    let hasLowRating = $derived((message.thumbs_up_count - message.thumbs_down_count) < -2);

    var showEditor = $state(false);
    var showEditorReply = $state(false);
    var showLowRated = $state(false);

    function toggleEditor() {
        showEditor = !showEditor;
        if (showEditor) {
            hotkeys.setScope('editor');
        } else {
            hotkeys.setScope('questions');
        }
    }

    function toggleEditorReply() {
        showEditorReply = !showEditorReply;
        if (showEditorReply) {
            hotkeys.setScope('editor');
        } else {
            hotkeys.setScope('questions');
        }
    }

    function toggleLowRated() {
        showLowRated = !showLowRated;
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
                message.updated_at = response.data.updated_at;
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

    function hasChildren(message) {
        // Make sure the message has children and at least one of them in any level is not deleted
        if (!Array.isArray(message.childs)) return false;
        return message.childs.some(child =>
            !child.is_deleted || hasChildren(child)
        );
    }
</script>

{#if !message.is_deleted || hasChildren(message)}
    <div class="border-start border-2" class:ms-2={indent > 0} class:mb-3={!indent}>
        {#if message.is_deleted}
            <div class="p-2">
                <span class="text-muted small">
                    <i class="bi bi-trash me-1"></i>This comment has been deleted.
                </span>
            </div>
        {:else if hasLowRating && !showLowRated}
            <div class="p-2">
                <button class="btn btn-link btn-sm text-muted p-0" onclick={toggleLowRated}>
                    <i class="bi bi-eye-slash me-1"></i>Comment hidden due to low rating. Click to show.
                </button>
            </div>
        {:else}
            <div class="d-flex gap-1 mb-2 message-content {hasHighRating ? 'bg-light rounded-end-3 shadow-sm py-2 ps-1 pe-2 ms-1' : 'py-1 rounded-end-3'}">
                <div class="d-flex flex-column gap-1" style="min-width: 2rem">
                    <button class="btn btn-link p-0 text-muted text-decoration-none" class:disabled={message.is_deleted} onclick={() => handleThumb("up")}>
                        <i class="bi" class:bi-hand-thumbs-up-fill={userThumb?.type === "up"} class:bi-hand-thumbs-up={!(userThumb?.type === "up")}></i>
                    </button>
                    <span class="text-center text-muted small">
                        {message.thumbs_up_count - message.thumbs_down_count}
                    </span>
                    <button class="btn btn-link p-0 text-muted text-decoration-none" class:disabled={message.is_deleted} onclick={() => handleThumb("down")}>
                        <i class="bi" class:bi-hand-thumbs-down-fill={userThumb?.type === "down"} class:bi-hand-thumbs-down={!(userThumb?.type === "down")}></i>
                    </button>
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex gap-2 text-muted small">
                        {#if indent > 0}
                            <i class="bi bi-arrow-return-right" title="Answer" />
                            <span>•</span>
                        {/if}
                        <span>
                            {#if message.is_anonymous}
                                <i class="bi bi-incognito" title="Anonymous"></i>
                            {:else if message.author}
                                {message.author.public_name || message.author.name}
                            {/if}
                        </span>
                        <span>•</span>
                        <span title={format(parseISO(message.created_at), "dd.MM.yyyy HH:mm")}>
                            {formatDistance(parseISO(message.created_at), new Date(), { addSuffix: true })}
                            {#if message.updated_at !== message.created_at}
                                <i class="bi bi-pencil ms-1" title={"Edited " + format(parseISO(message.updated_at), "dd.MM.yyyy HH:mm")}></i>
                            {/if}
                        </span>
                    </div>
                    <div class="mt-1">
                        {#if !showEditor}
                            <div class="trix-content pe-4">
                                {#if message.text}
                                    {@html DOMPurify.sanitize(message.text)}
                                {/if}
                            </div>
                        {:else}
                            <div class="pe-2">
                                <input id="message" type="hidden" name="message" value={message.text} />
                                <trix-editor input="message" class="trix-content form-control mb-2" style="min-height: 4rem;" />
                                <div class="d-flex justify-content-between pb-1">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="anonymous" checked={message.is_anonymous}>
                                        <label class="form-check-label small" for="anonymous">Anonymous</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-link btn-sm text-muted text-decoration-none p-0" onclick={toggleEditor}>Cancel</button>
                                        <button class="btn btn-primary btn-sm py-0" onclick={handleSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                {#if !showEditor}
                    <div class="d-flex align-items-end gap-2 pe-1">
                        <button class="btn btn-link p-0 text-muted me-1" title="Reply" onclick={toggleEditorReply} class:disabled={showEditorReply}>
                            <i class="bi bi-reply"></i>
                        </button>
                        {#if $UserSettings.id === message.author_id}
                            <div class="dropdown">
                                <button class="btn btn-link p-0 text-muted me-1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button class="dropdown-item btn btn-sm" onclick={toggleEditor}>
                                            <i class="bi bi-pencil me-2"></i>Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item btn btn-sm" onclick={handleDelete}>
                                            <i class="bi bi-trash me-2"></i>Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
        {#if showEditorReply}
            <div class="border-start border-2 my-2 ms-2 ps-2">
                <div class="d-flex gap-2 text-muted small mb-2">
                    <i class="bi bi-arrow-return-right" title="Answer" />
                    Replying to
                    {#if message.is_anonymous}
                        <i class="bi bi-incognito" title="Anonymous"></i>
                    {:else if message.author}
                        {message.author.public_name || message.author.name}
                    {/if}
                </div>
                <div>
                    <input id="replyMessage" type="hidden" name="replyMessage" />
                    <input id="parentMessageId" type="hidden" name="parentMessageId" value={message.id} />
                    <trix-editor input="replyMessage" class="trix-content form-control mb-2" style="min-height: 4rem;" />
                    <div class="d-flex justify-content-between">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="replyAnonymous" checked>
                            <label class="form-check-label small" for="replyAnonymous">Anonymous</label>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-link btn-sm text-muted text-decoration-none p-0" onclick={toggleEditorReply}>Cancel</button>
                            <button class="btn btn-primary btn-sm py-0" onclick={handleReply}>Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {#if message.childs}
            {#each message.childs as child}
                <MessageView
                    message={child}
                    indent={indent + 1}
                    {addMessage}
                    {updateMessage}
                    {questionId}
                />
            {/each}
        {/if}
    </div>
{/if}
