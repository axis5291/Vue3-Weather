import { createApp } from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'

import '@fortawesome/fontawesome-free/css/all.min.css';
//fontawesome을 사용하기 위해 설치함.
//npm install @fortawesome/fontawesome-free 실행하면 node_modules/@fortawesome/fontawesome-free 폴더에 설치됨.
//이후 main.js에서 import '@fortawesome/fontawesome-free/css/all.min.css'를 통해 css파일을 불러옴.

createApp(App).use(router).use(createPinia()).mount('#app');
