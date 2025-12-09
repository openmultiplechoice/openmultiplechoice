<script>
    import { run, preventDefault } from 'svelte/legacy';

    import NewSessionDeckStats from "./NewSessionDeckStats.svelte";
    import NewSessionDeckView from "./NewSessionDeckView.svelte";

    import { UserSettings } from "./UserSettingsStore.js";

    let { moduleId = $bindable(), deckKind = $bindable(), selectDeck, selectedDecks = $bindable() } = $props();

    let decks = $state(undefined);
    let pageNum = $state(getURLParam("page") ?? 1);
    let pageData = $state();

    run(() => {
        moduleId, (() => {
            pageNum = getURLParam("page") ?? 1;
            fetchDecks();
        })();
    });

    function getURLParam(p) {
        return new URLSearchParams(window.location.search).get(p);
    }

    function fetchDecks() {
        if (!moduleId) {
            // No module selected yet
            decks = [];
            return;
        }

        decks = undefined; // Show loading spinner

        const url = new URL(window.location);
        url.searchParams.set('module', moduleId);
        url.searchParams.set('kind', deckKind);
        url.searchParams.set('page', pageNum);
        window.history.replaceState({}, '', url);

        axios
            .get("/api/decks?module=" + moduleId +
                "&kind=" + deckKind +
                "&page=" + pageNum
            )
            .then(function (response) {
                pageData = response.data;
                decks = pageData.data;
                decks.sort(function (a, b) {
                    if (a.exam_at === null || b.exam_at === null) {
                        if (a.id < b.id) return 1;
                        if (a.id > b.id) return -1;
                        return 0;
                    }
                    if (a.exam_at < b.exam_at) return 1;
                    if (a.exam_at > b.exam_at) return -1;
                    return 0;
                });
            })
            .catch(function (error) {
                alert(error);
            });
    };

    function loadPage(num) {
        pageNum = num;
        fetchDecks();
    }

    function selectDeckKind() {
        if ($UserSettings.last_new_session_deck_kind === deckKind) return; // nothing to do
        var data = {
            last_new_session_deck_kind: deckKind,
        };
        axios
            .put("/api/users/me/settings", data)
            .then(function () {
                $UserSettings.last_new_session_deck_kind = deckKind;
            })
            .catch(function (error) {
                alert(error);
            });

        fetchDecks();
    }
</script>

<div class="row mb-3">
    <div class="col">
        <div class="input-group">
            <span class="input-group-text" class:bg-info-subtle={deckKind !== 'public-rw-listed'}><i class="bi bi-archive"></i></span>
            <select id="kind" class="form-select" bind:value={deckKind} onchange={selectDeckKind}>
                <option value="public-rw-listed" selected={deckKind === 'public-rw-listed'}>Main decks</option>
                <option value="user" selected={deckKind === 'user'}>Your decks</option>
                <option value="public" selected={deckKind === 'public'}>User decks</option>
                <option value="bookmarked" selected={deckKind === 'bookmarked'}>Bookmarked decks</option>
            </select>
        </div>
    </div>
</div>

<NewSessionDeckStats bind:decks bind:moduleId />

<div class="row">
    {#if decks}
        {#each decks as deck, i (deck.id)}
            <NewSessionDeckView bind:deck={decks[i]} {selectDeck} bind:selectedDecks />
        {:else}
            <div class="col">
                <div class="alert alert-light">
                    No decks found! Create a new deck <a href="/decks" class="alert-link">here</a>.
                </div>
            </div>
        {/each}
    {:else}
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading decks ...</span>
            </div>
        </div>
    {/if}
</div>

{#if pageData && pageData.total > 0}
    <div class="row sticky-bottom bg-white mt-3 pt-3">
        <div class="col">
            <p class="small text-muted">
                Showing <span class="fw-semibold">{pageData.from}</span>
                to <span class="fw-semibold">{pageData.to}</span>
                of <span class="fw-semibold">{pageData.total}</span> decks
            </p>
        </div>
        {#if pageData.last_page > 1}
            <div class="col">
                <nav>
                    <ul class="pagination">
                        <li class="page-item" class:disabled={pageData.prev_page_url === null}>
                            <button class="page-link" onclick={preventDefault(()=> {
                                pageData.prev_page_url && loadPage(pageData.current_page - 1);
                            })}>‹</button>
                        </li>
                        {#each pageData.links.slice(1, pageData.links.length - 1) as link}
                            <li class="page-item d-none d-sm-block" class:disabled={link.active || !link.url}>
                                <button class="page-link" onclick={preventDefault(()=> {
                                    link.url && loadPage(link.label);
                                })}>{link.label}</button>
                            </li>
                        {/each}
                        <li class="page-item" class:disabled={pageData.next_page_url === null}>
                            <button class="page-link" onclick={preventDefault(()=> {
                                pageData.next_page_url && loadPage(pageData.current_page + 1);
                            })}>›</button>
                        </li>
                    </ul>
                </nav>
            </div>
        {/if}
    </div>
{/if}
