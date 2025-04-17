//컴포지션 방식에서  pinia는 아래와 같은 구조로 사용하면 된다.
//1.데이터를 저장하는 변수 선언 2.데이터를 변경하는 함수 선언 3. 비동기 API 호출 함수 선언  4.1,2,3을 묶어서 export

import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

//컴포넌트에서  import { useOpenWeatherApiStore } from '../store/openWeatherApi';로 쓰임
// defineStore('openWeatherApi')의 문자열은 Pinia 내부에서 이 스토어를 구분하는 고유 ID, 같은 방식으로 새로운 스토어를 만들 때는 이 ID가 중복되지 않도록 ('openWeatherApi2' 등) 구분해서 작성해야 함
export const useOpenWeatherApiStore = defineStore('openWeatherApi', () => {  
  
  //1.데이터를 저장하는 변수 선언:reactive()를 사용하여 객체로 담는다.
    const position = reactive({
    lat: 37.5683,
    lon: 126.9778,
    });

    const mainViewCurrentData =reactive({       //reactive({}) 반응형 객체를 만들기 위한 함수. 괄호 안에는 객체 하나만 들어감. ->속성(cithName, icon)에다가 다시 객체{}할당
        cityName: { title: '도시명', value: '' },
        icon: { title: '아이콘', value: '' },
    });

    const mainViewCurrentWeatherData=reactive({
        currentTemp: { title: '현재온도', value: '123' },
        feels_like: { title: '체감온도', value: '3' },
        humidity: { title: '습도', value: '2' },
    });      

    const subViewWeatherData=reactive({     //SubView에 사용
      sunrise:{ name:"일출시간", value: '' },
      sunset: { name:"일몰시간", value: ''},
      visibility:{ name:"가시거리", value: ''},
    });

    const subViewFeelngTemp=ref('');  //체감온도, **단순배열은 ref()로 선언

    const mainViewThreeHourForecastData=ref([]);   //**3시간단위로 여러 객체의 데이터들이 온다면 ref([]) 배열을 사용 */

    const images = ref([]);

    // 2. 데이터를 변경하는 함수 선언
    function setLatLon(payload) {   // 위도 경도 설정
      position.lat = payload.lat;  
      position.lon = payload.lon;
    }
  
    function setMainViewCurrentData(payload) {
      mainViewCurrentData.cityName = payload.name;
      mainViewCurrentData.icon = payload.weather[0].icon;
    }

    function setMainViewCurrentWeatherData(payload) {  
        mainViewCurrentWeatherData.currentTemp.value = (payload.temp - 273.15).toFixed(1); // 섭씨 변환  **value로 값을 담는것에 유의
        mainViewCurrentWeatherData.feels_like.value = (payload.feels_like - 273.15).toFixed(1) + '°C'; // 체감온도
        mainViewCurrentWeatherData.humidity.value = payload.humidity + '%'; // 습도
     }//let num = 3.14159;  num.toFixed(0); -> "3"  num.toFixed(1);-> "3.1"  num.toFixed(2); -> "3.14"  문자열로 변환됨

    function setSubViewWeatherData(payload) {  //SubView에 설정
      subViewWeatherData.sunrise.value = dayjs.unix(payload.sys.sunrise).format('HH:mm');
      subViewWeatherData.sunset.value = dayjs.unix(payload.sys.sunset).format('HH:mm');
      subViewWeatherData.visibility.value = (payload.visibility / 1000).toFixed(1) + 'km'; // 가시거리
    }

    function setSubViewFeelngTemp(payload) {  //체감온도 설정
      const breakPoint=[0, 5, 10, 15, 20, 25, 30];
      const breakPointText=['매우추움', '추움', '약간추움', '쌀쌀함', '신선함', '온화함', '더움', '매우더움'];
      const feel_like=(payload.main.feels_like - 273.15).toFixed(0); //섭씨로 변환
      let index=0;   //변수는 let로 선언해야 함, const로 선언하면 값이 바뀌지 않음

      for(const point of breakPoint){   //*배열에서 꺼낼때는 of, 객체에서 꺼낼때는 in을 사용
          if (feel_like<=point) break;   //*break는 반복문을 중단하는 역할
        index++;
      }
      subViewFeelngTemp.value = breakPointText[index];
    }

    function setImagePath(icon) {  // 아이콘 경로 설정
      images.value = icon;
    }
      
  // 3. 비동기 API 호출 함수 선언
  async function fetchOpenWeatherApi() {
    const API_KEY = '284bfdeb630520653864189833ba7c68';

    try {
        //현재 날씨 정보를 가져오는 API
        const resCurrent= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`);
        console.log("resCurrent", resCurrent);                                
        setLatLon(resCurrent.data.coord);    //***resCurrent.data로 접근해야 실제 원하는 날씨관련 데이터만 가져올수 있다..resCurrent는 데이터 말고도 header같은 부가적 정보도 있음 */
        setMainViewCurrentData(resCurrent.data);
        setMainViewCurrentWeatherData(resCurrent.data.main);
        setSubViewWeatherData(resCurrent.data);
        setSubViewFeelngTemp(resCurrent.data);
        setImagePath(resCurrent.data.weather[0].icon);
      
         //3시간 간격 예보정보를 가져오는 API
        const resThreeHour = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}`       );
  
         //list라는 배열에서 하나하나 꺼내서 item이라는 이름으로 받고, map()을 통해 icon, time, temp, humidity 같은 속성으로 이루어진 새로운 배열을 만든다
         //return은 왜 필요?	map()은 return된 값을 모아서 새 배열을 만들기 때문
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

  // 4.1,2,3을 묶어서 export
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
