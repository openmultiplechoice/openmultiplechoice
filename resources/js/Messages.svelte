<script>
    import { run, preventDefault } from 'svelte/legacy';

    import debounce from "lodash/debounce";
    import MessageView from "./MessageView.svelte";

    const Status = {
        LOADING: "loading",
        EMPTY: "empty"
    };

    let { questionId = $bindable(), questionContext } = $props();

    var showEditor = $state(false);
    var messages = $state([]);
    var nestedMessages = $state([]);
    var loadingStatus = $state(Status.LOADING);

    run(() => {
        questionId,
            (() => {
                nestedMessages = [];
                showEditor = false;
                loadMessages();
            })();
    });

    var debounced;

    function loadMessages() {
        messages = [];
        loadingStatus = Status.LOADING;

        if (debounced) {
            debounced.cancel();
        }

        // We can encounter a race condition if the axios request for loading
        // comments is in progress when the question is changed by the user.
        // Capture the current question ID and drop the loaded comments below
        // if the question ID has changed since the request was made, otherwise
        // we update the DOM with wrong data.
        const requestQuestionId = questionId;

        debounced = debounce(
            () => {
                axios
                    .get("/api/questions/" + questionId + "/messages")
                    .then(function (response) {
                        if (requestQuestionId !== questionId) {
                            // Ignore this response, as the questionId has changed
                            return;
                        }
                        messages = response.data;
                        if (messages.filter(m => !m.is_deleted).length === 0) {
                            nestedMessages = [];
                            loadingStatus = Status.EMPTY;
                            return;
                        }
                        nestedMessages = generateMessageTree(messages);
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            },
            1000,
            { maxWait: 2000 }
        );

        debounced();
    }

    // generateMessageTree takes a flat list of messages and builds a
    // message object tree according to the parent relationship of the
    // messages
    function generateMessageTree(flatMessages) {
        var childs = {};
        var root = [];

        // Assemble a list of childs for each message
        flatMessages.forEach((m) => {
            if (!m.parent_message_id && !m.legacy_parent_message_id) {
                // A top-level message, add to tree and continue
                root.push(m);
                return;
            }

            // This message has a parent, i.e. it is a child of a
            // previous message. Add it to the list of childs for
            // said message

            var parentID = m.parent_message_id;
            if (!parentID) {
                // For legacy messages, the parent is identified by
                // the legacy_parent_message_id field. But we want
                // to use parent_message_id, i.e. the ID of the parent
                // message in the current data and not the imported
                // legacy ID
                const parentMessage = flatMessages.find((otherm) => otherm.legacy_message_id === m.legacy_parent_message_id);
                if (parentMessage) {
                    parentID = parentMessage.id;
                } else {
                    // This should not happen as we filter out root
                    // messages above, i.e. all messages should have
                    // a parent
                    console.error("Parent message not found for message", m);
                }
            }

            if (!childs[parentID]) {
                childs[parentID] = [];
            }
            childs[parentID].push(m);
        });

        // Sort child arrays by thumbs count
        Object.values(childs).forEach(childArray => {
            childArray.sort((a, b) =>
                (b.thumbs_up_count - b.thumbs_down_count) - (a.thumbs_up_count - a.thumbs_down_count)
            );
        });

        // Sort root messages by thumbs count
        root.sort((a, b) =>
            (b.thumbs_up_count - b.thumbs_down_count) - (a.thumbs_up_count - a.thumbs_down_count)
        );

        // Now that we have a list of childs for each message,
        // add them to their respective parent message objects

        function addChilds(m) {
            var parentID = m.id;
            if (childs[parentID]) {
                m.childs = childs[parentID];
                m.childs.forEach((m) => {
                    addChilds(m);
                });
            }
        }

        root.forEach((m) => {
            addChilds(m);
        });

        return root;
    }

    function addMessage(message) {
        messages.push(message);
        // TODO a newly submitted message isn't necessarily placed at the bottom of the page anymore (out of users view, bad UX)
        nestedMessages = generateMessageTree(messages);
    }

    function updateMessage(message) {
        // Find the specified message in the list and replace it
        const index = messages.findIndex(obj => obj.id === message.id);
        messages[index] = message;
        // Only update the message but don't regenerate the tree to not confuse the user with reordering and jumping messages
        nestedMessages = updateMessageInTree(nestedMessages, message);
    }

    function updateMessageInTree(messageList, updatedMessage) {
        return messageList.map(message => {
            if (message.id === updatedMessage.id) {
                return { ...updatedMessage, childs: message.childs };
            }
            if (message.childs) {
                return { ...message, childs: updateMessageInTree(message.childs, updatedMessage) };
            }
            return message;
        });
    }

    function handleSubmit() {
        var newMessage = {
            text: document.getElementById("message").value,
            is_anonymous: document.getElementById("anonymous").checked,
        };
        axios
            .post("/api/questions/" + questionId + "/messages", newMessage)
            .then(function (response) {
                toggleEditor();
                messages.push(response.data);
                nestedMessages = generateMessageTree(messages);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function toggleEditor() {
        showEditor = !showEditor;
    }
</script>

{#if questionContext.isAnswered}
    <div class="mt-4 mb-3 px-2 py-2 border rounded-3 shadow-sm bg-white">
        {#each nestedMessages as message, i (message.id)}
            <MessageView bind:message={nestedMessages[i]} bind:questionId indent={0} {addMessage} {updateMessage} />
        {:else}
            <div class="mb-3 d-flex justify-content-center">
                {#if loadingStatus === Status.LOADING}
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading messages ...</span>
                    </div>
                {:else if loadingStatus === Status.EMPTY}
                    <div class="text-muted">
                        No comments yet. Be the first to leave a comment!
                    </div>
                {/if}
            </div>
        {/each}

        {#if showEditor}
            <div class="mt-3 border-top border-2 pt-3">
                <input id="message" type="hidden" name="message" value="" />
                <trix-editor input="message" class="trix-content form-control mb-2" style="min-height: 4rem;" />
                <div class="d-flex justify-content-between pb-1">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="anonymous" checked>
                        <label class="form-check-label small" for="anonymous">Anonymous</label>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-link btn-sm text-muted text-decoration-none p-0" onclick={toggleEditor}>Cancel</button>
                        <button class="btn btn-primary btn-sm py-0" onclick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        {:else}
            <button
                onclick={preventDefault(toggleEditor)}
                class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-chat-square-text"></i> Add comment
            </button>
        {/if}
    </div>
{/if}
