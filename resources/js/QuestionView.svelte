<script>
    import SessionQuestionView from './SessionQuestionView.svelte';

    // This component merely is a thin wrapper to pass props to
    // SessionQuestionView.svelte as $state rune, i.e. to transform
    // question data into a reactive state object.
    // We also pass a derived questionContext suitable for viewing
    // to make SessionQuestionView reveal the correct answer right
    // away. If the users makes an edit, the context will update.

    let { questionData } = $props();

    var question = $state(questionData);
    var questionContext = $derived.by(() => getQuestionContext(question));
    // Set answerChoice to an "invalid" value. We don't have an answer,
    // here we merely want to show the question
    var answerChoice = $state(-1);

    function getQuestionContext(question) {
        if (!question) {
            return {};
        }
        return {
            isAnswered: true,
            answerContext: question.answers.reduce((acc, obj) => {
                acc[obj.id] = {
                    isCorrectAnswer: obj.id === question.correct_answer_id,
                };
                return acc;
            }, {}),
        };
    }
</script>

<SessionQuestionView bind:question bind:questionContext bind:answerChoice />
