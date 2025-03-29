<script>
    import { run, preventDefault } from 'svelte/legacy';

    import DOMPurify from "dompurify";
    import _ from 'lodash';

    import SessionAnswerView from "./SessionAnswerView.svelte";
    import SessionCardAnswerView from "./SessionCardAnswerView.svelte";
    import SessionNoAnswerView from "./SessionNoAnswerView.svelte";
    import SessionImageView from "./SessionImageView.svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import AddToDeckDialog from "./AddToDeckDialog.svelte";

    let {
        deckId,
        question = $bindable(),
        questionContext = $bindable(),
        helpUsed = $bindable(),
        answerChoice = $bindable(),
        submitAnswer,
        deleteAnswer,
        examMode = $bindable(),
        updateCurrentQuestionData,
        settingsShuffleAnswers = $bindable(),
        settingsShowAnswerStats = $bindable()
    } = $props();

    var showEditor = $state(false);
    var showHint = $state(questionContext.isAnswered);

    run(() => {
        question,
            (() => {
                showHint = questionContext.isAnswered;
                helpUsed = questionContext.isAnswered;
            })();
    });
    // For all list elements in the question text, add an event handler
    // to toggle the background color. This is helpful for multiple
    // choice questions where users have to choose under a variety of
    // answer options.
    run(() => {
        question, (() => {
            var listItems = document.querySelectorAll("#questionText li");
            [].map.call(listItems, function(item) {
                item.addEventListener('click', toggleListItemColor, false);
            });
        })();
    });
    run(() => {
        question, (() => {
            // Give each answer a label starting from `A`. Since we want answers
            // to always get the same label, we do this here before we shuffle
            // the answers (if shuffling is enabled).
            question.answers.forEach((answer, index) => {
                answer.badgeText = "ABCDEFGHIJKLMN".charAt(index);
            });
            // Only shuffle if answer shuffling is enabled and if the question
            // is not already answered, otherwise the answers would be shuffled
            // a second time after the answer was submitted.
            if (question && question.type === 'mc' && settingsShuffleAnswers
                && !questionContext.isAnswered
                && !Object.values(questionContext.answerContext).some(ac => ac.isSelectedAnswer)) {
                question.answers = _.shuffle(question.answers);
            }
        })();
    });

    // Toogle none -> red -> yellow -> green -> none
    function toggleListItemColor(event) {
        const li = event.target;
        if (!li.classList.contains('bg-danger-subtle') &&
            !li.classList.contains('bg-warning-subtle') &&
            !li.classList.contains('bg-success-subtle')) {

            li.classList.add('bg-success-subtle');
        } else if (li.classList.contains('bg-success-subtle')) {
            li.classList.remove('bg-success-subtle');
            li.classList.add('bg-danger-subtle');
        } else if (li.classList.contains('bg-danger-subtle')) {
            li.classList.remove('bg-danger-subtle');
            li.classList.add('bg-warning-subtle');
        } else if (li.classList.contains('bg-warning-subtle')) {
            li.classList.remove('bg-warning-subtle');
        }
    }

    function toggleEditor() {
        const doShow = !showEditor;
        if (doShow) {
            if (updateCurrentQuestionData) {
                // First, update the question data to the latest
                // to avoid overwriting changes made by other users,
                // then show the editor
                updateCurrentQuestionData().then(() => {
                    showEditor = doShow;
                });
            } else {
                showEditor = doShow;
            }
        } else {
            // Close the editor
            showEditor = doShow;
        }
    }
</script>

{#if question}
    {#if showEditor}
        <div class="my-4 pt-1 pb-1 border-dark" style="border-top: dotted; border-bottom: dotted; border-width: 1px;">
            <QuestionForm bind:question {toggleEditor} />
        </div>
    {:else}
        <div id="question{question.id}"
            class="px-2 py-2 border rounded-3 shadow-sm bg-light-subtle"
            style="">
            {#if question.is_invalid}
                <div class="row">
                    <div class="col">
                        <div class="alert alert-light" role="alert">
                            <i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!
                        </div>
                    </div>
                </div>
            {/if}
            {#if question.needs_review}
                <div class="row">
                    <div class="col">
                        <div class="alert alert-light" role="alert">
                            <i class="bi bi-eraser-fill"></i> <strong>Question needs review</strong> - Please review the question and answer choices and make sure they are correct and clear. Afterwards, remove the "Needs review" flag.
                        </div>
                    </div>
                </div>
            {/if}
            {#if question.case}
                <div style="box-shadow: 4px 4px rgba(0,0,0,.2);"
                    class="alert alert-secondary" role="alert">
                    <p class="small fw-bold"><i class="bi bi-clipboard2-pulse"></i> CASE</p>
                    <p class="trix-content">{@html DOMPurify.sanitize(question.case.text)}</p>
                </div>
            {/if}
            <div class="row border-start border-3 border-dark m-1 mb-3 pt-2">
                {#if question.text}
                    <div class="col-lg">
                        <p id="questionText" class="trix-content">{@html DOMPurify.sanitize(question.text)}</p>
                    </div>
                {/if}
                {#if question.images && question.images.length > 0}
                    <SessionImageView bind:images={question.images} />
                {/if}
            </div>
            {#if !examMode && question.hint}
                {#if showHint}
                    <div
                        class="row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3">
                        <p>{@html DOMPurify.sanitize(question.hint)}</p>
                    </div>
                {:else}
                    <button
                        onclick={preventDefault(() => {
                            showHint = true;
                            helpUsed = true;
                        })}
                        type="button"
                        class="btn btn-outline-secondary btn-sm mb-3"
                        ><i class="bi bi-question-circle"></i> Show hint</button>
                {/if}
            {/if}
            {#if question.type === "mc"}
                {#each question.answers as answer, index (answer.id)}
                    <SessionAnswerView
                        bind:answer={question.answers[index]}
                        bind:answerContext={questionContext.answerContext[answer.id]}
                        bind:examMode={examMode}
                        bind:settingsShowAnswerStats={settingsShowAnswerStats}
                        {submitAnswer}
                        bind:questionIsAnswered={questionContext.isAnswered}
                        answerNumber={index+1} />
                {/each}
            {:else}
                {#if question.answers.length === 0}
                    <SessionNoAnswerView {submitAnswer} hasAnswer={!!answerChoice} />
                {:else}
                    <SessionCardAnswerView
                        bind:answer={question.answers[0]}
                        {submitAnswer}
                        hasAnswer={!!answerChoice} />
                {/if}
            {/if}
            {#if !examMode && questionContext.isAnswered && question.comment}
                <div class="row">
                    <div class="col">
                        <div class="alert alert-secondary mt-1 trix-content" role="alert">
                            {@html DOMPurify.sanitize(question.comment)}
                        </div>
                    </div>
                </div>
            {/if}
            <div class="row mt-1 mb-1 pt-2">
                <div class="d-flex justify-content-end">
                    <div class="btn-group me-1">
                        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            More
                        </button>
                        <ul class="dropdown-menu">
                            {#if questionContext.isAnswered && answerChoice !== -1}
                                <li>
                                    <button type="button" class="dropdown-item btn btn-sm"
                                        onclick={preventDefault(deleteAnswer)}>
                                        <i class="bi bi-arrow-counterclockwise"></i> Reset answer
                                    </button>
                                </li>
                            {/if}
                            <li>
                                <a class="dropdown-item btn btn-sm" href="/questions/{question.id}" target="_blank" role="button">
                                    <i class="bi bi-box-arrow-up-right"></i> Open in new tab
                                </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <button type="button" class="dropdown-item btn btn-sm"
                                    onclick={preventDefault(toggleEditor)}>
                                    <i class="bi bi-pencil"></i> Edit question
                                </button>
                            </li>
                            {#if deckId}
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item btn btn-sm" href="/decks/{deckId}/questions/edit?question_id={question.id}" role="button">
                                        <i class="bi bi-collection"></i> Open in deck editor
                                    </a>
                                </li>
                            {/if}
                        </ul>
                    </div>
                    {#key question.id}
                        <AddToDeckDialog questionId={question.id} />
                    {/key}
                </div>
            </div>

            {#if !questionContext.isAnswered && !examMode && !(question.type === 'card')}
                <div class="mt-3">
                    <button
                        onclick={preventDefault(() => submitAnswer())}
                        type="button"
                        class="btn btn-outline-secondary btn-sm">&rightarrow; Show answer</button>
                </div>
            {/if}

        </div>
    {/if}
{:else}
    <p>Loading ...</p>
{/if}
