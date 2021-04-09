<script>
    export let value = 0;
    export let unit = "";
    export let Handler = undefined;

    function KeyHandler(_e) {
        if (_e.key === "Enter") {
            _e.target.blur();
        }
    }

    function OnBlur(_e) {
        if (Handler) {
            Handler(Number(_e.target.innerText));
        }
    }
</script>

<div class="main">
    <div
        class="value"
        contenteditable="true"
        spellcheck="false"
        on:keydown={KeyHandler}
        on:blur={OnBlur}
    >
        {value.toString()}
    </div>
    <span>{unit}</span>
</div>

<style>
    .main {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 8px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        border: 1px solid var(--border-color);
        border-radius: 2px;
        padding: 4px;
        overflow: hidden;
        color: var(--fg-color);
        background-color: var(--bg-color);
        font-size: var(--font-size);
        font-family: var(--font-family);
        box-shadow: 0px 1px 2px 0px #555;
    }
    .main:hover {
        background-color: var(--hover-color);
        color: var(--bg-color);
    }
    .value {
        white-space: nowrap;
        text-overflow: nowrap;
    }
</style>
