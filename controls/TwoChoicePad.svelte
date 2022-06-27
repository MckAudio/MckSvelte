<script>
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let active = false;
    export let selected = false;
    export let icons = undefined;
    export let labels = undefined;

    let pad = undefined;
    let boxWidth = 0;

    function ButtonClick(_evt) {
        if (Handler) {
            Handler(!active);
        } else {
            active = !active;
        }
    }
</script>

<div
    class="main {selected ? 'selected' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    style="height: {2.0 * boxWidth}px"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}
>
    <div class="imggrid {active ? '' : 'highlight'}">
        {#if labels !== undefined}
            <span>{labels[0]}</span>
        {/if}
        {#if icons !== undefined}
            <img src={icons[0]} alt={icons[0]} />
        {/if}
    </div>
    <div class="imggrid {active ? 'highlight' : ''}">
        {#if labels !== undefined}
            <span>{labels[1]}</span>
        {/if}
        {#if icons !== undefined}
            <img src={icons[1]} alt={icons[1]} />
        {/if}
    </div>
</div>

<style>
    .main {
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
        grid-template-rows: 1fr 1fr;
    }
    .main.selected {
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
    .imggrid + .imggrid {
        border-top: 1px solid #555;
    }
    .imggrid {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 1fr auto auto 1fr;
        grid-gap: 4px;
    }
    .imggrid > img {
        grid-row: 2/3;
        grid-column: 2/3;
        color: #555;
    }
    .imggrid > span {
        grid-row: 3/4;
        grid-column: 2/3;
        color: #555;
        font-family: mck-lato;
        font-size: 11px;
    }
</style>
