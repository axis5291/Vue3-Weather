<template>
   <div id="mapContainer">
        <div id="map"></div>
      
    </div>
  
</template>

<script setup>

import { onMounted } from 'vue';

const initMap=() =>{
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(37.27759120787, 127.07757221765), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
         };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const positions = [
        {
         latlng: new kakao.maps.LatLng(37.27759120787, 127.07757221765),// 마커의 좌표
        },
    ];

    positions.forEach(function(pos){
        const marker=new kakao.maps.Marker({
        position: pos.latlng,  // 마커의 좌표
        });
        marker.setMap(map);
    });

};

onMounted(()=>{
    if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script');
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src ='https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e2d46aca0697bfab9c5e4a5051077d2b';
    document.head.appendChild(script);
  }
}

);
</script>

<style lang="scss" scoped>
    @import '../scss/main.scss';
  

    #mapContainer {
        @include center;
        width: 100%;
        height: 35%;
      
        #map {
            width: 80%;    // 부모 크기 기준, 보통 OK
            height: 90%;   // 부모 높이가 0이면 결국 0
            border-radius: 10px;
        }
    }
</style>