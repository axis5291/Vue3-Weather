<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
               <p>{{ cityName }}</p> 
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
                <div class="weatherDegree">
                    <p>{{currentTemp}}&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img  :src="`/images/${icon}.png`" alt="weather icon" />

                </div>
                <div class="weatherData">
                  <div v-for="(Temporary, title) in temporaryData" :key="title" class="detailData">
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
                <div class="timelyWeather" v-for="(data, index) in threeHourForecastData" :key="index">
                    <div class="icon">
                        <img  :src="`/images/${data.icon}.png`" alt="weather icon" />
                    </div>
                    <div class="data">
                        <p class="time">{{ data.time }}</p>
                        <p class="currentDegree"> {{data.temp}} &deg;</p>
                        <div>
                          <img src="/images/drop.png" alt="" />
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
    import { ref, reactive } from 'vue';
    import axios from 'axios';
    import dayjs from 'dayjs';
    import 'dayjs/locale/ko'; // 한국어 로케일 추가
    dayjs.locale('ko'); // 한국어로 설정

    const temporaryData =reactive({
                        humidity: { title: '습도', value: '60%' },
                        wind: { title: '풍속', value: '5.0m/s' },
                        pressure: { title: '체감온도', value: '1013hPa' },
       },);
       

    //https://openweathermap.org/사이트에서 날씨정보를 가져오는 API
    // 상단에 API탭을 클릭 후, Free Access로 제공하는 것을 찾아  API call로 주소를 찾고 
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}형태로 되어 있는 것을 아래에 맞게 수정해서 사용한다.
    //지금은 current weather API를 사용하고 있음
    const API_KEY = '284bfdeb630520653864189833ba7c68';
    const initialLat = 37.5683;   //위도(Latitude:læt.ɪ.tjuːd)
    const initialLon = 126.9778;  //경도(Longitude:ˈlɒŋ.ɡɪ.tjuːd)   서울을 가리킴

    const currentTime = dayjs().format('YYYY. MM. DD. ddd. hh:mm')
    const currentTemp=ref(0);  //현재시간에 따른 현재온도 
    const temp=ref('');
    const icon=ref('');
    const cityName=ref('');

    //현재 날씨 정보를 가져오는 API
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`)
    .then((response)=>{
            console.log('현재날씨 정보',response.data);  //**API에서 받아온 데이터을 콘솔에 찍어보고 넘어온 데이터를 살펴보면서 아래에 필요한 데이터를 사용한다.
       
            cityName.value = response.data.name;
            currentTemp.value= (response.data.main.temp - 273.15).toFixed(1); // 섭씨 변환
            icon.value= response.data.weather[0].icon;
            temporaryData.humidity.value = response.data.main.humidity + '%';//습도
            temporaryData.pressure.value = (response.data.main.feels_like - 273.15).toFixed(1) + '°C';  //체감온도
            temporaryData.wind.value = response.data.wind.speed + 'm/s';  //풍속
           }
    ).catch(
        (error)=>{
            console.log(error);
        }
    );

//3시간 간격 예보정보를 가져오는 API
    const threeHourForecastData=ref([]);
       
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`)
    .then((response) => {
    console.log('3시간 일기얘보 전체정보:', response.data);

    for(let i=0; i<response.data.list.length; i++){
        const time = dayjs(response.data.list[i].dt_txt).format('MM/DD HH:mm');  
        const temp = (response.data.list[i].main.temp - 273.15).toFixed(1);
        const icon = response.data.list[i].weather[0].icon;
        threeHourForecastData.value.push({time, temp, icon});
    }

    console.log('3시간얘보 정보 시간, 온도, 아이콘:', threeHourForecastData.value);

  })
  .catch((error) => {
    console.error('에러 발생:', error);
  });
  
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/mainview.scss';

</style>