import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'

export default createRouter({
    history: createWebHistory(),  //이 모드는 URL에서 # 없이 /about처럼 깨끗한 URL을 제공
    routes: [
        {
            path: '/', //홈페이지
            name: 'home',
            component: Home,
        },
    ],
});