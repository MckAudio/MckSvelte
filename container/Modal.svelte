<script>
import Button from "../controls/Button.svelte";
    export let show = true;
    export let title = "";
    export let auto = true;
</script>

<div class="main {auto ? 'auto' : ''}">
    <div class="content">
        <div class="title">
            <div/>
            <b>{title}</b>
            <div/>
        </div>
        <div>
        <slot/>
        </div>
        <div class="buttons">
            <div/>
            <Button Handler={() => { show = false; }}>Close</Button>
            <div/>
        </div>
    </div>
</div>

<style>
    .main {
        margin: 0px;
        padding: 0px;
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: #0004;
        display: grid;
        grid-template-columns: 1fr 60% 1fr;
        grid-template-rows: 3fr 60% 5fr;
    }
    .main.auto {
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 3fr auto 5fr;
    }
    .content {
        grid-row: 2/3;
        grid-column: 2/3;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
        box-shadow: 0px 1px 2px 0px var(--shadow-color);
        border-radius: 2px;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
    .buttons, .title {
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
    }
    .buttons {
        border-top: 1px solid var(--border-light-color);
    }
    .title {
        border-bottom: 1px solid var(--border-light-color);
    }
    .title b {
        font-family: var(--font-family);
        font-size: var(--font-header-size);
        color: var(--fg-color);
    }
</style>