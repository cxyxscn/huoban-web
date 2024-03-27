import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Team from "../pages/Team.vue";
// @ts-ignore
import User from "../pages/User.vue";
// @ts-ignore
import Search from "../pages/Search.vue";
// @ts-ignore
import Login from "../pages/Login.vue";
// @ts-ignore
import Register from "../pages/Register.vue";
import {getCurrentUserApi} from "../api/user.ts";
// @ts-ignore
import UserUpp from "../pages/UserUpp.vue";
// @ts-ignore
import UserTag from "../pages/UserTag.vue";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '首页',
            layout: true,
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            layout: false,
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: '注册',
            layout: false,
        }
    },
    {
        path: '/team',
        component: Team,
        meta: {
            title: '队伍',
            layout: true,
        }
    },
    {
        path: '/user',
        component: User,
        meta: {
            title: '我的',
            layout: true,
        },
    },
    {
        path: '/user/upp',
        component: UserUpp,
        meta: {
            title: '修改资料',
            layout: false,
        },
    },
    {
        path: '/user/tag',
        component: UserTag,
        meta: {
            title: '修改标签',
            layout: false,
        },
    },
    {
        path: '/search',
        component: Search,
        meta: {
            title: '搜索',
            layout: false,
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    const isPublicRoute = to.path === '/login' || to.path === '/register';
    // 获取用户信息
    getCurrentUserApi().then(res => {
        // 如果用户已经登录（通过Vuex状态管理获取）
        // @ts-ignore
        if (res.code === 0) {
            // 如果试图访问的是无需权限的公共路由，则直接跳转
            if (isPublicRoute) {
                next({path: '/home'});
            } else {
                // 否则，如果访问的是需要权限的路由，则继续导航
                next();
            }
        } else {
            // 如果用户未登录
            showToast('未登录')
            if (isPublicRoute) {
                // 允许访问登录和注册页
                next();
            } else {
                // 否则重定向到登录页
                next('/login');
            }
        }
    })
})


export default router