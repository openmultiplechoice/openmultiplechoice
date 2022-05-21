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
                    var flatMessages = response.data;
                    if (flatMessages.length === 0) {
                        messageInfo = 'No comments yet';
                        return;
                    }
                    messages = generateMessageTree(flatMessages);
                })
                .catch(function (error) {
                    alert(error);
                });
        }, 1000, { 'maxWait': 2000 });

        debounced();
    }

    // generateMessageTree takes a flat list of messages and builds a
    // message object tree according to the parent relationship of the
    // messages
    function generateMessageTree(messages) {
        var childs = {};
        var root = [];

        // Assemble a list of childs for each message
        messages.forEach(m => {
            if (!m.parent_message_id && !m.legacy_parent_message_id) {
                // A top-level message, add to tree and continue
                root.push(m);
                return;
            }

            var parentID = m.parent_message_id ? m.parent_message_id : m.legacy_parent_message_id;
            if (!childs[parentID]) {
                childs[parentID] = [];
            }
            childs[parentID].push(m);
        })

        function addChilds(m) {
            var parentID = m.legacy_message_id ? m.legacy_message_id : m.id;
            if (childs[parentID]) {
                m.childs = childs[parentID];
                m.childs.forEach(m => {
                    addChilds(m);
                });
            }
        }

        root.forEach(m => {
            addChilds(m);
        });

        return root;
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
        <MessageView bind:message indent={0} />
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
