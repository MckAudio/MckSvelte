<script lang="ts">
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let selected = false;
    export let label = undefined;
    export let style: "dark" | "light" | "custom" = "dark";

    let pad = undefined;
    let boxWidth = 0;
    let active = false;
    let value = 0.0;

    let lightGradOne = "#0099ffff";
    let lightGradTwo = "#f0f0f000";

    $: lightGradOne = style === "dark" ? "#eeeeffff" : "#0099ffff";
    $: lightGradTwo = style === "dark" ? "#eeeeff00" : "#f0f0f000";

    function ButtonClick(_evt) {
        if (pad === undefined) {
            return;
        }
        let _value = 0.0;
        let _top = GetOffsetTop(pad);
        if (_evt.type === "mousedown") {
            _value = 1.0 - (_evt.clientY - _top) / pad.clientHeight;
        } else if (_evt.type === "touchstart") {
            if (_evt.targetTouches.length > 0) {
                _value =
                    1.0 -
                    (_evt.targetTouches.item(0).clientY - _top) /
                        pad.clientHeight;
            } else {
                return;
            }
        } else {
            return;
        }
        if (Handler) {
            Handler(_value);
        }
        value = _value;
        active = true;
        window.setTimeout(() => {
            active = false;
        }, 50);
    }
</script>

<style>
    .main {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 0px 1px 4px 1px #555;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        display: grid;
        grid-template-rows: 1fr auto;
    }
    .main.light {
        border: 1px solid #e0e0e0;
        background-color: #f0f0f0;
    }
    .main.dark {
        border: 1px solid #505050;
        background-color: #404040;
    }
    .main.selected {
        border-color: #dd7700;
    }
    .highlight {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
    }
    .main.light .highlight {
        background: radial-gradient(#0099ff, #f0f0f000 200%);
    }
    .main.dark .highlight {
        background: radial-gradient(#eeeeffff, #eeeeff00 200%);
    }
    .main.light .label {
        border-top: 1px solid #555;
        color: #555;
    }
    .main.dark .label {
        border-top: 1px solid #e0e0e0;
        color: #e0e0e0;
    }
    .label {
        grid-row: 2/-1;
        font-family: mck-lato;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .main.selected .label {
        background-color: #ff9900;
        color: #555;
    }
</style>

<div
    class="main {style} {selected ? 'selected' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    style="height: {boxWidth}px"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    {#if active}
        <div
            class="highlight"
            style="background: radial-gradient({lightGradOne}, {lightGradTwo} {25.0 + value * 225.0}%);"
            out:fade />
    {/if}
    {#if label !== undefined}
        <div class="label">{label}</div>
    {/if}
</div>
