<script>
    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";

    let decks = [];
    let modules = [];
    let subjects = [];

    let selectedModules = [];
    let selectedModule;
    let selectedSubject;

    // $: selectedDecks, console.log("selectedDecks", selectedDecks);
    // $: selectedSubject, console.log("selectedSubject", selectedSubject);

    $: selectedDecks = (() => {
        return decks.filter((d) =>
            selectedModule
                ? d.module
                    ? d.module.id === selectedModule.id
                    : false
                : true
        );
    })();

    $: selectedSubject,
        (() => {
            selectedModules = modules.filter((m) =>
                selectedSubject
                    ? m.subject
                        ? m.subject.id === selectedSubject.id
                        : false
                    : true
            );
            // If a subject was selected and if there are modules
            // for the subject, default select the first module.
            if (selectedSubject && selectedModules.length > 0) {
                selectedModule = selectedModules[0];
            } else {
                selectedModule = undefined;
            }
        })();

    onMount(() => {
        axios
            .get("/api/decks")
            .then(function (response) {
                decks = response.data;
                var modulesArr = decks.map((d) => d.module).filter((v) => !!v);
                // Make `subjects` and `modules` sets (each subject/module
                // should be in the list only once). We don't use a `Set()`
                // to have arrays and be able to `.filter()`
                modules = modulesArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                );
                var subjectsArr = modules
                    .map((m) => m.subject)
                    .filter((v) => !!v);
                subjects = subjectsArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                );
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    });

    function createSession(deckId) {
        var data = {
            deck_id: deckId,
        };
        axios
            .post("/api/sessions", data)
            .then(function (response) {
                window.location.href = "/sessions/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

{#if decks}
    <div class="row">
        <div class="col-md-4">
            <select
                bind:value={selectedSubject}
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example">
                <option selected value={undefined}>All subjects</option>
                {#each subjects as subject}
                    <option value={subject}>{subject.name}</option>
                {/each}
            </select>
            {#if selectedSubject}
                <select
                    bind:value={selectedModule}
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example">
                    {#each selectedModules as module, index (module.id)}
                        <option
                            selected={selectedModule === module.id}
                            value={module}>{module.name}</option>
                    {/each}
                </select>
            {/if}
        </div>
        <div class="col-md-8">
            <ul>
                {#each selectedDecks as deck}
                    <li>
                        <button
                            on:click|preventDefault={() =>
                                createSession(deck.id)}
                            type="button"
                            class="btn btn-link"
                            >{format(
                                parseISO(deck.created_at),
                                "dd/MM/yyyy HH:mm"
                            )}
                            {deck.name}</button>
                        <a href="/decks/{deck.id}/edit">Edit deck</a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
