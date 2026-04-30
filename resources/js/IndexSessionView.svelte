<script>
    import { onMount } from "svelte";
    import debounce from "lodash/debounce";

    import IndexSessionSingleView from "./IndexSessionSingleView.svelte";
    import { UserSettings } from "./UserSettingsStore.js";

    let { userId } = $props();

    var sessions = $state(undefined);

    const progressStyles = ["default", "unicorn", "basic"];

    // Note: To make the preview button colors more subtle compared to SessionProgressBar.svelte,
    // we use `color-mix()` to apply opacity directly to standard CSS variables.
    // For hex colors, we use 8-digit hex codes where the last two characters (e.g., '59')
    // represent an alpha/opacity value of ~35%.
    const progressStyleButtonPreview = {
        default: {
            background: "linear-gradient(90deg, color-mix(in srgb, var(--bs-success) 35%, transparent) 0%, color-mix(in srgb, var(--bs-warning) 35%, transparent) 50%, color-mix(in srgb, var(--bs-danger) 35%, transparent) 100%)",
        },
        unicorn: {
            background: "linear-gradient(90deg, #ff6b6b59 0%, #ffd93d59 25%, #6bcB7759 50%, #4d96ff59 75%, #b983ff59 100%)",
        },
        basic: {
            background: "linear-gradient(90deg, color-mix(in srgb, var(--bs-secondary) 35%, transparent) 0%, transparent 100%)",
        },
    };

    let currentProgressStyle = $derived($UserSettings.index_session_progress_style || "default");
    let nextProgressStyle = $derived(getNextProgressStyle(currentProgressStyle));
    let nextProgressStylePreview = $derived(progressStyleButtonPreview[nextProgressStyle]);

    onMount(() => {
        axios
            .get("/api/sessions?take=10&user-id=" + userId)
            .then(function (response) {
                sessions = response.data;
            })
            .catch(function (error) {
                alert(error);
            });
    });

    const saveSettings = debounce((style) => {
        axios
            .put("/api/users/me/settings", {
                index_session_progress_style: style,
            })
            .catch(function (error) {
                alert(error);
            });
    }, 1000);

    function getNextProgressStyle(style) {
        const currentIndex = progressStyles.indexOf(style);

        return progressStyles[(currentIndex + 1) % progressStyles.length];
    }

    function cycleProgressStyle() {
        const nextStyle = getNextProgressStyle(currentProgressStyle);

        $UserSettings.index_session_progress_style = nextStyle;

        saveSettings(nextStyle);
    }
</script>

{#if sessions}
    {#each sessions as session, i}
        <IndexSessionSingleView
            bind:session={sessions[i]}
            progressBarStyle={currentProgressStyle} />
    {:else}
        <div class="alert alert-light text-center" role="alert">
            <i class="bi bi-rocket"></i> No sessions yet
        </div>
    {/each}
    {#if sessions.length > 0}
        <div class="d-flex justify-content-end mb-2">
            <button
                class="btn btn-sm btn-outline-secondary fw-bold px-4 py-0 w-auto text-dark"
                style="background: {nextProgressStylePreview.background};"
                onclick={cycleProgressStyle}
                title="Switch progress style"
                type="button">
                <i class="bi bi-arrow-repeat"></i>
            </button>
        </div>
    {/if}
{:else}
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading sessions ...</span>
        </div>
    </div>
{/if}
