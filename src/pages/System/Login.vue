<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    required
                    v-model="account"
                    name="account"
                    label="账号"
                    placeholder="请输入账号"
                    autocomplete="off"
                    :rules="[
                        { required: true, message: '账号必填' },
                        {pattern:/^[A-Za-z0-9]{6,10}$/,message:'账号长度6到10位 只允许字母、数字'}
                    ]"
            />
            <van-field
                    required
                    autocomplete="off"
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[
                        { required: true, message: '密码必填' },
                        { pattern:/^[A-Za-z0-9]{6,16}$/ ,message:'密码长度6到16位 只允许字母、数字' }
                    ]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                登录
            </van-button>
        </div>
    </van-form>
    <div style="margin: 16px;">
        <van-button round block type="primary" to="/register">
            注册
        </van-button>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {loginApi} from "../../api/system.ts";

const router = useRouter();
const account = ref('');
const password = ref('');

const onSubmit = () => {
    loginApi({
        account: account.value,
        password: password.value,
    }).then(res => {
        if (res.code === 200) {
            showToast('登录成功')
            router.push('/')
        } else {
            showToast(res.msg)
        }
    })
};
</script>

<style lang="less" scoped>

</style>