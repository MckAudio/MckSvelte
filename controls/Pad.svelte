<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler: (value: number) => void = () => {};
    export let selected = false;
    export let label = undefined;
    export let style: "dark" | "light" | "custom" = "dark";

    let pad = undefined;
    let boxWidth = 0;
    let active = false;
    let value = 0.0;
    let mouseEnabled = true;

    let lightGradOne = "#0099ffff";
    let lightGradTwo = "#f0f0f000";

    $: lightGradOne = style === "dark" ? "#eeeeffff" : "#0099ffff";
    $: lightGradTwo = style === "dark" ? "#eeeeff00" : "#f0f0f000";

    function MouseDown(_evt: MouseEvent) {
        if (pad === undefined || mouseEnabled === false) {
            return;
        }
        console.log("PAD MOUSE!", _evt);

        let _value = 0.0;
        let _top = GetOffsetTop(pad);
        _value = 1.0 - (_evt.clientY - _top) / pad.clientHeight;
        if (Handler) {
            Handler(_value);
        }
        value = _value;
        active = true;
        window.setTimeout(() => {
            active = false;
        }, 50);
    }

    function TouchDown(_evt: TouchEvent) {
        if (pad === undefined) {
            return;
        }
        console.log("PAD TOUCH!", _evt);

        let _value = 0.0;
        let _top = GetOffsetTop(pad);
        if (_evt.targetTouches.length > 0) {
            _value =
                1.0 -
                (_evt.targetTouches.item(0).clientY - _top) / pad.clientHeight;
            mouseEnabled = false;
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
            mouseEnabled = true;
        }, 50);
        window.setTimeout(() => {
            mouseEnabled = true;
        }, 5000);
    }

    onMount(() => {
        pad.addEventListener("touchstart", TouchDown, { passive: true });
        pad.addEventListener("mousedown", MouseDown, { passive: true });
    });

    onDestroy(() => {
        pad.removeEventListener("touchstart", TouchDown);
        pad.removeEventListener("mousedown", MouseDown);
    });
</script>

<div
    class="main {style} {selected ? 'selected' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    style="touch-action: none; height: {boxWidth}px"
>
    {#if active}
        <div
            class="highlight"
            style="background: radial-gradient({lightGradOne}, {lightGradTwo} {25.0 +
                value * 225.0}%);"
            out:fade
        />
    {/if}
    {#if label !== undefined}
        <div class="label">{label}</div>
    {/if}
</div>

<style>
    .main {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        display: grid;
        grid-template-rows: 1fr auto;
        user-select: none;
    }
    .main.light {
        border: 1px solid #e0e0e0;
        background-color: #f0f0f0;
        box-shadow: 0px 1px 4px 1px #555;
    }
    .main.dark {
        border: 1px solid #505050;
        background-color: #404040;
        box-shadow: 0px 1px 4px 1px #202020;
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
        font-family: "mck-lato", "Lato";
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
