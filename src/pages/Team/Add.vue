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
                        :src="'/api/'+team.coverUrl"
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

        <div class="btn_box">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
            <van-button type="primary" round block @click="router.push('/team')">
                返回
            </van-button>
        </div>
    </van-form>


</template>

<script setup>
import {getCurrentInstance, ref} from "vue"
import {uploadApi} from "../../api/system.ts"
import {teamAddApi} from "../../api/team.ts"
import {useRouter} from "vue-router"

const router = useRouter()
const currentInstance = getCurrentInstance()
const team = ref({})
const updateCover = () => {
    currentInstance.ctx.$refs.file.click()
}

const handleFileUpload = () => {
    let formData = new FormData()
    let file = currentInstance.ctx.$refs.file.files[0]
    formData.append("file", file);
    uploadApi(formData).then(res => {
        team.value.coverUrl = res.data.path
    })
}

const onSubmit = () => {
    team.value.expireTime = team.value.expireTime.replace('T', ' ') + ':00'
    teamAddApi(team.value).then(res => {
        if (res.code === 200) {
            router.push({
                path: '/team/list'
            })
        }
    })
}
</script>

<style lang="less" scoped>
.btn_box {
  margin: 16px;

  button {
    margin-bottom: 10px;
  }
}
</style>