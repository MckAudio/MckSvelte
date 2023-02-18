<script lang="ts">
    export let active = false;
    export let style: "dark" | "light" | "custom" = "dark";
    export let Handler: (value: boolean) => any = (val) => {active = val};

    function ClickHandler(evt: MouseEvent) {
        Handler(!active);
    }
</script>

<div class="main {style}">
    <div class="bg {active ? 'active' : ''}" on:click={ClickHandler}>
        <div class="knob"></div>
    </div>
</div>

<style>
    .main {
        height: 26px;
        width: 52px;
        padding: 4px;
    }
    .bg {
        height: 24px;
        width: 50px;
        border-radius: 13px;
        border: 1px solid #e0e0e0;
        transition: background-color 250ms;
        cursor: pointer;
        overflow: hidden;
    }
    .main.light .bg {
        border-color: #a0a0a0;
        background-color: #e0e0e0;
    }
    .main.dark .bg {
        border-color: #606060;
        background-color: #303030;
    }
    .main.light .bg.active {
        background-color: #0099ff !important;
    }
    .main.dark .bg.active {
        background-color: #ff9900 !important;
    }

    .knob {
        height: 20px;
        width: 20px;
        border-radius: 100%;
        position: relative;
        transition: left 250ms, background-color 250ms, opacity 250ms;
        left: 1px;
        top: 1px;
        border: 1px solid #e0e0e0;
    }
    .bg.active .knob {
        left: calc(50% + 1px);
    }

    .main.light .knob {
        border-color: #aaa;
        background-color: #f0f0f0;
        box-shadow: 0px 1px 4px 1px #a0a0a0;
    }
    .main.dark .knob {
        border-color: #606060;
        background-color: #404040;
        box-shadow: 0px 1px 4px 1px #606060;
    }
</style>