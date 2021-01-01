<script>
    import { fade } from "svelte/transition"
import { GetOffsetTop } from "../utils/Tools.svelte";

    export let Handler = undefined;
    export let quadratic = true;

    let pad = undefined;
    let boxWidth = 0;
    let active = false
    let value = 0.0;

    function ButtonClick(_evt) {
        if (pad === undefined) {
            return;
        }
        let _value = 0.0;
        if (_evt.type === "mousedown") {
            _value = 1.0 - _evt.offsetY / pad.clientHeight;
        } else if (_evt.type === "touchstart") {
            if (_evt.targetTouches.length > 0)
            {
                let _top = GetOffsetTop(pad);
                _value = 1.0 - (_evt.targetTouches.item(0).clientY - _top) / pad.clientHeight;
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
        window.setTimeout(()=>{
            active = false;
        }, 50);
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
        user-select: none;
    }
    .highlight {
        width: 100%;
        height: 100%;
        background: radial-gradient(#0099ff, #f0f0f000 200%);
        user-select: none;
        cursor: pointer;
    }
</style>

{#if quadratic}
<main bind:this={pad} bind:clientWidth={boxWidth} style="height: {boxWidth}px" on:mousedown={_evt => ButtonClick(_evt)} on:touchstart={_evt => ButtonClick(_evt)}>
    {#if active}
        <div class="highlight" style="background: radial-gradient(#0099ffff, #f0f0f000 {25.0 + value * 225.0}%);" out:fade></div>
    {/if}
</main>
{:else}
<main bind:this={pad} on:mousedown={_evt => ButtonClick(_evt)} on:touchstart={_evt => ButtonClick(_evt)}>
    {#if active}
        <div class="highlight" style="background: radial-gradient(#0099ffff, #f0f0f000 {25.0 + value * 225.0}%);" out:fade></div>
    {/if}
</main>
{/if}