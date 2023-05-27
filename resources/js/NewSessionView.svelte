<script>
    import { onMount } from "svelte";

    import NewSessionDeckView from "./NewSessionDeckView.svelte";

    import { UserSettings } from "./UserSettingsStore.js";

    let modules = [];
    let subjects = [];

    let selectedModules = [];

    let userSelectedDecks = new Set();

    $: $UserSettings.last_subject_id,
        (() => {
            selectedModules = modules.filter((m) =>
                $UserSettings.last_subject_id
                    ? m.subject
                        ? m.subject.id === $UserSettings.last_subject_id
                        : false
                    : true
            );
        })();

    onMount(() => {
        axios
            .get("/api/modules")
            .then(function (response) {
                var modulesArr = response.data;
                // Make `subjects` and `modules` sets (each subject/module
                // should be in the list only once). We don't use a `Set()`
                // to have arrays and be able to `.filter()`
                modules = modulesArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                ).sort(function (a, b) {
                    return a.name > b.name;
                });
                var subjectsArr = modules
                    .map((m) => m.subject)
                    .filter((v) => !!v);
                subjects = subjectsArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                ).sort(function (a, b) {
                    return a.name > b.name;
                });
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
        var data = {
            last_subject_id: subjectId,
            last_module_id: 0,
        };
        axios
            .put("/api/users/me/settings", data)
            .then(function (response) {
                $UserSettings.last_subject_id = subjectId;
                $UserSettings.last_module_id = 0;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function selectModule(moduleId) {
        var data = {
            last_module_id: moduleId,
        };
        axios
            .put("/api/users/me/settings", data)
            .then(function (response) {
                $UserSettings.last_module_id = moduleId;
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function selectDeck(deckId) {
        if (userSelectedDecks.has(deckId)) {
            userSelectedDecks.delete(deckId);
        } else {
            userSelectedDecks.add(deckId);
        }
        userSelectedDecks = new Set([...userSelectedDecks]);
    }

    function createSuperDeck() {
        var data = {
            deck_ids: Array.from(userSelectedDecks),
        };
        axios
            .post("/api/decks", data)
            .then(function (response) {
                window.location.href = "/decks/" + response.data.id;
            })
            .catch(function (error) {
                alert(error);
            });
    }
</script>

<div class="row">
    <div class="col-md-4 mb-2">
        <ul class="list-group">
            {#each subjects as subject}
                <button
                    on:click|preventDefault={() =>
                        selectSubject(subject.id)}
                    class="list-group-item list-group-item-action {$UserSettings.last_subject_id ===
                    subject.id
                        ? 'list-group-item-dark'
                        : 'list-group-item-light'}">{subject.name}</button>
                {#if $UserSettings.last_subject_id === subject.id}
                    <ul class="list-group m-2 me-0">
                        {#each selectedModules as module}
                            <button
                                on:click|preventDefault={() =>
                                    selectModule(module.id)}
                                class="list-group-item list-group-item-action {$UserSettings.last_module_id ===
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
        {#if userSelectedDecks.size > 0}
            <div class="row">
                <div class="col-md">
                    <div class="alert alert-secondary" role="alert">
                        <p>
                            You have <strong
                                >selected {userSelectedDecks.size} deck{userSelectedDecks.size >
                                1
                                    ? "s"
                                    : ""}</strong
                            >.
                        </p>
                        <button
                            class="btn btn-sm btn-primary"
                            on:click|preventDefault={createSuperDeck}
                            >Create new super deck</button>
                    </div>
                </div>
            </div>
        {/if}
        <div class="row">
            {#if $UserSettings.last_module_id}
                <NewSessionDeckView
                    moduleId={$UserSettings.last_module_id}
                    bind:userSelectedDecks
                    createSession={createSession}
                    selectDeck={selectDeck} />
            {:else}
                <p>No module selected.</p>
            {/if}
        </div>
    </div>
</div>
