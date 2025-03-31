<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>San Francisco</p>
                <p>2025.</p>
            </div>
        </div>
        <div id="contentBox">
            <div class="buttonBox">
                <div class="bottonBackground">
                    <boutton class="foreCast">ForeCast</boutton>
                    <button class="airQuality">AirQuaility</button>
                </div>
            </div>
            <div class="weatherBox">
                <div class="weatherDegree">
                    <p>10&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img src="../assets/43.png" alt="MainLogo">
                </div>
                <div class="weatherData">
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
        <div id="todayWeather">
            <div class="textBox">
                <p>시간대별 날씨정보</p>
                <p>이번주 날씨보기</p>
            </div>
            <div class="timelyWeatherBox">
               <div class="timelyWeather">
                    <div class="icon">
                        <img src="../assets/vue.svg" alt="">
                    </div>
                    <div class="data">
                        <p class="time"></p>
                        <p class="cuttentDegree">32&deg;</p>
                        <div>
                            <img src="../assets/drop.png" alt="">
                            <p class="fall">15%</p>
                        </div>
                    </div>

               </div>
            </div>
        </div>
       <nav>
        <i class=""></i>
        <i class=""></i>
        <i class=""></i>
        <i class=""></i>
       </nav>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>