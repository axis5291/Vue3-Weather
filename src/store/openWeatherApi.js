// stores/openWeatherApi.js
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';


export const useOpenWeatherApiStore = defineStore('openWeatherApi', () => {
  // state 정의
   const position = reactive({
    lat: 37.5683,
    lon: 126.9778,
  });

    const mainViewCurrentData =reactive({
        cityName: { title: '도시명', value: '' },
        icon: { title: '아이콘', value: '' },
    },);

    const mainViewCurrentWeatherData=reactive({
        currentTemp: { title: '현재온도', value: '' },
        feels_like: { title: '체감온도', value: '' },
        humidity: { title: '습도', value: '' },
    
    },);      

    const subViewWeatherData=reactive({     //SubView에 사용
      sunrise:{ name:"일출시간", value: '' },
      sunset: { name:"일몰시간", value: ''},
      visibility:{ name:"가시거리", value: ''},
    
    },);

    const subViewFeelngTemp=ref('');  //체감온도

    const mainViewThreeHourForecastData=ref([]);   

    const images = ref([]);

    // actions 정의
    function setLatLon(payload) {   // 위도 경도 설정
      position.lat = payload.lat;  
      position.lon = payload.lon;
    }

  
    function setMainViewCurrentData(payload) {
      mainViewCurrentData.cityName = payload.name;
      mainViewCurrentData.icon = payload.weather[0].icon;
    }

    function setMainViewCurrentWeatherData(payload) {  
      if (payload && payload.temp !== undefined) {
        mainViewCurrentWeatherData.currentTemp = (payload.temp - 273.15).toFixed(1); // 섭씨 변환
        mainViewCurrentWeatherData.feels_like = (payload.feels_like - 273.15).toFixed(1) + '°C'; // 체감온도
        mainViewCurrentWeatherData.humidity = payload.humidity + '%'; // 습도
      } else {
        console.error('Invalid weather data:', payload);
      }
    }

    function setSubViewWeatherData(payload) {  //SubView에 설정
      subViewWeatherData.sunrise.value = dayjs.unix(payload.sys.sunrise).format('HH:mm');
      subViewWeatherData.sunset.value = dayjs.unix(payload.sys.sunset).format('HH:mm');
      subViewWeatherData.visibility.value = (payload.visibility / 1000).toFixed(1) + 'km'; // 가시거리
   
    }
    function setSubViewFeelngTemp(payload) {  //체감온도 설정
      const breakPoint=[0, 5, 10, 15, 20, 25, 30];
      const breakPointText=['매우추움', '추움', '약간추움', '쌀쌀함', '신선함', '온화함', '더움', '매우더움'];
      const feel_like=(payload.main.feels_like - 273.15).toFixed(1); //섭씨로 변환
      let index=0;   //변수는 let로 선언해야 함, const로 선언하면 값이 바뀌지 않음

      for(const point of breakPoint){   //배열에서 꺼낼때는 of, 객체에서 꺼낼때는 in을 사용
          if (feel_like<=point) break;
        index++;
          
      }
      subViewFeelngTemp.value = breakPointText[index];
    }

    function setImagePath(icon) {  // 아이콘 경로 설정
      images.value = icon;
    }
      
  // 비동기 API 호출
  async function fetchOpenWeatherApi() {
    const API_KEY = '284bfdeb630520653864189833ba7c68';

    try {
        //현재 날씨 정보를 가져오는 API
        const resCurrent= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`);
                                         
        setLatLon(resCurrent.data.coord);
        setMainViewCurrentData(resCurrent.data);
        setMainViewCurrentWeatherData(resCurrent.data.main);
        setSubViewWeatherData(resCurrent.data);
        setSubViewFeelngTemp(resCurrent.data);
        setImagePath(resCurrent.data.weather[0].icon);
      
         //3시간 간격 예보정보를 가져오는 API
        const resThreeHour = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`       );
  
        mainViewThreeHourForecastData.value = resThreeHour.data.list.map((item) => {
            return {
              icon: item.weather[0].icon,
              time: dayjs(item.dt_txt).format('HH:mm'),
              temp: (item.main.temp - 273.15).toFixed(1),
              humidity: item.main.humidity,
            };
        });
        }catch(error){
           console.log(error);
        }  //catch
      } //fetchOpenWeatherApi
     
  return {
    position,
    mainViewCurrentData,
    mainViewCurrentWeatherData,
    subViewWeatherData,
    subViewFeelngTemp,
    mainViewThreeHourForecastData,
    images,

    setLatLon,
    setMainViewCurrentData,
    setMainViewCurrentWeatherData,
    setSubViewWeatherData,
    setSubViewFeelngTemp,
    setImagePath,
    fetchOpenWeatherApi,
  };  //  return
});  //useOpenWeatherApiStore
