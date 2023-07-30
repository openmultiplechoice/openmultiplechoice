export function sessionProgressPercentage(numQuestions, answerChoices) {
    const numCorrectAnswers = answerChoices.filter(
        (c) => c.is_correct && !c.help_used
    ).length;
    const numCorrectAnswersWithHelp = answerChoices.filter(
        (c) => c.is_correct && c.help_used
    ).length;
    const numIncorrectAnswers = answerChoices.filter(
        (c) => !c.is_correct
    ).length;
    const numUnanswered = numQuestions -
        numCorrectAnswers -
        numCorrectAnswersWithHelp -
        numIncorrectAnswers;

    const percentage = {
        correct: Math.round(100 * (numCorrectAnswers / numQuestions)),
        correctWithHelp: Math.round(100 * (numCorrectAnswersWithHelp / numQuestions)),
        incorrect: Math.round(100 * (numIncorrectAnswers / numQuestions)),
        unanswered: Math.round(100 * (numUnanswered / numQuestions)),

        numCorrectAnswers: numCorrectAnswers,
        numCorrectAnswersWithHelp: numCorrectAnswersWithHelp,
        numIncorrectAnswers: numIncorrectAnswers,
        numUnanswered: numUnanswered,
    };

    // Make sure to have 100% in total
    if (
        percentage.correct +
        percentage.correctWithHelp +
        percentage.incorrect +
        percentage.unanswered !=
        100
    ) {
        if (percentage.unanswered > 0) {
            percentage.unanswered = percentage.unanswered + 1;
        } else if (percentage.incorrect > 0) {
            percentage.incorrect = percentage.incorrect + 1;
        } else if (percentage.correctWithHelp > 0) {
            percentage.incorrectWithHelp = percentage.correctWithHelp + 1;
        } else if (percentage.correct > 0) {
            percentage.correct = percentage.correct + 1;
        }
    }

    return percentage;
};
