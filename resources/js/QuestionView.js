import SessionQuestionView from './SessionQuestionView.svelte';

const questionViewEl = document.getElementById('QuestionView');

const f = new SessionQuestionView({
    target: questionViewEl,
    props: {
        question: JSON.parse(questionViewEl.dataset.question),
        questionAnswered: true,
        // Set answerChoice to an "invalid" value. We don't
        // have an answer, here we merely want to show the
        // question
        answerChoice: -1,
    }
});
