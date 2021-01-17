<script>
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let active = false;
    export let value = 1.0;
    export let label = undefined;
    export let selected = false;

    let pad = undefined;
    let boxWidth = 0;

    function ButtonClick(_evt) {
        if (Handler) {
            Handler(!active);
        }
    }
</script>

<style>
    main {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #f0f0f0;
        border: 1px solid #e0e0e0;
        box-shadow: 0px 1px 4px 1px #555;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        display: grid;
        grid-template-rows: 1fr auto;
    }
    main.selected {
        border-color: #ff9900;
    }
    .highlight {
        width: 100%;
        height: 100%;
        background: radial-gradient(#0099ff, #f0f0f000 200%);
        user-select: none;
        cursor: pointer;
    }
    .label {
        grid-row: 2/-1;
        border-top: 1px solid #555;
        color: #555;
        font-family: mck-lato;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }
    main.selected .label {
        background-color: #ff9900;
    }
</style>

<main
    class="{selected ? 'selected' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    style="height: {2.0 * boxWidth}px"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    {#if active}
        <div
            class="highlight"
            style="background: radial-gradient(#0099ffff, #f0f0f000 {Math.round(50+value*150.0)}%);"
            transition:fade="{{duration: 100}}" />
    {/if}
    {#if label}
    <div class="label">
        {label}
    </div>
    {/if}
</main>
