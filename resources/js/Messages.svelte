<script>
    import debounce from "lodash/debounce";
    import MessageView from "./MessageView.svelte";

    export let questionId;

    var showEditor = false;
    var messages = [];
    var nestedMessages = [];
    var messageInfo = "Loading comments ...";

    $: questionId,
        (() => {
            nestedMessages = [];
            showEditor = false;
            loadMessages();
        })();

    var debounced;

    function loadMessages() {
        messages = [];
        messageInfo = "Loading comments ...";

        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                axios
                    .get("/api/questions/" + questionId + "/messages")
                    .then(function (response) {
                        messages = response.data;
                        if (messages.length === 0) {
                            messageInfo = "No comments yet";
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
        var messages = structuredClone(flatMessages);
        var childs = {};
        var root = [];

        // Assemble a list of childs for each message
        messages.forEach((m) => {
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
                parentID = messages.find((otherm) => otherm.id === m.legacy_parent_message_id).id;
            }

            if (!childs[parentID]) {
                childs[parentID] = [];
            }
            childs[parentID].push(m);
        });

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
        nestedMessages = generateMessageTree(messages);
    }

    function updateMessage(message) {
        // Find the specified message in the list and replace it
        const index = messages.findIndex(obj => obj.id === message.id);
        messages[index] = message;
        nestedMessages = generateMessageTree(messages);
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

<div class="mt-3 mb-3">
    {#each nestedMessages as message (message.id)}
        <MessageView bind:message bind:questionId indent={0} {addMessage} {updateMessage} />
    {:else}
        <p>{messageInfo}</p>
    {/each}

    {#if showEditor}
        <div class="mt-3">
            <form
                action="#"
                on:submit|preventDefault={handleSubmit}
                class="mt-3 mb-3">
                <div class="mb-3">
                    <input id="message" type="hidden" name="message" value="" />
                    <trix-editor input="message" />
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="anonymous" checked>
                    <label class="form-check-label" for="anonymous">Anonymous</label>
                </div>
                <input class="btn btn-sm btn-primary" type="submit" value="Send" />
                <button
                    on:click|preventDefault={toggleEditor}
                    class="btn btn-link mr-0">
                        Cancel
                </button>
            </form>
        </div>
    {:else}
        <button
            on:click|preventDefault={toggleEditor}
            class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-chat-square-dots" /> Add comment
        </button>
    {/if}
</div>
