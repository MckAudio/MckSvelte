<script lang="ts">
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let active = false;
    export let value = 1.0;
    export let label = undefined;
    export let selected = false;
    export let style: "dark" | "light" | "custom" = "dark";
    export let emphasize = false;

    let pad = undefined;
    let boxWidth = 0;

    let lightGradOne = "#0099ffff";
    let lightGradTwo = "#f0f0f000";

    $: lightGradOne = style === "dark" ? "#ff9900ff" : "#0099ffff";
    $: lightGradTwo = style === "dark" ? "#dd770000" : "#f0f0f000";

    function ButtonClick(_evt) {
        if (Handler) {
            Handler(!active, value);
        }
    }
</script>

<style>
    .main {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
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
    .main.dark {
        background-color: #404040;
        border-color: #505050;
        color: #e0e0e0;
    }
    .main.light {
        background-color: #f0f0f0;
        border-color: #e0e0e0;
    }
    .main.light.emphasize {
        background-color: #e9e9e9;
        border-color: #d0d0d0;
    }


    .highlight {
        width: 100%;
        height: 100%;
        user-select: none;
        cursor: pointer;
    }
    .main.light .highlight {
        background: radial-gradient(#0099ff, #f0f0f000 200%);
    }
    .main.dark .highlight {
        background: radial-gradient(#eeeeffff, #eeeeff00 200%);
    }
    .label {
        grid-row: 2/-1;
        border-top: 1px solid #555;
        font-family: 'mck-lato', 'Lato';
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }
    .main.dark .label {
        background-color: #303030;
    }
    .main.dark.emphasize .label {
        background-color: #505050;
    }
    .main.light .label {
        background-color: #f0f0f0;
        color: #555;
    }
    .main.light.emphasize .label {
        background-color: #e0e0e0;
        color: #404040;
    }
    .main.selected.light {
        border-color: #ff9900;
    }
    main.selected.light .label {
        background-color: #ff9900;
        color: #101010;
    }
    .main.selected.dark {
        border-color: #0099ff;
    }
    main.selected.dark .label {
        background-color: #0099ff;
        color: #101010;
    }
</style>

<main
    class="main {style} {selected ? 'selected' : ''} {emphasize ? 'emphasize' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    {#if active}
        <div
            class="highlight"
            style="background: radial-gradient({lightGradOne}, {lightGradTwo} {Math.round(50+value*150.0)}%);"
            transition:fade="{{duration: 100}}" />
    {/if}
    {#if label}
    <div class="label">
        {label}
    </div>
    {/if}
</main>
