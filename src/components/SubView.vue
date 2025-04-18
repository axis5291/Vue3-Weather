<template>
    <div class="rightContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>{{ suvViewCurrentData.cityName }}</p> 
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
                    <p>체감:{{ subViewFeelingTemp }}</p>
                </div>
                <div class="detail">
                    <div class="title">
                        <p>상세 날씨 데이터</p>
                    </div>
                    <div class="data" v-for="(data, index) in subViewWeatherData" :key="index">
                        <div class="dataName">
                            <p></p>
                            <p>{{ data.name }}</p>
                        </div>
                        <div class="dataValue">
                            <p>{{ data.value }}<span></span>
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
    import { onMounted, computed } from 'vue';
    import Map from '../components/Map.vue';
    import dayjs from 'dayjs';
    import { useOpenWeatherApiStore } from '../store/openWeatherApi';  //openWeatherApi.js에서 export한 useOpenWeatherApiStore명을 일치시켜야 한다.
    import MapPositions from '../assets/map-positions.json'; // ❶ 한글 도시명 데이터 가져오기

    dayjs.locale('ko'); // 한국어로 설정
    const store = useOpenWeatherApiStore(); // Pinia store 불러오기
    const currentTime = dayjs().format('YYYY. MM. DD. ddd. hh:mm');

    onMounted(async () => {
         await store.fetchOpenWeatherApi(); // Pinia action 호출
    });
    // ❷ 영어 도시명을 한글로 변환해주는 computed
    const cityNameKo = computed(() => {
    const cityNameEn = store.mainViewCurrentData.cityName;
   
    const found = MapPositions.find(pos => pos.cityName === cityNameEn); // MapPositions 배열에서 cityName이 cityNameEn과 같은 첫 번째 객체(pos)를 찾음, found에는 일치하는 객체가 있으면 해당 객체가, 없으면 undefined가 들어감
                  return found ? found.label : cityNameEn;   // 일치하는 객체가 있다면 해당 객체의 label 값을 반환하고, 없다면 영어 이름 그대로 반환
    });

    const suvViewCurrentData = computed(() => ({
                                cityName: cityNameKo,
                                icon: store.mainViewCurrentData.icon }));  //넘어온 객체를 다시 객체로 담는다..

    const subViewWeatherData = computed(() => Object.values(store.subViewWeatherData));  //넘어온 객체에 값만 뽑아서 배열로 만든다.

    const subViewFeelingTemp = computed(() => store.subViewFeelngTemp);





</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/subview.scss';

</style>