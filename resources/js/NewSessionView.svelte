<script>
    import { onMount } from "svelte";
    import { format, parseISO } from "date-fns";

    import { sessionProgressPercentage } from "./StatsHelper.js";

    let decks = [];
    let modules = [];
    let subjects = [];

    let selectedDecksStats;
    let selectedModules = [];

    let selectedSubjectId = 0;
    let selectedModuleId = undefined;

    // $: selectedDecks, console.log("selectedDecks", selectedDecks);
    // $: selectedSubject, console.log("selectedSubject", selectedSubject);

    $: selectedDecks = (() => {
        return decks.filter((d) =>
            selectedModuleId
                ? d.module
                    ? d.module.id === selectedModuleId
                    : false
                : false
        );
    })();

    $: selectedDecks,
        (() => {
            if (selectedDecks.length === 0) {
                return;
            }
            const requestParameters = selectedDecks.map(
                (d) => "decks[]=" + d.id
            );
            axios
                .get("/api/stats?" + requestParameters.join("&"))
                .then(function (response) {
                    selectedDecksStats = response.data;
                })
                .catch(function (error) {
                    alert(error);
                });
        })();

    $: deckStatsIndicator = (() => {
        var indicator = {};
        if (!selectedDecksStats) {
            return indicator;
        }
        for (const deck of selectedDecks) {
            if (!selectedDecksStats[deck.id]) {
                indicator[deck.id] =
                    '<span class="badge text-bg-light">?</span>';
                continue;
            }
            const deckStats = selectedDecksStats[deck.id];
            const percentage = sessionProgressPercentage(
                deckStats.deck.questions.length,
                deckStats.answer_choices
            );
            var indicatorColorClass = "text-bg-danger";
            if (percentage.correct >= 60) {
                indicatorColorClass = "text-bg-success";
            }
            indicator[deck.id] =
                '<span class="badge ' +
                indicatorColorClass +
                '" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here\'s some..." title="Correct answers in percent">' +
                percentage.correct +
                " %</span>";
        }
        return indicator;
    })();

    $: selectedSubjectId,
        (() => {
            selectedModules = modules.filter((m) =>
                selectedSubjectId
                    ? m.subject
                        ? m.subject.id === selectedSubjectId
                        : false
                    : true
            );
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

    function selectSubject(subjectId) {
        selectedSubjectId = subjectId;
        selectedModuleId = undefined;
    }

    function selectModule(moduleId) {
        selectedModuleId = moduleId;
    }
</script>

{#if decks}
    <div class="row">
        <div class="col-md-4 mb-2">
            <ul class="list-group">
                {#each subjects as subject}
                    <button
                        on:click|preventDefault={() =>
                            selectSubject(subject.id)}
                        class="list-group-item list-group-item-action {selectedSubjectId ===
                        subject.id
                            ? 'list-group-item-dark'
                            : 'list-group-item-light'}">{subject.name}</button>
                    {#if selectedSubjectId === subject.id}
                        <ul class="list-group m-2 me-0">
                            {#each selectedModules as module}
                                <button
                                    on:click|preventDefault={() =>
                                        selectModule(module.id)}
                                    class="list-group-item list-group-item-action {selectedModuleId ===
                                    module.id
                                        ? 'list-group-item-secondary'
                                        : 'list-group-item-light'}"
                                    >{module.name}</button>
                            {/each}
                        </ul>
                    {/if}
                {/each}
            </ul>
        </div>
        <div class="col-md-8">
            <div class="row">
                {#each selectedDecks as deck}
                    <div class="col-lg-6 mb-1">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">
                                    {deck.name}
                                    {#if deckStatsIndicator[deck.id]}
                                        {@html deckStatsIndicator[deck.id]}
                                    {/if}
                                </h6>
                                <p class="card-subtitle mb-2 text-muted">
                                    {format(
                                        parseISO(deck.created_at),
                                        "dd/MM/yyyy HH:mm"
                                    )}
                                </p>

                                <button
                                    on:click|preventDefault={() =>
                                        createSession(deck.id)}
                                    type="button"
                                    class="btn btn-primary"
                                    ><i class="bi bi-ui-checks-grid" /> New session</button>
                                <a href="/decks/{deck.id}" class="card-link"
                                    >Browse deck</a>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{:else}
    <p>Loading ...</p>
{/if}
