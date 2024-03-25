import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import Index from "../pages/Index.vue";
// @ts-ignore
import Team from "../pages/Team.vue";
// @ts-ignore
import User from "../pages/User.vue";

const routes = [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/team',
        component: Team,
    },
    {
        path: '/user',
        component: User,
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})