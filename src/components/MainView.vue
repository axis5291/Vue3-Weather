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

  
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/mainview.scss';

</style>