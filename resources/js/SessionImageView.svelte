<script>
    import debounce from 'lodash/debounce';
    import hotkeys from 'hotkeys-js';
    import { onMount } from 'svelte';

    export let images = [];

    var fullscreen = false;
    var fullscreenImage;

    onMount(() => {
        hotkeys('esc', function (event, handler) {
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

        debounced = debounce(() => {
            fullscreen = !fullscreen;
            fullscreenImage = images.find(i => i.id === imageId);
        }, 100, { 'maxWait': 200 });

        debounced();
    }
</script>

<style>
.img-fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.8);
}
.img-fullscreen img {
    display: block;
}
</style>

{#if !fullscreen}
    <div class="col-lg">
        <div class="row row-cols-1 row-cols-sm-3 g-4">
            {#each images as image}
                <div class="col">
                    <div class="card" style="max-width: 18rem">
                        <img on:click={() => fullscreenToggle(image.id)} src="/{image.path}" class="card-img-top" alt="">
                    </div>
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div on:click={fullscreenToggle} class="img-fullscreen">
        <div class="card mt-3 mx-auto">
            <img class="card-img-top img-fluid" src="/{fullscreenImage.path}" alt="">
            {#if fullscreenImage.comment }
                <div class="card-body">
                    <p class="card-text">
                        <small>
                            {fullscreenImage.comment}
                        </small>
                    </p>
                </div>
            {/if}
        </div>
    </div>
{/if}
