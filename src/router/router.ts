import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import PointInfo from "../pages/PointInfo.vue";
import WaitingPage from "../pages/WaitingPage.vue";

const routes = [
    {
        path: '/',
        component: WaitingPage,
        name: 'WaitingPage'
    },
    {
      path: '/home',
      component: MainPage,
      name: 'MainPage'  
    },
    {
        path: '/point-info',
        component: PointInfo,
        name: 'PointInfo'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;