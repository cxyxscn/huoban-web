<template>
    <div class="app-container">
        <van-empty v-if="userList.length===0" image="error" description="请先填写标签"/>
        <UserCard v-for="item in userList" :key="item.id" :user="item"/>
    </div>
</template>

<script setup lang="ts">
import {recommendApi} from "../../api/user.ts"
import {onMounted, ref} from "vue"
import UserCard from "../../components/UserCard.vue";

const userList = ref<userType[]>([])

onMounted(() => {
    getRecommendUsers()
})


const getRecommendUsers = () => {
    recommendApi().then(res => {
        if (res.code === 200) {
            userList.value = res.data
        } else {
            showToast(res.msg)
        }
    })
}

</script>

<style lang="less" scoped>
</style>