import Messages from './Messages.svelte';

const messagesViewEl = document.getElementById('MessagesView');

const f = new Messages({
    target: messagesViewEl,
    props: {
        questionId: messagesViewEl.dataset.questionId,
    }
});
