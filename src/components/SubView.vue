<template>
    <div class="rightContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>San Francisco</p> 
                <p>{{ currentTime }}</p>
             </div>
        </div>

        <div id="contentsBox">
            <div class="buttonBox">
                <div class="buttonBackground">
                    <button class="forecast">Forecast</button>
                    <button class="airquality">AirQuality</button>
                </div>
            </div>
            <div class="weatherBox">
                <div class="airCondition">
                    <p>매우추움</p>
                </div>
                <div class="detail">
                    <div class="title">
                        <p>Detail Temparture</p>
                    </div>
                    <div class="data">
                        <div class="dataName">
                            <p></p>
                            <p></p>
                        </div>
                        <div class="dataValue">
                            <p><span></span>&deg;
                            </p>
                        </div>
                     </div>
                    </div>
                </div>
           
        </div> <!-- contentsBox-->
        <Map />
        <nav>
            <i class="fas fa-home"></i>
            <i class="fas fa-search-location"></i>
            <i class="fas fa-chart-line"></i>
            <i class="fas fa-cog"></i>
        </nav>
    </div>
   
</template>

<script setup>
import { ref, reactive } from 'vue';
import Map from '../components/Map.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 추가
dayjs.locale('ko'); // 한국어로 설정

const currentTime = dayjs().format('YYYY. MM. DD. ddd. hh:mm');




</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/subview.scss';

</style>