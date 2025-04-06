<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
               <p>San Francisco</p> 
               <p>2025. 10. 10</p>
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
                    <p>10&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img src="../assets/01d.png" alt="MainLogo" />
                </div>
                <div class="weatherData">
                  <div v-for="(Temporary, title) in TemporaryData" :key="title" class="detailData">
                    <p>{{ Temporary.title }}</p>
                    <p>{{ Temporary.value }}</p>
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
                <div class="timelyWeather">
                    <div class="icon">
                        <img src="../assets/10d.png" alt="" />
                    </div>
                    <div class="data">
                        <p class="time">2pm </p>
                        <p class="currentDegree"> 32&deg;</p>
                        <div>
                          <img src="../assets/drop.png" alt="" />
                          <p class="fall"> 15% </p>
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
    import axios from 'axios';

    const TemporaryData = [
        {
            title: '습도',
            value: '60%',
        },
        {
            title: '풍속',
            value: '10m/s',
        },
        {
            title: '퓽향',
            value: '남서',
        },
    ];

    //https://openweathermap.org/사이트에서 날씨정보를 가져오는 API
    // 상단에 API탭을 클릭 후, Free Access로 제공하는 것을 찾아  API call로 주소를 찾고 
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}형태로 되어 있는 것을 아래에 맞게 수정해서 사용한다.
    //지금은 current weather API를 사용하고 있음
    const API_KEY = 'eab0698d3bb063e356afe1f39500bd90';
    const initialLat = 37.5683;   //위도
    const initialLon = 126.9778;   //경도   서울을 가리킴

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`)
    .then((response)=>{
            console.log(response);
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    );

   
  
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/mainview.scss';

</style>