<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
               <p>{{ currentData.cityName}}</p> 
               <p>{{ currentTime}}</p>
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
                <div class="weatherDegree">
                    <p>{{currentTemp}}&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img  :src="`/images/${currentData.icon}.png`" alt="weather icon" />

                </div>
                <div class="weatherData">
                  <div v-for="(weatherData, index) in currentWeatherData" :key="index" class="detailData">
                    <p>{{ weatherData.title }}</p>
                    <p>{{ weatherData.value }}</p>
                  </div>
                </div>
            </div> <!-- weatherBox-->
        </div> <!-- contentsBox-->

        <div id="todayWeather">
            <div class="textBox">
                <p>3시간 간격 날씨정보</p>
                <p>이번주 날씨보기</p>
            </div>
            <div class="timelyWeatherBox">
                <div class="timelyWeather" v-for="(forecastData, index) in threeHourForecastData" :key="index">
                    <div class="icon">
                        <img  :src="`/images/${forecastData.icon}.png`" alt="weather icon" />   <!-- public 폴더안에 넣으면 바로 이렇게 접근할 수 있다. -->
                    </div>
                    <div class="data">
                        <p class="time">{{ forecastData.time }}</p>
                        <p class="currentDegree"> {{forecastData.temp}} &deg;</p>
                        <div>
                          <img src="/images/drop.png" alt="" />
                          <p class="fall"> {{forecastData.humidity}}% </p>
                        </div>
                    </div> 
                </div>
            </div>  <!-- timelyWeatherBox-->
        </div> <!-- todayWeather-->
        <nav>
            <i class="fas fa-home"></i>
            <i class="fas fa-search-location"></i>
            <i class="fas fa-chart-line"></i>
            <i class="fas fa-cog"></i>
        </nav>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed} from 'vue';
    import dayjs from 'dayjs';
    import 'dayjs/locale/ko';
    import { useOpenWeatherApiStore } from '../store/openWeatherApi';
    import MapPositions from '../assets/map-positions.json'; // ❶ 한글 도시명 데이터 가져오기
    

    dayjs.locale('ko'); // 한국어로 설정

    const store = useOpenWeatherApiStore(); // Pinia store 불러오기
    const currentTime = ref(dayjs().format('YYYY. MM. DD. ddd'));
   
    onMounted(async () => {
         await store.fetchOpenWeatherApi(); // Pinia action 호출
    });

    // ❷ 영어 도시명을 한글로 변환해주는 computed
    const cityNameKo = computed(() => {
    const cityNameEn = store.mainViewCurrentData.cityName;
   
    const found = MapPositions.find(pos => pos.cityName === cityNameEn); // MapPositions 배열에서 cityName이 cityNameEn과 같은 첫 번째 객체(pos)를 찾음, found에는 일치하는 객체가 있으면 해당 객체가, 없으면 undefined가 들어감
    return found ? found.label : cityNameEn;   // 일치하는 객체가 있다면 해당 객체의 label 값을 반환하고, 없다면 영어 이름 그대로 반환
});

    const currentData = computed(() => ({
                                cityName: cityNameKo,
                                icon: store.mainViewCurrentData.icon }));

    const currentWeatherData = computed(() => store.mainViewCurrentWeatherData);
    const currentTemp = computed(() => store.mainViewCurrentWeatherData.currentTemp.value);
    const threeHourForecastData = computed(() => store.mainViewThreeHourForecastData)

  
    
//computed는 계산된 값을 자동으로 반환해주는 Vue의 반응형 기능이야.  기본 목적은 다음 두 가지야
// 1.의존하는 값이 변경되면 자동으로 다시 계산
// 2.캐싱(caching): 값이 변하지 않으면 다시 계산하지 않음 → 성능 최적화!
  
  
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/mainview.scss';

</style>