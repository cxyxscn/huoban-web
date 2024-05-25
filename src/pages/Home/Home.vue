<template>
    <div class="app-container">
        <van-empty description="空列表" v-show="userList.length === 0"/>
        <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="userPage"
        >
            <UserCard v-for="item in userList" :key="item.id" :user="item"/>
        </van-list>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {onMounted, ref} from "vue"
import {userPageApi} from "../../api/user.ts"
import UserCard from "../../components/UserCard.vue";

const route = useRoute()
const loading = ref(true)
const finished = ref(false);
const tags = route.query.tags || ''
const userList = ref<userType[]>([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

onMounted(
    () => {
        userPage()
    }
)

const userPage = () => {
    userPageApi(pageNum.value, pageSize.value, tags).then(res => {
        loading.value = false
        total.value = res.data.total
        userList.value = [...userList.value, ...res.data.records]
        pageNum.value = pageNum.value + 1
        if (userList.value.length >= total.value) {
            finished.value = true
        }
    })
}

</script>

<style lang="less" scoped>

</style>