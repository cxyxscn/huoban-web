<template>
    <div class="tab-bar">
        <van-nav-bar
                :title="router.currentRoute.value.meta.title"
                left-arrow
                fixed
                border
        >
            <template #left>

            </template>
            <template #right>
                <template v-if="router.currentRoute.value.path==='/home'">
                    <van-icon name="search" @click="router.push('/search')"/>
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
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const active = ref("home")

</script>

<style lang="less" scoped>
.tab-bar {
  height: 60px;
}

.footer {
  height: 60px;
}
</style>