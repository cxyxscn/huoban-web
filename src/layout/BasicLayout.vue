<template>
    <div class="tab-bar">
        <van-nav-bar
                :title="router.currentRoute.value.meta.title"
                left-arrow
                fixed
                border
        >
            <template #left>
                <template v-if="router.currentRoute.value.path==='/home'">
                    <van-icon name="like-o" @click="router.push('/recommend')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/team'">
                    <van-icon name="plus" @click="router.push('/team/add')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/search'">
                    <van-icon name="arrow-left" @click="router.push('/home')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/team/add'">
                    <van-icon name="arrow-left" @click="router.push('/team')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/team/search'">
                    <van-icon name="arrow-left" @click="router.push('/team')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/team/edite'">
                    <van-icon name="arrow-left" @click="router.push('/team')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/team/detail'">
                    <van-icon name="arrow-left" @click="router.push('/team')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/user/update'">
                    <van-icon name="arrow-left" @click="router.push('/user')"/>
                </template>

                <template v-if="router.currentRoute.value.path==='/recommend'">
                    <van-icon name="arrow-left" @click="router.push('/')"/>
                </template>
            </template>

            <template #right>
                <template v-if="router.currentRoute.value.path==='/home'">
                    <van-icon name="search" @click="router.push('/search')"/>
                </template>
                <template v-if="router.currentRoute.value.path==='/team'">
                    <van-icon name="search" @click="router.push('/team/search')"/>
                </template>
            </template>
        </van-nav-bar>
    </div>

    <div class="content">
        <router-view/>
    </div>

    <div class="footer" v-if="router.currentRoute.value.meta.layout">
        <van-tabbar v-model="active" fixed>
            <van-tabbar-item to="/home" icon="home-o" name="home">首页</van-tabbar-item>
            <van-tabbar-item to="/team" icon="friends-o" name="team">队伍</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o" name="user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import {onBeforeUpdate, ref} from "vue"
import {useRouter} from "vue-router"


const router = useRouter()
const title = ref('')
const path = ref('')

const active = ref('home')

onBeforeUpdate(() => {
    const path = router.currentRoute.value.path
    if (path === '/') {
        active.value = 'home'
    } else {
        active.value = path.replace('/', '')
    }
})

</script>

<style lang="less" scoped>
.tab-bar {
  height: 60px;
}

.footer {
  height: 60px;
}
</style>