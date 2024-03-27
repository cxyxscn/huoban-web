<template>
    <template v-if="user">
        <van-cell title="用户昵称" :value="user.username"/>
        <van-cell title="个性签名" :value="user.signature"/>
        <van-cell title="用户账号" :value="user.userAccount"/>
        <van-cell title="用户性别">
            <template #value>
                <van-tag type="primary" :color="user.gender === 0 ? 'primary' : 'red'">
                    {{ user.gender === 0 ? '男' : '女' }}
                </van-tag>
            </template>
        </van-cell>
        <van-cell
                title="用户标签"
                is-link
                @click="router.push('/user/tag')"
        >
            <template v-for="(tag,index) in user.tags.split(',')" :key="index">
                <van-tag type="primary" plain style="margin: 2px">
                    {{ tag }}
                </van-tag>
            </template>
        </van-cell>
        <van-cell title="手机号码" :value="user.phone"/>
        <van-cell title="电子邮箱" :value="user.email"/>
        <van-cell title="注册时间" :value="user.createTime"/>

        <div style="margin: 16px;">
            <van-button type="primary" round block
                        style="margin-bottom: 10px"
                        @click="router.push('/user/upp')"
            >
                修改资料
            </van-button>
            <van-button type="danger" round block @click="logout">退出登录</van-button>
        </div>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUserApi, logoutApi} from "../api/user.ts";

const router = useRouter();
const user = ref()

onMounted(() => {
    getCurrentUser()
})

const getCurrentUser = () => {
    getCurrentUserApi().then(res => {
        if (res.code === 0) {
            user.value = res.data
        }
    })
}

const logout = () => {
    logoutApi().then(res => {
        if (res.code === 0) {
            router.push("/login")
        }
    })
}
</script>


<style lang="less" scoped>

</style>