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
                    <p>{{currentWeatherData.currentTemp}}&deg;</p>
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
                <p>시간대별 날씨정보</p>
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
    import { onMounted, ref, computed } from 'vue';
    import dayjs from 'dayjs';
    import 'dayjs/locale/ko';
    import { useOpenWeatherApiStore } from '../store/openWeatherApi';

    dayjs.locale('ko'); // 한국어로 설정

    const store = useOpenWeatherApiStore(); // Pinia store 불러오기
    const currentTime = ref(dayjs().format('YYYY. MM. DD. ddd'));
   
    onMounted(async () => {
         await store.fetchOpenWeatherApi(); // Pinia action 호출
    });

    const currentData = computed(() => ({
                                cityName: store.mainViewCurrentData.cityName,
                                icon: store.mainViewCurrentData.icon }));

    const currentWeatherData =  computed(() => store.mainViewCurrentWeatherData);

    const threeHourForecastData = computed(() => store.mainViewThreeHourForecastData);

       
  
  
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/mainview.scss';

</style>