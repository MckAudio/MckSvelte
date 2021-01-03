<script>
    import { fade } from "svelte/transition";
    import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let selected = false;
    export let label = undefined;

    let pad = undefined;
    let boxWidth = 0;
    let active = false;
    let value = 0.0;

    function ButtonClick(_evt) {
        if (pad === undefined) {
            return;
        }
        let _value = 0.0;
        if (_evt.type === "mousedown") {
            _value = 1.0 - _evt.offsetY / pad.clientHeight;
        } else if (_evt.type === "touchstart") {
            if (_evt.targetTouches.length > 0) {
                let _top = GetOffsetTop(pad);
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
    main {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        background-color: #f0f0f0;
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
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    main.selected .label {
        background-color: #ff9900;
    }
</style>

<main
    class="{selected ? 'selected' : ''}"
    bind:this={pad}
    bind:clientWidth={boxWidth}
    style="height: {boxWidth}px"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    {#if active}
        <div
            class="highlight"
            style="background: radial-gradient(#0099ffff, #f0f0f000 {25.0 + value * 225.0}%);"
            out:fade />
    {/if}
    {#if label !== undefined}
        <div class="label">{label}</div>
    {/if}
</main>
