<script>
    import debounce from 'lodash/debounce';

    export let answer;

    var debounced;

    function handleChange() {
        var label = document.querySelector('label[for="answerText' + answer.id + '"]');
        label.textContent = 'Answer text - saving ...';

        if (debounced) {
            // We want to save only once, cancel the previous event
            debounced.cancel();
        }

        debounced = debounce(() => {
            axios.put('/api/answers/' + answer.id, answer)
                .then(function (response) {
                    label.textContent = 'Answer text - saved!';
                })
                .catch(function (error) {
                    alert(error);
                });
        }, 500, { 'maxWait': 2000 });

        debounced();
    }
</script>

<form action="#" on:submit|preventDefault={handleChange} class="mt-3 mb-3">

    <div class="mb-3 form-floating">
        <textarea bind:value={answer.text} on:input={handleChange} class="form-control" id="answerText{answer.id}" placeholder="Answer text"></textarea>
        <label for="answerText{answer.id}">Answer text</label>
    </div>

</form>
