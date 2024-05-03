import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import Home from "../pages/Home/Home.vue"
// @ts-ignore
import Team from "../pages/Team/Team.vue"
// @ts-ignore
import User from "../pages/User/User.vue"
// @ts-ignore
import Search from "../pages/Home/Search.vue"
// @ts-ignore
import Login from "../pages/System/Login.vue"
// @ts-ignore
import Register from "../pages/System/Register.vue"
// @ts-ignore
import {getCurrentUserApi} from "../api/system.ts"
// @ts-ignore
import UserUpdate from "../pages/User/Update.vue"
// @ts-ignore
import TeamAdd from "../pages/Team/Add.vue"
// @ts-ignore
import TeamSearch from "../pages/Team/Search.vue"
// @ts-ignore
import TeamDetail from "../pages/Team/Detail.vue"
// @ts-ignore
import TeamEdite from "../pages/Team/Edite.vue"
// @ts-ignore
import Recommend from "../pages/Home/Recommend.vue"

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
        path: '/recommend',
        component: Recommend,
        meta: {
            title: '匹配模式',
            layout: false,
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
        path: '/team/detail/:id',
        component: TeamDetail,
        meta: {
            title: '队伍详细',
            layout: true,
        }
    },
    {
        path: '/team/edite/:id',
        component: TeamEdite,
        meta: {
            title: '编辑队伍',
            layout: true,
        }
    },
    {
        path: '/team/add',
        component: TeamAdd,
        meta: {
            title: '创建队伍',
            layout: false,
        }
    },
    {
        path: '/team/search',
        component: TeamSearch,
        meta: {
            title: '搜索队伍',
            layout: false,
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
        path: '/user/update',
        component: UserUpdate,
        meta: {
            title: '修改资料',
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
        if (res.code === 200) {
            // 如果试图访问的是无需权限的公共路由，则直接跳转
            if (isPublicRoute) {
                next({path: '/home'});
            } else {
                // 否则，如果访问的是需要权限的路由，则继续导航
                next();
            }
        } else {
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