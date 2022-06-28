<script lang="ts">
    import { onMount } from "svelte";
    import Key from "./Key.svelte";

    export let content = "";
    export let name = "vale";
    export let active = false;
    export let style: "dark" | "light" | "custom" = "dark";


    let w = 0;
    let h = 0;

    let caps = false;
    let text = "";
    let textLeft = "";
    let textRight = "";
    let split = -1;
    let lastSpace = false;

    $: textLeft = text.slice(0, split);
    $: textRight = text.slice(split);
    $: lastSpace = text.charAt(text.length - 1) === ' ';

    let rows = ["numbers", "one", "two", "three"];
    let keys = [
        [
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["z", "x", "c", "v", "b", "n", "m"],
        ],
        [
            ["!", "?", ".", ",", "-", "_", "+", "=", "(", ")"],
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"],
        ],
    ];

    function KeyPress(rowIdx: number, keyIdx: number) {
        text = textLeft + keys[caps ? 1 : 0][rowIdx][keyIdx] + textRight;
        split += 1;
        caps = false;
    }

    function Backspace() {
        text = textLeft.slice(0, textLeft.length - 1) + textRight;
        split = Math.max(0, split - 1);
    }
    function Space() {
        text = textLeft + " " + textRight;
        split += 1;
    }
    function Enter() {
        content = text.trim();
        active = false;
    }
    function Shift() {
        caps = !caps;
    }

    function MoveLeft() {
        split = Math.max(0, split - 1);
    }
    function MoveRight() {
        split = Math.min(text.length, split + 1);
    }

    onMount(() => {
        text = content;
        split = text.length;
    });
</script>

<div class="main {style}" bind:clientHeight={h} bind:clientWidth={w}>
    <div class="header">
        <div/>
        <div class="title">Please enter {name}:</div>
        <Key {style} label="Close" Handler={() => {active = false;}}/>
    </div>
    <div class="content">
        <!--
        <div class="chars">
            {#each chars as char}
                <div class="char">{char}</div>
            {/each}
        </div>-->
        <div class="row blocker"/>
        <Key {style} label="<" Handler={MoveLeft}/>
        <div/>
        <div class="title">{textLeft}<div class="cursor">|</div>{textRight}</div>
        <div/>
        <Key {style} label=">" Handler={MoveRight}/>
            <div class="row blocker"/>
    </div>
    <div class="keyboard">
        {#each rows as row, rIdx}
            <div class="keyrow {row}">
                {#if row === "three"}
                    <Key {style} active={caps} Handler={Shift} label="Shift"/>
                {:else if row !== "numbers"}
                    <div />
                {/if}
                {#each keys[caps ? 1 : 0][rIdx] as key, kIdx}
                    <Key {style} Handler={() => KeyPress(rIdx, kIdx)} label={key}/>
                {/each}
                {#if row === "numbers"}
                <Key {style} label="Back" Handler={Backspace}/>
                {:else if row === "two"}
                <Key {style} label="Enter" Handler={Enter}/>
                {:else if row === "three"}
                <Key {style} label="Space" Handler={Space} disabled={lastSpace}/>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .main {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
    .main.dark {
        background-color: #303030aa;
        color: #e0e0e0;
    }
    .main.light {
        background-color: #d0d0d0aa;
        color: #555555;
    }

    .row.blocker {
        grid-column: 1/-1;
    }

    .title {
        text-align: center;
    }

    .main.dark .header {
        border-bottom: 1px solid #606060;
        background-color: #303030;
    }
    .main.light .header {
        border-bottom: 1px solid #a0a0a0;
        background-color: #d0d0d0;
    }

    .header {
        display: grid;
        grid-template-columns: 96px 1fr 96px;
        grid-template-rows: 48px;
        padding: 16px;
    }
    .header .title {
        font-style: italic;
        font-size: 24px;
        line-height: 48px;
    }
    .close {
        grid-column: -2/-1;
        color: white;
        font-family: "mck-lato", "Lato";
        font-weight: bold;
        font-size: 24px;
        padding: 8px 16px;
    }
    .content {
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        display: grid;
        grid-template-rows: 1fr 48px 1fr;
        grid-template-columns: 48px 1fr auto 1fr 48px;
        padding: 16px;
    }
    .content .title {
        font-size: 24px;
        font-weight: bold;
        padding: 8px;
        border-bottom: 1px solid;
    }
    .cursor {
        display: inline-block;
        font-style: italic;
        font-weight: bolder;
        margin: 0px 2px 0px 2px;
        animation-duration: 1500ms;
        animation-name: fadeOut;
        animation-iteration-count: infinite;
    }
    @keyframes fadeOut {
        from {
            opacity: 100%;
        }
        50% {
            opacity: 0%;
        }
        to {
            opacity: 100%;;
        }
    }
    .main.dark .content .title {
        border-color: #606060;
    }
    .main.light .content .title {
        border-color: #a0a0a0
    }
    .keyboard {
        width: calc(100% - 32px);
        height: calc(100% - 33px);
        display: grid;
        padding: 16px;
        grid-template-rows: repeat(4, 48px);
        gap: 16px;
    }
    .main.dark .keyboard {
        border-top: 1px solid #606060;
        background-color: #303030;
    }
    .main.light .keyboard {
        border-top: 1px solid #a0a0a0;
        background-color: #d0d0d0;
    }
    .keyrow {
        display: grid;
        gap: 16px;
    }
    .keyrow.numbers {
        grid-template-columns: repeat(10, 2fr) 3fr;
    }
    .keyrow.one {
        grid-template-columns: 1fr repeat(10, 2fr) 2fr;
    }
    .keyrow.two {
        grid-template-columns: 2fr repeat(9, 2fr) 3fr;
    }
    .keyrow.three {
        grid-template-columns: 3fr repeat(7, 2fr) 6fr;
    }
</style>
