<script lang="ts">

    export let Handler = undefined;
    export let selected = false;
    export let label = undefined;
    export let style: "dark" | "light" | "custom" = "dark";

    let boxWidth = 0;

    function ButtonClick(_evt) {
        if (Handler) {
            Handler(!selected);
        }
    }
</script>

<style>
    .main {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 8px;
        box-shadow: 0px 1px 4px 1px #555;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        display: grid;
        grid-template-rows: 2fr auto 3fr;
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
        background-color: #ff9900;
    }
    .highlight {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
    }
    .main.light .label {
        color: #555;
    }
    .main.dark .label {
        color: #e0e0e0;
    }
    .label {
        grid-row: 2/3;
        font-family: 'mck-lato', 'Lato';
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        text-overflow: clip;
    }
    .main.selected .label {
        color: #555;
    }
</style>

<div
    class="main {style} {selected ? 'selected' : ''}"
    on:mousedown={(_evt) => ButtonClick(_evt)}
    on:touchstart={(_evt) => ButtonClick(_evt)}>
    <div class="label">{label}</div>
</div>
