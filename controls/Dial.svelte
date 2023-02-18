<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { DialSettings } from "./Types";

    export let style: "dark" | "light" | "custom" = "dark";
    export let value: number = 0.0;
    export let Handler: (val: number) => void = () => {};
    export let settings: DialSettings = new DialSettings();

    let dragging = false;
    let touching = false;
    let knob: HTMLElement = undefined;
    let marker: HTMLElement = undefined;
    let curValue = -1.0;
    let normValue = -1.0;
    let mousePosY = 0;
    let fingerPos = [0, 0];

    function DisplayValue(v: number, s: DialSettings) {
        let tmp = v;
        if (s.extractValue !== undefined) {
            tmp = s.extractValue(v);
        }
        normValue = tmp;
        tmp = (tmp - 0.5) * 1.0;
        let angle = 90.0 + tmp * 270.0;

        if (marker !== undefined) {
            marker.style.transform = `rotate(${angle}deg)`;
        }
    }

    function ChangeValue(v: number) {
        let tmp = v;
        if (settings.formatValue(v)) {
            tmp = settings.formatValue(v);
        }
        Handler(tmp);
    }

    function MouseHandler(evt: MouseEvent) {
        switch (evt.type) {
            case "mousedown":
                if (evt.ctrlKey && settings.default !== undefined) {
                    Handler(settings.default);
                    break;
                }
                dragging = true;
                mousePosY = evt.clientY;
                fingerPos = [evt.clientX, evt.clientY];
                curValue = normValue;
                break;
            case "mousemove":
                if (dragging) {
                    let tmp = curValue + (mousePosY - evt.clientY) / 100.0;
                    fingerPos = [evt.clientX, evt.clientY];
                    ChangeValue(Math.max(0.0, Math.min(1.0, tmp)));
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

    function GetOverlayText(v: number) {
        let tmp = v.toFixed(settings.dec);
        if (settings.unit !== undefined) {
            return `${tmp} ${settings.unit}`;
        } else {
            return tmp;
        }
    }

    $: DisplayValue(value, settings);

    onMount(() => {
        window.addEventListener("mouseup", MouseHandler);
        window.addEventListener("mousemove", MouseHandler);
        window.addEventListener("touchend", TouchHandler);
        window.addEventListener("touchmove", TouchHandler);

        DisplayValue(value, settings);
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
        class="overlay {style}"
        style="left: {Math.max(4, fingerPos[0] - 25)}px; top: {Math.max(
            4,
            fingerPos[1] - (touching ? 64 : 40)
        )}px;"
    >
        {GetOverlayText(value)}
    </div>
{/if}
<div class="main {style}">
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
    {#if settings.name !== undefined}
        <div class="label">{settings.name}</div>
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
    .knob {
        overflow: hidden;
        cursor: pointer;
        transition: opacity 250ms;
    }
    .knob:hover,
    .knob.hover {
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
    }
    .overlay {
        position: absolute;
        z-index: 3;
        border: 1px solid #ff9900;
        border-radius: 5px;
        background-color: #3a3a3add;
        color: #ff9900;
        font-family: "mck-lato", "Lato";
        font-size: 14px;
        padding: 8px;
        text-align: center;
    }

    .main.dark .pac {
        background-color: #3a3a3a;
    }
    .main.dark .segment {
        background-color: #2a2a2a;
    }
    .main.dark .fg {
        background-color: #2a2a2a;
    }
    .main.dark .knob {
        background-image: radial-gradient(#9a9a9a, #5a5a5a);
    }
    .main.dark .fill {
        background-color: #3a3a3a;
    }

    .main.light .pac {
        background-color: #b0b0b0;
    }
    .main.light .segment {
        background-color: #fafafa;
    }
    .main.light .fg {
        background-color: #fafafa;
    }
    .main.light .knob {
        background-image: radial-gradient(#d0d0d0, #808080);
    }
    .main.light .fill {
        background-color: #5a5a5a;
    }
    .overlay.light {
        background-color: #f0f0f0dd;
        color: #3a3a3a;
        border-color: #3a3a3a;
    }
</style>
