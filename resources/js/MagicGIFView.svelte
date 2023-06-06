<script>
    export let magicGIFPath = '';

    var fullscreen = true;

    function fullscreenToggle() {
        fullscreen = !fullscreen;
    }
</script>

{#if magicGIFPath && fullscreen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={fullscreenToggle} class="img-fullscreen d-flex justify-content-center align-items-center">
        <img class="img-fluid" src="/{magicGIFPath}" alt="Magic GIF" />
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

        background: linear-gradient(-45deg, #ff00ff, #ff0080, #0080ff, #80ff00);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        height: 100vh;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
