<template>
    <van-form @submit="onSubmit">
        <van-field
                v-model="user.nickname"
                label="用户昵称"
                name="nickname"
                placeholder="请输入用户昵称"
                :rules="[{ required: true, message: '请输入用户昵称' }]"
        />

        <van-cell title="用户头像" is-link
                  :style="{display:'flex',alignItems:'center',height:'80px'}"
                  @click="updateAvatar">
            <template #value>
                <van-image
                        style="margin-top: 5px"
                        v-if="user.avatar"
                        width="70"
                        height="70"
                        :src="'/api/'+user.avatar"
                />
                <input type="file" ref="file" accept="image/*"
                       style="display: none;" @change.prevent="handleFileUpload">
            </template>
        </van-cell>

        <van-field
                v-model="fieldValue"
                is-link
                readonly
                label="用户性别"
                placeholder="请选择用户性别"
                @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>

        <van-cell title="用户标签" is-link @click="updateTags">
            <template v-for="(tag,index) in user.tags" :key="index">
                <van-tag type="primary" plain style="margin: 2px">
                    {{ tag }}
                </van-tag>
            </template>
        </van-cell>

        <van-popup v-model:show="show" :style="{padding:'10px'}">
            <van-field v-model="tag" placeholder="请输入标签" style="width: 80vw">
                <template #button>
                    <van-button type="primary" size="small" @click="addTag">
                        添加
                    </van-button>
                </template>
            </van-field>
            <div class="tag_list">
                <template v-for="(tag,index) in user.tags" :key="index">
                    <van-tag type="primary" plain style="margin: 2px" closeable @close="delTag(index)">
                        {{ tag }}
                    </van-tag>
                </template>
            </div>
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
                v-model="user.password"
                label="密码"
                name="password"
                type="password"
                placeholder="（选填）请输入密码"
        />

        <div class="btn_box">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
            <van-button round block type="primary" @click="router.back()">
                返回
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import {getCurrentInstance, onMounted, ref} from "vue";
import {showToast} from "vant";
import {getCurrentUserApi, uploadApi, userSettingApi} from "../../api/system.ts";

const router = useRouter()

const user = ref({})

const columns = ref([
    {text: '男生', value: 0},
    {text: '女生', value: 1},
])

const show = ref(false)

const showPicker = ref(false)

const fieldValue = ref('男生');

const currentInstance = getCurrentInstance()

onMounted(() => {
    getCurrentUser()
})

const tag = ref("")

const updateTags = () => {
    show.value = true
}

const updateAvatar = () => {
    // @ts-ignore
    currentInstance.ctx.$refs.file.click()
}

const handleFileUpload = () => {
    let formData = new FormData()
    // @ts-ignore
    let file = currentInstance.ctx.$refs.file.files[0]
    formData.append("file", file);
    uploadApi(formData).then(res => {
        user.value.avatar = res.data.path
    })
}

const addTag = () => {
    // 不重复则插入
    if (user.value.tags.includes(tag.value)) {
        showToast('标签已存在')
        return
    }
    // 判空
    if (tag.value === '') {
        showToast('标签不能为空')
        return
    }
    user.value.tags.push(tag.value)
    tag.value = ''
}

const delTag = (index) => {
    user.value.tags.splice(index, 1)
}

const onConfirm = ({selectedOptions}) => {
    fieldValue.value = selectedOptions[0].text
    user.value.gender = selectedOptions[0].value
    showPicker.value = false
}

const getCurrentUser = () => {
    getCurrentUserApi().then(res => {
        if (res.code === 200) {
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
    userSettingApi(user.value).then(res => {
        if (res.code === 200) {
            showToast('修改成功')
            router.push('/user')
        } else {
            showToast('修改失败')
        }
    })
}
</script>

<style lang="less" scoped>
.tag_list {
  padding: 10px 16px;
}

.btn_box {
  margin: 16px;

  button {
    margin-bottom: 10px;
  }
}
</style>