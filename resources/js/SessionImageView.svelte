<script>
    import debounce from "lodash/debounce";
    import hotkeys from "hotkeys-js";
    import { onMount } from "svelte";

    export let images = [];

    var fullscreen = false;
    var fullscreenImage;

    $: if (fullscreen) {
        hotkeys.setScope("images");
    } else {
        hotkeys.setScope("questions");
    }

    onMount(() => {
        hotkeys("esc", "images", function (event, handler) {
            if (fullscreen) {
                fullscreen = false;
            }
        });
    });

    var debounced;

    function fullscreenToggle(imageId) {
        if (debounced) {
            debounced.cancel();
        }

        debounced = debounce(
            () => {
                fullscreen = !fullscreen;
                fullscreenImage = images.find((i) => i.id === imageId);
            },
            100,
            { maxWait: 200 }
        );

        debounced();
    }
</script>

{#if !fullscreen}
    <div class="col-lg">
        <div class="row row-cols-1 row-cols-sm-3 g-4">
            {#each images as image (image.id)}
                <div class="col">
                    <div class="card" style="max-width: 18rem; cursor: pointer;">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <img
                            on:click={() => fullscreenToggle(image.id)}
                            src="/{image.path}"
                            class="card-img-top"
                            alt="" />
                    </div>
                </div>
            {/each}
        </div>
    </div>
{:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={fullscreenToggle} class="img-fullscreen">
        <p class="bg-white text-end">
            <button
                on:click|preventDefault={() => (fullscreen = !fullscreen)}
                type="button"
                class="btn-close" />
        </p>
        <div class="text-center">
            <img
                class="img-fluid border border-5 border-white"
                src="/{fullscreenImage.path}"
                alt="" />
        </div>
    </div>
{/if}

<style>
    .img-fullscreen {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        background-color: rgba(255, 255, 255, 0.95);
    }
</style>
