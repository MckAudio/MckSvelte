<script lang="ts">

    export let Handler = undefined;
    export let selected = false;
    export let label = undefined;
    export let style: "dark" | "light" | "custom" = "dark";
    export let disabled = false;

    let boxWidth = 0;

    function ButtonClick(_evt) {
        if (Handler && disabled === false) {
            Handler(!selected);
        }
    }
</script>

<style>
    .main {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        display: grid;
        grid-template-rows: 2fr auto 3fr;
    }
    .main.light {
        border: 1px solid #e0e0e0;
        background-color: #f0f0f0;
        color: #505050;
        box-shadow: 0px 1px 4px 1px #555;
    }
    .main.dark {
        border: 1px solid #505050;
        background-color: #404040;
        color: #f0f0f0;
        box-shadow: 0px 1px 4px 1px #202020;
    }
    .main.light.selected {
        border-color: #0077dd;
        background-color: #0099ff;
        color: #fff;
    }
    .main.dark.selected {
        border-color: #dd7700;
        background-color: #ff9900;
        color: #303030;
    }
    .highlight {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
    }
    .label {
        grid-row: 2/3;
        font-family: 'mck-lato', 'Lato';
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        text-overflow: clip;
        user-select: none;
    }
    .main.disabled {
        cursor: not-allowed;
        opacity: 50%;
    }
</style>

<div
    class="main {style} {selected ? 'selected' : ''} {disabled ? 'disabled' : ''}"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    <div class="label">{label}</div>
</div>
