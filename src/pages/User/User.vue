<template>
    <div class="app-container">
        <van-cell title="用户昵称" :value="user.nickname"/>
        <van-cell title="用户头像" :style="{display:'flex',alignItems:'center',height:'80px'}">
            <template #value>
                <van-image
                        style="margin-top: 5px"
                        v-if="user.avatar"
                        width="70"
                        height="70"
                        :src="'/api/'+user.avatar"
                />
            </template>
        </van-cell>
        <van-cell title="用户账号" :value="user.account"/>
        <van-cell title="用户性别">
            <template #value>
                <van-tag v-if="user.gender===0" type="primary" color="primary">男</van-tag>
                <van-tag v-if="user.gender===1" type="primary" color="red">女</van-tag>
            </template>
        </van-cell>
        <van-cell
                title="用户标签"
        >
            <template v-for="(tag,index) in user.tags" :key="index">
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
                        @click="router.push('/user/update')"
            >
                修改资料
            </van-button>
            <van-button type="danger" round block @click="logout">退出登录</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUserApi, logoutApi} from "../../api/system.ts";

const router = useRouter();
const user = ref({})

onMounted(() => {
    getCurrentUser()
})

const getCurrentUser = () => {
    getCurrentUserApi().then(res => {
        if (res.code === 200) {
            user.value = res.data
        }
    })
}

const logout = () => {
    logoutApi().then(res => {
        if (res.code === 200) {
            showToast('退出登录成功')
            router.push("/login")
        }
    })
}
</script>


<style lang="less" scoped>

</style>