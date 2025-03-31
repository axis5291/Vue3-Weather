<template>
    <div class="wrap">
        <div class="container">

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    @import '../scss/main.scss';

    .wrap {
       @include center;
        width: 100%;
        height: 100vh;
       font-size: 16px;
       .container{
        width: 55%;
        height: 90%;
        max-width: 1920px;
        max-height: 1354px;
       }
    }
</style>