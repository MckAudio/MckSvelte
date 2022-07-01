<script lang="ts">

</script>

<div class="main">
    <div class="segment"></div>

    <div class="overlay"></div>
</div>

<style>
    .main {
        height: 80px;
        width: 80px;
        background-color: blueviolet;
        border-radius: 40px;
        overflow: hidden;
    }
    .segment {
        position: relative;
        width: 80px;
        height: 80px;
        background-color: aqua;
        transform: rotate(45deg) skew(0deg);
        transform-origin: 0 0;
    }
    .overlay {
        position: relative;
        background-color: fuchsia;
        width: 72px;
        height: 72px;
        border-radius: 100%;
        top: 4px;
        left: 4px;
    }
</style>