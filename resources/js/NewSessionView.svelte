<script>
    import { onMount } from "svelte";

    import NewSessionDecksView from "./NewSessionDecksView.svelte";
    import NewSessionSuperDeckView from "./NewSessionSuperDeckView.svelte";

    import { UserSettings } from "./UserSettingsStore.js";

    let modules = [];
    let subjects = [];

    let selectedModules = [];

    let selectedDecks = new Set();

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
                    // To make the list of modules sorted by name in Chromium-
                    // based browsers, we need to return -1 / 0 / 1 instead of
                    // true / false based on the comparison of two entries.
                    // See https://issues.chromium.org/issues/42200309
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                var subjectsArr = modules
                    .map((m) => m.subject)
                    .filter((v) => !!v);
                subjects = subjectsArr.filter(
                    (value, index, self) =>
                        index === self.findIndex((o) => o.id === value.id)
                ).sort(function (a, b) {
                    // To make the list of modules sorted by name in Chromium-
                    // based browsers, we need to return -1 / 0 / 1 instead of
                    // true / false based on the comparison of two entries.
                    // See https://issues.chromium.org/issues/42200309
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
            })
            .catch(function (error) {
                alert(error);
            });
    });

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

                const url = new URL(window.location);
                url.searchParams.delete('module');
                url.searchParams.delete('page');
                window.history.replaceState({}, '', url);
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

                const url = new URL(window.location);
                url.searchParams.set('module', moduleId);
                url.searchParams.set('page', 1);
                window.history.replaceState({}, '', url);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function selectDeck(deckId) {
        if (selectedDecks.has(deckId)) {
            selectedDecks.delete(deckId);
        } else {
            selectedDecks.add(deckId);
        }
        selectedDecks = new Set([...selectedDecks]);
    }
</script>

<div class="row">
    <div class="col-12 d-grid mb-2">
        <button
            type="button"
            class="btn btn-sm btn-primary d-lg-none my-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasModuleSelection"
            aria-controls="offcanvasModuleSelection">Switch module</button>
    </div>
</div>

<div class="row">
    <div class="col-lg-4 offcanvas-lg offcanvas-start" tabindex="-1" id="offcanvasModuleSelection">
        <div class="offcanvas-header">
            <h5 id="offcanvasAddToDeckLabel">Choose subject and module</h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-target="#offcanvasModuleSelection"
                data-bs-dismiss="offcanvas"
                aria-label="Close" />
        </div>
        <div class="offcanvas-body">
            <ul class="list-group w-100">
                {#each subjects as subject}
                    <button
                        on:click|preventDefault={() => selectSubject(subject.id)}
                        class="list-group-item list-group-item-action {$UserSettings.last_subject_id ===
                        subject.id
                            ? 'list-group-item-dark'
                            : 'list-group-item-light'}">{subject.name}</button>
                    {#if $UserSettings.last_subject_id === subject.id}
                        <ul class="list-group m-2 me-0">
                            {#each selectedModules as module}
                                <button
                                    on:click|preventDefault={() => selectModule(module.id)}
                                    data-bs-target="#offcanvasModuleSelection"
                                    data-bs-dismiss="offcanvas"
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
    </div>
    <div class="col-12 col-lg-8">
        <NewSessionSuperDeckView bind:selectedDecks />
        {#if $UserSettings.last_module_id}
            <NewSessionDecksView
                moduleId={$UserSettings.last_module_id}
                bind:selectedDecks
                selectDeck={selectDeck} />
        {:else}
            <p>No module selected.</p>
        {/if}
    </div>
</div>
