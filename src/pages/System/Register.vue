<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="account"
                    name="account"
                    label="账号"
                    placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                    v-model="rePassword"
                    type="password"
                    name="rePassword"
                    label="确认密码"
                    placeholder="请确认密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                注册
            </van-button>
        </div>
    </van-form>
    <div style="margin: 16px;">
        <van-button round block type="primary" to="/login">
            登录
        </van-button>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {registerApi} from "../../api/system.ts";
import {showToast} from "vant";

const router = useRouter();

const account = ref('');
const password = ref('');
const rePassword = ref('');

const onSubmit = () => {
    const data = {
        account: account.value,
        password: password.value,
        rePassword: rePassword.value
    }
    registerApi(data).then(res => {
        if (res.code === 200) {
            showToast('注册成功')
            router.push('/login')
        } else {
            showToast(res.msg)
        }
    })
};
</script>

<style lang="less" scoped>

</style>