<template>
    <div class="content">
        <router-view/>
    </div>

    <van-tabbar v-model="active">
        <van-tabbar-item to="/" icon="home-o" name="index">首页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="user-o" name="user">我的</van-tabbar-item>
    </van-tabbar>

</template>

<script setup lang="ts">
import {ref} from "vue";

const active = ref("index");
</script>

<style scoped>

</style>