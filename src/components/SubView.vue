<template>
    <div class="rightContainer">
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
                <div class="airCondition">
                    <p>체감:{{ feelingTemp }}</p>
                </div>
                <div class="detail">
                    <div class="title">
                        <p>상세 날씨 데이터</p>
                    </div>
                    <div class="data" v-for="(data, index) in subWeatherData" :key="index">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Map from '../components/Map.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 추가

dayjs.locale('ko'); // 한국어로 설정

const currentTime = dayjs().format('YYYY. MM. DD. ddd. hh:mm');
const cityName = ref("");
const subWeatherData=ref([]); //서브뷰에서 보여줄 날씨 데이터
const feelingTemp = ref(""); //체감온도


const fetchOpenWeather = async () => {
    const API_KEY = '284bfdeb630520653864189833ba7c68';
    const initialLat = 37.5683;   //위도(Latitude:læt.ɪ.tjuːd)
    const initialLon = 126.9778;  //경도(Longitude:ˈlɒŋ.ɡɪ.tjuːd)   서울을 가리킴

    try {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}`)
        .then((response) => {
            cityName.value = response.data.name;
                    
            const sunriseHours = new Date(response.data.sys.sunrise * 1000).getHours();
            const sunriseMinutes = new Date(response.data.sys.sunrise * 1000).getMinutes();
            const sunrise = sunriseHours + ':' + (sunriseMinutes < 10 ? '0' : '') + sunriseMinutes;
           
            const sunsetHours = new Date(response.data.sys.sunset * 1000).getHours();
            const sunsetMinutes = new Date(response.data.sys.sunset * 1000).getMinutes();
            const sunset = sunsetHours + ':' + (sunsetMinutes < 10 ? '0' : '') + sunsetMinutes;
            
            const visibility = response.data.visibility.toLocaleString(); // 가시거리 toLocaleString()은 세자리수마다 콤마를 찍어줌

            const feels_like=parseFloat((response.data.main.feels_like - 273.15).toFixed(1));
            console.log('체감온도:',feels_like);
          
            const breakPoint=[0, 5, 10, 15, 20, 25, 30];
            const breakPointText=['매우추움', '추움', '약간추움', '쌀쌀함', '신선함', '온화함', '더움', '매우더움'];
            let index=0;   //변수는 let로 선언해야 함, const로 선언하면 값이 바뀌지 않음

            for(const point of breakPoint){   //배열에서 꺼낼때는 of, 객체에서 꺼낼때는 in을 사용
                if (feels_like<=point) break;
              index++;
                
            }
            feelingTemp.value = breakPointText[index];
           
            const processedWeatherData=[
                { name:"일출시간", value: "0"+sunrise },
                { name:"일몰시간", value: sunset},
                { name:"가시거리", value: visibility+"m"},
                { name:"체감온도", value: feelingTemp},
               
            ];

            subWeatherData.value = processedWeatherData; //서브뷰에서 보여줄 날씨 데이터

            console.log('SubView에서 현재날씨 정보:', response.data);  //**API에서 받아온 데이터을 콘솔에 찍어보고 넘어온 데이터를 살펴보면서 아래에 필요한 데이터를 사용한다.
        });
      
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

onMounted(() => {
    fetchOpenWeather(); //외부의 api를 호출하는 함수
    //"외부 API에서 데이터를 불러와서 화면에 보여줘야 한다면, 컴포넌트가 화면에 완전히 마운트된 직후 (onMounted)에 호출하는 게 가장 안전하다."
});



</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/subview.scss';

</style>