<script>

    export let data = undefined;

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
        data[0].forEach((_v, _i) => {
            _str += ` L ${_i + 1} ${(_v + 1.0) * h / 2.0}`;
        });
        wavePath = _str;
        waveW = data[0].length;
    }
</script>

<div class="main" bind:clientHeight={h} bind:clientWidth={w}>
    <svg height="{h}px" width="{waveW}px">
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
</style>