import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'

export default createRouter({
    history: createWebHistory(),  //history mode사용을 위해->새로고침을 했을 때 페이지를 찾을수 없음을 방지하기 위해 사용
    routes: [
        {
            path: '/', //홈페이지
            name: 'home',
            component: Home,
        },
    ],
});