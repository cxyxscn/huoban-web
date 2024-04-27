<template>
    <van-tabs v-model:active="active">
        <van-tab title="标签 1">
        </van-tab>
        <van-tab title="标签 2">
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {getTeamListApi} from "../api/team.ts";

const active = ref(0)
const name = ref('')

const getTeamList = () => {
    getTeamListApi(name).then(res => {
        
    })
}

</script>

<style lang="less" scoped>
.nav-box{
    display: flex;
    justify-content: space-around;
}
</style>