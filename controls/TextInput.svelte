<script lang="ts">
import TextInputOverlay from "./TextInputOverlay.svelte";

    export let style: "dark" | "light" | "custom" = "dark";
    export let content="";
    export let name="text";

    let active=false;
</script>

{#if active}
    <TextInputOverlay {style} bind:content bind:active {name}/>
{/if}
<div class="main {style}" on:click={() => {active = true;}}>
    <div class="label">{content}</div>
</div>

<style>
    .main {
        width: calc(100% - 4px);
        min-width: 104px;
        margin: 2px;
        padding: 2px;
        border-bottom: 1px solid #d0d0d0;
        display: grid;
        grid-template-rows: 1fr auto 1fr;
        cursor: pointer;
    }
    .main.light {
        border-color: #d0d0d0;
    }
    .main.dark {
        border-color: #606060;
    }
    .label {
        grid-row: 2/3;
        font-family: "mck-lato", "Lato";
        color: #555555;
        font-size: 14px;
    }
    .main.light .label {
        color: #555555;
    }
    .main.dark .label {
        color: #e0e0e0;
    }
    .main.light:hover {
        border-color: #ff9900;
    }
    .main.dark:hover {
        border-color: #ff9900;
    }
</style>