<template>
    <div class="wrap">
        <div class="container">
            <MainView />             
            <SubView />
        </div>
    </div>
</template>

<script setup>
import MainView from '../components/MainView.vue';
import SubView from '../components/SubView.vue';


</script>

<style lang="scss" scoped>
    @import '../scss/main.scss';

    .wrap {
        @include center;
        width: 100%;
        height: 100vh;
        font-size: 16px;

        .container {
            @include center;
            gap: 200px; // MainView와 SubView 사이 간격
            width: auto; // 줄 필요 없으면 auto
            max-width: 1200px;
            height: 90%;
            max-height: 1354px;
        }
}


</style>