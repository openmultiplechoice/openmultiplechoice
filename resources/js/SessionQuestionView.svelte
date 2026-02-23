<script>
    import DOMPurify from "dompurify";
    import _ from 'lodash';
    import hotkeys from "hotkeys-js";

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

    const badgeLetters = "ABCDEFGHIJKLMN";

    let showEditor = $state(false);
    let showHint = $derived(questionContext.isAnswered);
    let shuffledAnswers = $state([]);
    let shuffledForQuestionId = $state(null);
    let lastQuestionId = $state(null);

    const answersWithBadges = $derived.by(() => {
        if (!question?.answers) {
            return [];
        }

        return question.answers.map((answer, index) => ({
            ...answer,
            badgeText: badgeLetters.charAt(index)
        }));
    });

    const displayAnswers = $derived.by(() => {
        if (!question) {
            return [];
        }

        if (question.type === 'mc' && settingsShuffleAnswers && shuffledForQuestionId === question.id) {
            return shuffledAnswers;
        }

        return answersWithBadges;
    });

    $effect(() => {
        const currentQuestionId = question?.id ?? null;
        if (currentQuestionId !== null && currentQuestionId !== lastQuestionId) {
            lastQuestionId = currentQuestionId;
            helpUsed = false;
        }
    });

    $effect(() => {
        if (!question || question.type !== 'mc' || !settingsShuffleAnswers) {
            return;
        }

        if (shuffledForQuestionId !== question.id) {
            shuffledAnswers = _.shuffle(answersWithBadges);
            shuffledForQuestionId = question.id;
        }
    });

    function onQuestionTextClick(event) {
        const li = event.target.closest('li');
        if (li && event.currentTarget.contains(li)) {
            toggleListItemColor(li);
        }
    }

    // Toggle none -> red -> yellow -> green -> none
    function toggleListItemColor(li) {
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
            hotkeys.setScope('editor');
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
            hotkeys.setScope('questions');
            // Close the editor
            showEditor = doShow;

            // If the editor is closed and the question type is mc
            // reset the shuffled answers to include changed answer texts
            if (settingsShuffleAnswers && question?.type === 'mc') {
                shuffledAnswers = [];
                shuffledForQuestionId = null;
            }
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
                        <p id="questionText" class="trix-content" onclick={onQuestionTextClick}>{@html DOMPurify.sanitize(question.text)}</p>
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
                        onclick={() => {
                            showHint = true;
                            helpUsed = true;
                        }}
                        type="button"
                        class="btn btn-outline-secondary btn-sm mb-3"
                        ><i class="bi bi-question-circle"></i> Show hint</button>
                {/if}
            {/if}
            {#if question.type === "mc"}
                {#each displayAnswers as answer, index (answer.id)}
                    <SessionAnswerView
                        answer={answer}
                        answerContext={questionContext.answerContext[answer.id]}
                        examMode={examMode}
                        settingsShowAnswerStats={settingsShowAnswerStats}
                        {submitAnswer}
                        questionIsAnswered={questionContext.isAnswered}
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
                                        onclick={deleteAnswer}>
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
                                    onclick={toggleEditor}>
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
                        <AddToDeckDialog
                            questionId={question.id}
                            bind:questionAddToDeckIncludedCount={question.add_to_deck_included_count} />
                    {/key}
                </div>
            </div>

            {#if !questionContext.isAnswered && !examMode && !(question.type === 'card')}
                <div class="mt-3">
                    <button
                        onclick={() => {submitAnswer(null)}}
                        type="button"
                        class="btn btn-outline-secondary btn-sm">&rightarrow; Show answer</button>
                </div>
            {/if}

        </div>
    {/if}
{:else}
    <p>Loading ...</p>
{/if}
