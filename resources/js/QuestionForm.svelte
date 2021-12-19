<script>
    import debounce from 'lodash/debounce';
    import { onMount } from 'svelte';
    import AnswerForm from './AnswerForm.svelte';

    export let question;
    export let toggleEditor;

    var correctAnswerId = question.correct_answer_id;
    $: correctAnswerId, updateCorrectAnswer();

    onMount(() => {
        document.getElementById('editor-question' + question.id).addEventListener('trix-change', function() {
            question.text = document.getElementById('question' + question.id).value;
            handleChange();
        });
    });

    function updateCorrectAnswer() {
        if (correctAnswerId === question.correct_answer_id) {
            return;
        }
        question.correct_answer_id = correctAnswerId;
        axios.put('/api/questions/' + question.id, question)
            .then(function (response) {})
            .catch(function (error) {
                alert(error);
            });
    }

    var debounced;

    function handleChange() {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(() => {
            axios.put('/api/questions/' + question.id, question)
                .then(function (response) {})
                .catch(function (error) {
                    alert(error);
                });
        }, 500, { 'maxWait': 2000 });

        debounced();
    }

    function handleImageAdd() {
        var formData = new FormData();
        var imageFile = document.getElementById('imageInput' + question.id);
        formData.set('image', imageFile.files[0]);
        axios.post('/api/questions/' + question.id + '/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(function (response) {
                imageFile.value = '';
                var image = response.data;
                question.images = [...question.images, image];
            })
            .catch(function (error) {
                imageFile.value = '';
                alert(error);
            });
    }

    function handleImageRemove(imageId) {
        axios.delete('/api/images/' + imageId)
            .then(function (response) {
                question.images = question.images.filter(i => i.id !== imageId);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function newAnswerObj() {
        return {
            id: null,
            text: "",
        };
    }

    function handleAnswerAdd() {
        var newAnswer = newAnswerObj();

        axios.post('/api/questions/' + question.id + '/answers', newAnswer)
            .then(function (response) {
                newAnswer.id = response.data.id;
                question.answers = [...question.answers, newAnswer];
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function handleAnswerRemove(answerId) {
        axios.delete('/api/answers/' + answerId)
            .then(function (response) {
                question.answers = question.answers.filter(a => a.id !== answerId);
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="border rounded bg-light p-2">

    <form action="#" on:submit|preventDefault={handleChange} class="mt-3">

        <button type="button" on:click|preventDefault={toggleEditor} class="btn btn-outline-secondary btn-small">Close</button>

        <hr>

        <div class="mt-3 mb-3">
            <input id="question{question.id}" type="hidden" bind:value={question.text}>
            <trix-editor id="editor-question{question.id}" input="question{question.id}"></trix-editor>
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Add image</label>
            <input on:input={handleImageAdd} class="form-control" type="file" id="imageInput{question.id}" name="image">
        </div>

    </form>

    <div class="row row-cols-1 row-cols-lg-3 g4">
        {#each question.images as image (image.id)}
            <div class="col">
                <div class="card" style="width: 18rem">
                    <div class="card-header bg-transparent"><button on:click|preventDefault={() => { handleImageRemove(image.id) }} type="button" class="btn-close"></button></div>
                    <img src="/{image.path}" class="card-img-top" alt="">
                    {#if image.comment }
                        <div class="card-body">
                            <p class="card-text">
                                {image.comment}
                            </p>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    {#each question.answers as answer (answer.id)}
        <AnswerForm bind:answer={answer} />
        <div class="text-end mb-2">
            <input type="radio" class="btn-check" name="questionAnswer{question.id}" bind:group={correctAnswerId} value={answer.id} id="questionAnswerOption{answer.id}" autocomplete="off">
            <label class="btn btn-outline-success btn-sm" for="questionAnswerOption{answer.id}">Correct answer</label>
            <button on:click|preventDefault={() => { handleAnswerRemove(answer.id) }} type="button" class="btn-close" title="Remove answer"></button>
        </div>
    {/each}

    <hr>

    <button on:click={handleAnswerAdd} class="btn btn-sm btn-primary">Add answer</button>

</div>
