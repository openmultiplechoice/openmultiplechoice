<script>
    import debounce from "lodash/debounce";

    import { UserSettings } from "./UserSettingsStore.js";

    let { initialMode = "auto" } = $props();

    const themeModes = ["auto", "light", "dark"];
    const themeModeLabels = {
        auto: "Auto (Device Theme)",
        light: "Light",
        dark: "Dark",
    };
    const themeModeIcons = {
        auto: "bi-circle-half",
        light: "bi-sun-fill",
        dark: "bi-moon-stars-fill",
    };
    const themeModeIconColors = {
        auto: null,
        light: "var(--bs-yellow)",
        dark: "var(--bs-dark)",
    };

    let currentThemeMode = $derived(
        isThemeMode($UserSettings.theme_mode)
            ? $UserSettings.theme_mode
            : (isThemeMode(initialMode) ? initialMode : "auto")
    );
    let nextThemeMode = $derived(getNextThemeMode(currentThemeMode));
    let nextLabel = $derived(getThemeModeLabel(nextThemeMode));
    let iconClass = $derived(getThemeModeIcon(nextThemeMode));
    let iconColor = $derived(getThemeModeIconColor(nextThemeMode));

    function isThemeMode(mode) {
        return themeModes.includes(mode);
    }

    function getSystemTheme() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function resolveEffectiveTheme(mode) {
        return mode === "auto" ? getSystemTheme() : mode;
    }

    function getNextThemeMode(mode) {
        const currentIndex = themeModes.indexOf(mode);

        return themeModes[(currentIndex + 1) % themeModes.length];
    }

    function getThemeModeLabel(mode) {
        return themeModeLabels[mode];
    }

    function getThemeModeIcon(mode) {
        return themeModeIcons[mode];
    }

    function getThemeModeIconColor(mode) {
        return themeModeIconColors[mode];
    }

    function applyThemeMode(mode) {
        document.documentElement.setAttribute("data-omc-theme-mode", mode);
        document.documentElement.setAttribute("data-bs-theme", resolveEffectiveTheme(mode));
    }

    // Keep the document theme attributes in sync with the selected mode.
    // This runs on mount and whenever currentThemeMode changes.
    $effect(() => {
        applyThemeMode(currentThemeMode);
    });

    const saveThemeMode = debounce((mode) => {
        axios
            .put("/api/users/me/settings", {
                theme_mode: mode,
            })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }, 500);

    function cycleThemeMode() {
        const previousMode = currentThemeMode;
        const mode = getNextThemeMode(currentThemeMode);

        $UserSettings.theme_mode = mode;

        if (mode !== previousMode) {
            saveThemeMode(mode);
        }
    }
</script>

<button
    type="button"
    class="btn fw-bold p-0"
    id="omc-theme-toggle"
    data-omc-current-theme-mode={currentThemeMode}
    onmousedown={(event) => event.preventDefault()}
    onclick={cycleThemeMode}
    title="Switch to theme {nextLabel}">
    <i class="bi {iconClass}" style:color={iconColor}></i>
</button>
