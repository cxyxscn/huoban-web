<template>
    <van-form @submit="onSubmit">
        <van-field
                v-model="team.name"
                label="队伍名称"
                name="name"
                placeholder="请输入队伍名称"
                :rules="[{ required: true, message: '请输入队伍名称' }]"
        />

        <van-cell title="队伍封面" is-link
                  :style="{display:'flex',alignItems:'center',height:'80px'}"
                  @click="updateCover">
            <template #value>
                <van-image
                        style="margin-top: 5px"
                        v-if="team.coverUrl"
                        width="70"
                        height="70"
                        :src="'/api'+team.coverUrl"
                />
                <input type="file" ref="file" accept="image/*"
                       style="display: none;" @change.prevent="handleFileUpload">
            </template>
        </van-cell>

        <van-field
                v-model="team.description"
                label="队伍描述"
                type="textarea"
                name="description"
                maxlength="200"
                placeholder="请输入队伍描述"
                :rules="[{ required: true, message: '请输入队伍描述' }]"
        />
        <van-field
                v-model="team.maxNum"
                label="队伍人数"
                type="number"
                name="maxNum"
                placeholder="请输入队伍人数"
                :rules="[{ required: true, message: '请输入队伍人数' }]"
        />
        <van-field
                v-model="team.expireTime"
                label="过期时间"
                type="datetime-local"
                name="expireTime"
                placeholder="请输入队伍过期时间"
                :rules="[{ required: true, message: '请输入队伍过期时间' }]"
        />
        <van-field name="radio" label="队伍状态" :rules="[{ required: true, message: '请选择队伍状态' }]">
            <template #input>
                <van-radio-group v-model="team.status" direction="horizontal">
                    <van-radio :name.number="0">公开</van-radio>
                    <van-radio :name.number="1">加密</van-radio>
                </van-radio-group>
            </template>
        </van-field>

        <van-field
                v-if="team.status===1"
                v-model="team.password"
                label="队伍密码"
                type="password"
                name="password"
                placeholder="请输入队伍密码"
                :rules="[{ required: true, message: '请输入队伍密码' }]"
        />

        <div class="btn-box">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
            <van-button type="primary" round block @click="router.push('/team')">
                返回
            </van-button>
        </div>
    </van-form>


</template>

<script setup lang="ts">
import {ref} from "vue"
import {uploadApi} from "../../api/system.ts"
import {teamAddApi} from "../../api/team.ts"
import {useRouter} from "vue-router"

const router = useRouter()
const team = ref({
    name: '',
    description: '',
    maxNum: null,
    expireTime: '',
    status: 0,
    password: '',
    coverUrl: '',
})
const file = ref()

const updateCover = () => {
    file.value.click()
}

const handleFileUpload = () => {
    let formData = new FormData()
    formData.append("file", file.value.files[0]);
    uploadApi(formData).then(res => {
        team.value.coverUrl = res.data.path
    })
}

const onSubmit = () => {
    if (team.value.coverUrl === '') {
        showToast('队伍封面不能为空')
        return
    }
    teamAddApi(team.value).then(res => {
        router.push({
            path: '/team'
        })
    })
}
</script>

<style lang="less" scoped>
.btn-box {
  margin: 16px;

  button {
    margin-bottom: 10px;
  }
}
</style>