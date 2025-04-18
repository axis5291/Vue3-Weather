<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import MapPositions from '../assets/map-positions.json';
import { useOpenWeatherApiStore } from '../store/openWeatherApi';

const store = useOpenWeatherApiStore();

const initMap = () => {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new kakao.maps.LatLng(37.27759120787, 127.07757221765),
    level: 10,
  }; // mapContainer를 찾고, mapOption을 설정합니다.

  const kakaoMap = new kakao.maps.Map(mapContainer, mapOption); // 맵 초기화

  const positions = MapPositions.map((pos) => ({  //
    latlng: new kakao.maps.LatLng(...pos.latlng),
    cityName: pos.cityName,
  })); // 위치 정보 설정

  positions.forEach(function (pos) {
    const marker = new kakao.maps.Marker({
      position: pos.latlng,
      name:pos.cityName,
    });

    marker.setMap(kakaoMap);

    kakao.maps.event.addListener(marker, 'click', () => {
      console.log('지도에서 마커 클릭 위치값:',marker.getPosition());
     
      store.setPosition(marker.getPosition());
      store.fetchOpenWeatherApi();   //***  날씨 데이터 다시 불러들임
      console.log('store.position:',store.position)
     
    });
  });
}; // initMap 끝

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script');
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e2d46aca0697bfab9c5e4a5051077d2b';
    document.head.appendChild(script);
  }
});
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
