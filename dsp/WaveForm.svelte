<script lang="ts">

    export let data = undefined;
    export let style: "dark" | "light" | "custom" = "dark";

    let wave = [];
    let wavePath = "";
    let w = 0;
    let waveW = 0;
    let h = 0;
    let curW = 0;
    let curH = 0;

    $: if (data !== undefined) {
        UpdateWave();
    }

    $: if (w !== curW) {
        UpdateWave();
        curW = w;
    }

    $: if (h !== curH) {
        UpdateWave();
        curH = h;
    }

    function UpdateWave() {
        if (data === undefined) {
            return;
        }
        if (h <= 0 || w <= 0) {
            return;
        }
        let _str = `M 0 ${h / 2.0}`;

        let factor = 5.0;

        let len = Math.min(w*factor, data[0].length/factor);
        for (let i = 0; i < len; i++)
        {
            _str += ` L ${(i + 1)/factor} ${(data[0][i] + 1.0) * h / 2.0}`;
        }
        wavePath = _str;

        /*
        data[0].forEach((_v, _i) => {
            _str += ` L ${_i + 1} ${(_v + 1.0) * h / 2.0}`;
        });
        wavePath = _str;
        waveW = data[0].length;
        */
    }
</script>

<div class="main {style}" bind:clientHeight={h} bind:clientWidth={w}>
    <svg height="{h}px" width="{w}px">
        {#if wavePath !== ""}
            <path d="{wavePath}"/>
        {/if}
    </svg>
</div>

<style>
    .main {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        overflow-x: auto;
    }
    .main.dark path {
        fill:#ff9900;
    }
    .main.light path {
        fill: #0099ff;
    }
</style>