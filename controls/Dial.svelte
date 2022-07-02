<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let style: "dark" | "light" | "custom" = "dark";
    export let value: number = 0.0;
    export let label: string = undefined;

    let dragging = false;
    let touching = false;
    let knob: HTMLElement = undefined;
    let marker: HTMLElement = undefined;
    let curValue = -1.0;
    let mousePosY = 0;
    let fingerPos = [0, 0];

    function DisplayValue(v: number) {
        let normVal = (v - 0.5) * 1.0;
        let angle = 90.0 + normVal * 270.0;

        if (marker !== undefined) {
            marker.style.transform = `rotate(${angle}deg)`;
        }
    }

    function MouseHandler(evt: MouseEvent) {
        switch (evt.type) {
            case "mousedown":
                dragging = true;
                mousePosY = evt.clientY;
                fingerPos = [evt.clientX, evt.clientY];
                curValue = value;
                break;
            case "mousemove":
                if (dragging) {
                    let tmp = curValue + (mousePosY - evt.clientY) / 100.0;
                    fingerPos = [evt.clientX, evt.clientY];
                    value = Math.max(0.0, Math.min(1.0, tmp));
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                break;
            case "mouseup":
                if (dragging) {
                    dragging = false;
                }
                break;
            default:
                break;
        }
    }

    function TouchHandler(evt: TouchEvent) {
        switch (evt.type) {
            case "touchstart":
                touching = true;
                mousePosY = evt.changedTouches[0].clientY;
                fingerPos = [
                    evt.changedTouches[0].clientX,
                    evt.changedTouches[0].clientY,
                ];
                curValue = value;
                evt.stopPropagation();
                break;
            case "touchmove":
                if (touching) {
                    let tmp =
                        curValue +
                        (mousePosY - evt.changedTouches[0].clientY) / 100.0;
                    fingerPos = [
                        evt.changedTouches[0].clientX,
                        evt.changedTouches[0].clientY,
                    ];
                    value = Math.max(0.0, Math.min(1.0, tmp));
                    evt.stopPropagation();
                }
                break;
            case "touchend":
                if (touching) {
                    touching = false;
                    evt.stopPropagation();
                }
                break;
            default:
                break;
        }
    }

    $: DisplayValue(value);

    onMount(() => {
        window.addEventListener("mouseup", MouseHandler);
        window.addEventListener("mousemove", MouseHandler);
        window.addEventListener("touchend", TouchHandler);
        window.addEventListener("touchmove", TouchHandler);

        DisplayValue(value);
    });
    onDestroy(() => {
        window.removeEventListener("mouseup", MouseHandler);
        window.removeEventListener("mousemove", MouseHandler);
        window.removeEventListener("touchend", TouchHandler);
        window.removeEventListener("touchmove", TouchHandler);
    });
</script>

{#if dragging || touching}
    <div
        transition:fade
        class="overlay"
        style="left: {Math.max(4, fingerPos[0] - 25)}px; top: {Math.max(4, fingerPos[1] - (touching ? 64 : 40))}px;"
    >
        {value.toFixed(2)}
    </div>
{/if}
<div class="main">
    <div class="dial">
        <div class="pac">
            <div class="segment" />
            <div class="ring">
                <div class="fg">
                    <div
                        bind:this={knob}
                        class="knob {dragging || touching ? 'hover' : ''}"
                        on:contextmenu={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            return false;
                        }}
                        on:mousedown={MouseHandler}
                        on:touchstart={TouchHandler}
                    >
                        <div class="marker" bind:this={marker}>
                            <div class="fill" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {#if label !== undefined}
        <div class="label">{label}</div>
    {/if}
</div>

<style>
    .main {
        display: grid;
        grid-template-rows: 1fr auto;
    }
    .label {
        height: 16px;
        font-family: "mck-lato", "Lato";
        font-size: 12px;
        text-align: center;
        color: #9a9a9a;
    }
    .dial {
        width: 64px;
        height: 64px;
    }
    .pac {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-color: #3a3a3a;
        overflow: hidden;
    }
    .segment {
        position: absolute;
        width: 64px;
        height: 64px;
        top: 32px;
        left: 32px;
        transform: rotate(45deg);
        transform-origin: 0 0;
        background-color: #2a2a2a;
    }
    .ring {
        top: 0%;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .fg,
    .knob {
        position: relative;
        width: 90%;
        height: 90%;
        left: 5%;
        top: 5%;
        border-radius: 100%;
    }
    .fg {
        background-color: #2a2a2a;
    }
    .knob {
        overflow: hidden;
        background-image: radial-gradient(#9a9a9a, #5a5a5a);
        cursor: pointer;
        transition: opacity 250ms;
    }
    .knob:hover, .knob.hover {
        opacity: 75%;
    }
    .marker {
        position: relative;
        width: 100%;
        height: 4px;
        top: calc(50% - 2px);
        /*transform: translateX(-100%) rotate(-30deg) translateX(100%);*/
    }
    .fill {
        height: 100%;
        width: 25%;
        background-color: #333;
    }
    .overlay {
        position: absolute;
        z-index: 3;
        border: 1px solid #ff9900;
        border-radius: 5px;
        background-color: #3a3a3aaa;
        color: #ff9900;
        font-family: "mck-lato", "Lato";
        font-size: 14px;
        padding: 8px;
        text-align: center;
    }
</style>
