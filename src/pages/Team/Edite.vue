<template>
    <div class="app-container">
        <van-form @submit="onSubmit">
            <van-field
                    v-model="team.name"
                    name="name"
                    label="队伍名称"
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
                           hidden @change.prevent="handleFileUpload">
                </template>
            </van-cell>

            <van-field
                    v-model="team.description"
                    name="description"
                    label="队伍描述"
                    type="textarea"
                    maxlength="200"
                    placeholder="请输入队伍描述"
                    :rules="[{ required: true, message: '请输入队伍描述' }]"
            />

            <van-field
                    v-model="team.maxNum"
                    name="maxNum"
                    label="队伍人数"
                    type="number"
                    placeholder="请输入队伍人数"
                    :rules="[{ required: true, message: '请输入队伍人数' }]"
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

            <van-field
                    v-model="team.expireTime"
                    name="expireTime"
                    label="过期时间"
                    type="datetime-local"
                    placeholder="请选择过期时间"
                    :rules="[{ required: true, message: '请选择过期时间' }]"
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
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {getTeamApi, teamUpdateApi} from "../../api/team.ts";
import {uploadApi} from "../../api/system.ts";

const route = useRoute()
const router = useRouter()
const teamId = route.params.id
const team = ref({})
const file = ref()

onMounted(() => {
    getTeam()
})

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

const getTeam = () => {
    getTeamApi(teamId).then(res => {
        if (res.code === 200) {
            team.value = res.data
            team.value.expireTime = new Date(team.value.expireTime).toISOString().slice(0, 16)
        } else {
            showToast(res.msg)
        }
    })
}
const onSubmit = () => {
    teamUpdateApi(team.value).then(res => {
        if (res.code === 200) {
            showToast('修改成功')
            router.push('/team')
        } else {
            showToast(res.msg)
        }
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