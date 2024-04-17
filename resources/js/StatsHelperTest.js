import sessionProgressPercentage from "./StatsHelper.js";


const answerChoices = [
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },

    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: false },
    { is_correct: true, help_used: true },
    { is_correct: true, help_used: true },

    { is_correct: false, help_used: false },
    { is_correct: false, help_used: false },
    { is_correct: false, help_used: false },
    { is_correct: false, help_used: false },
    { is_correct: false, help_used: false },
];

const p = sessionProgressPercentage(answerChoices.length, answerChoices);

console.debug(p.correct);
console.debug(p.correctWithHelp)
console.debug(p.incorrect);
console.debug(p.unanswered);

