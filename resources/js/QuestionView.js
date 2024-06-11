import SessionQuestionView from './SessionQuestionView.svelte';

const questionViewEl = document.getElementById('QuestionView');

const question = JSON.parse(questionViewEl.dataset.question);

const f = new SessionQuestionView({
    target: questionViewEl,
    props: {
        question: question,
        questionContext: {
            isAnswered: true,
            answerContext: question.answers.reduce((acc, obj) => {
                acc[obj.id] = {
                    isCorrectAnswer: obj.id === question.correct_answer_id,
                };
                return acc;
            }, {}),
        },
        // Set answerChoice to an "invalid" value. We don't
        // have an answer, here we merely want to show the
        // question
        answerChoice: -1,
    }
});
