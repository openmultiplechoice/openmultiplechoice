<script>
    import debounce from 'lodash/debounce';
    import AnswerForm from './AnswerForm.svelte';

    export let question;

    var correctAnswerId = question.correct_answer_id;
    $: correctAnswerId, updateCorrectAnswer();

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
        var label = document.querySelector('label[for="questionText' + question.id + '"]');
        label.textContent = 'Question text - saving ...';

        if (debounced) {
            // We want to save only once and not fire requests,
            // cancel the previous event
            debounced.cancel();
        }

        debounced = debounce(() => {
            axios.put('/api/questions/' + question.id, question)
                .then(function (response) {
                    label.textContent = 'Question text - saved!';
                })
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

<form action="#" on:submit|preventDefault={handleChange} class="mt-3 mb-3">

    <div class="mb-3 form-floating">
        <textarea bind:value="{question.text}" on:input={handleChange} type="text" class="form-control" id="questionText{question.id}" placeholder="Question text"></textarea>
        <label for="questionText{question.id}">Question text</label>
    </div>

    <div class="mb-3">
        <label for="image" class="form-label">Add image</label>
        <input on:input={handleImageAdd} class="form-control" type="file" id="imageInput{question.id}" name="image">
    </div>

</form>

<div class="row row-cols-1 row-cols-lg-3 g4">
    {#each question.images as image}
        <div class="col">
            <div class="card" style="width: 18rem">
                <div class="card-header bg-transparent"><button on:click|preventDefault={() => { handleImageRemove(image.id) }} type="button" class="btn-close"></button></div>
                <img src="http://omc.local/{image.path}" class="card-img-top" alt="">
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

{#each question.answers as answer}
    <AnswerForm bind:answer={answer} />
    <div class="text-end">
        <input type="radio" class="btn-check" name="questionAnswer{question.id}" bind:group={correctAnswerId} value={answer.id} id="questionAnswerOption{answer.id}" autocomplete="off">
        <label class="btn btn-outline-success btn-sm" for="questionAnswerOption{answer.id}">Correct answer</label>
        <button on:click|preventDefault={() => { handleAnswerRemove(answer.id) }} type="button" class="btn btn-outline-danger btn-sm">Remove</button>
    </div>
{/each}

<button on:click={handleAnswerAdd} class="btn btn-sm btn-primary">Add answer</button>
