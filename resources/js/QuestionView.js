import QuestionView from './QuestionView.svelte';
import { mount } from "svelte";

const questionViewEl = document.getElementById('QuestionView');

const questionData = JSON.parse(questionViewEl.dataset.question);

const f = mount(QuestionView, {
    target: questionViewEl,
    props: {
        questionData: questionData,
    }
});
