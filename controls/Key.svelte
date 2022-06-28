<script lang="ts">
    export let style: "dark" | "light" | "custom" = "dark";
    export let active: boolean = false;
    export let disabled: boolean = false;
    export let Handler: (active: boolean) => any = (val) => {
        active = val;
    };
    export let label: string = "";

    function ClickHandler(evt: MouseEvent)
    {
        if (disabled === false) {
            Handler(!active);
        }
    }
</script>

<div class="main {active ? 'active' : ''} {style} {disabled ? 'disabled' : ''}" on:click={ClickHandler}>
    <div class="label">{label}</div>
</div>

<style>
    .main {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 2fr auto 3fr;
        user-select: none;
    }
    .main.dark {
        background-color: #404040;
        border: 1px solid #606060;
    }
    .main.light {
        background-color: #f0f0f0;
        border: 1px solid #e0e0e0;
    }
    .main .label {
        grid-row: 2/3;
        grid-column: 2/3;
        font-size: 24px;
    }
    .main.light .label {
        color: #555555;
    }
    .main.dark .label {
        color: #e0e0e0;
    }
    .main.active {
        background-color: #ff9900;
    }
    .main.active .label {
        color: #555;
    }
    .main.disabled {
        cursor: not-allowed;
        opacity: 50%;
    }
</style>
