<script>
    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";
    import SessionProgressBar from "./SessionProgressBar.svelte";

    export let userId;

    var sessions = [];

    onMount(() => {
        axios
            .get("/api/sessions?take=15&user-id=" + userId)
            .then(function (response) {
                sessions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });
</script>

{#each sessions as session}
    <div class="mb-2">
        <SessionProgressBar
            bind:answerChoices={session.answerchoices}
            bind:numQuestions={session.deck.questions.length} />
        <p>
            <strong>{session.name}</strong>
            <a href="/sessions/{session.id}">Continue</a><br />
            <small
                >{format(
                    parseISO(session.created_at),
                    "dd/MM/yyyy HH:mm"
                )}</small>
        </p>
    </div>
{:else}
    <p>No sessions yet</p>
{/each}
