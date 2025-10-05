import Messages from './Messages.svelte';
import { mount } from "svelte";

const messagesViewEl = document.getElementById('MessagesView');

const f = mount(Messages, {
    target: messagesViewEl,
    props: {
        questionId: messagesViewEl.dataset.questionId,
        // The Messages component loads comments for the question if the
        // question is answered. `Messages.js` is used in question views
        // where we want to show the comments right away.
        questionContext: {
            isAnswered: true,
        },
    }
});
