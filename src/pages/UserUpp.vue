<template>
    <van-form @submit="onSubmit">
        <van-field
                v-model="user.nickname"
                label="用户昵称"
                name="nickname"
                placeholder="请输入用户昵称"
                :rules="[{ required: true, message: '请输入用户昵称' }]"
        />
        <van-field
                v-model="fieldValue"
                is-link
                readonly
                label="性别"
                placeholder="请选择性别"
                @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>

        <van-field
                v-model="user.phone"
                label="手机号"
                name="phone"
                placeholder="请输入手机号"
                :rules="[
                    { required: true, message: '请输入手机号' },
                    {
                        pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '手机号格式不正确'
                    }
                ]"
        />
        <van-field
                v-model="user.email"
                label="邮箱"
                name="email"
                placeholder="请输入邮箱"
                :rules="[
                    { required: true, message: '请输入邮箱' },
                    {
                        pattern:/^[a-zA-Z0-9._%+-]+@qq.com$/,
                        message:'请输入@qq.com的邮箱'
                    }
                ]"
        />
        <van-field
                v-model="user.userPassword"
                label="密码"
                name="userPassword"
                type="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
        />

        <van-field
                v-model="user.signature"
                rows="4"
                maxlength="200"
                label="个性签名"
                type="textarea"
                placeholder="请输入个性签名"
                :rules="[{ required: true, message: '请输入个性签名' }]"
        />

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <div style="margin: 16px;">
        <van-button round block type="primary" @click="router.push('/user')">
            返回
        </van-button>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import {onMounted, ref} from "vue";
import {getCurrentUserApi, updateUserByIdApi} from "../api/user.ts";
import {showToast} from "vant";

const router = useRouter()

const user = ref({})

const columns = ref([
    {text: '男生', value: 0},
    {text: '女生', value: 1},
])

const showPicker = ref(false)

const fieldValue = ref('男生');

onMounted(() => {
    getCurrentUser()
})

const onConfirm = ({selectedOptions}) => {
    fieldValue.value = selectedOptions[0].text
    user.value.gender = selectedOptions[0].value
    showPicker.value = false
}

const getCurrentUser = () => {
    getCurrentUserApi().then(res => {
        if (res.code === 0) {
            user.value = res.data
            if (user.value.gender === 0) {
                fieldValue.value = '男生'
            } else {
                fieldValue.value = '女生'
            }
        }
    })
}

const onSubmit = () => {
    updateUserByIdApi(user.value).then(res => {
        if (res.code === 0) {
            showToast('修改成功')
            router.push('/user')
        } else {
            showToast('修改失败')
        }
    })
}
</script>

<style scoped>

</style>