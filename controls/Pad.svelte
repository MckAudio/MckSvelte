<script>
    import { fade } from "svelte/transition"

    export let Handler = undefined;

    let boxWidth = 0;
    let active = false

    function ButtonClick(_evt) {
        active = true;
        window.setTimeout(()=>{
            active = false;
        }, 50);

        if (Handler) {
            Handler();
        }
    }
</script>

<style>
    main {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #f0f0f0;
        box-shadow: 0px 1px 4px 1px #555;
        cursor: pointer;
        overflow: hidden;
    }
    .highlight {
        width: 100%;
        height: 100%;
        background-color: #0099ff;
    }
</style>

<main bind:clientWidth={boxWidth} style="height: {boxWidth}px" on:click={ButtonClick}>
    {#if active}
        <div class="highlight" out:fade></div>
    {/if}
</main>