<template>
    <van-divider content-position="left">已选标签</van-divider>
    <div class="tags-box">
        <div class="selected-box">
            <van-tag
                    closeable
                    type="primary"
                    size="large"
                    v-for="(item,index) in selectTags"
                    :key="index"
                    @close="deleteTag(item)"
            >
                {{ item }}
            </van-tag>
        </div>
    </div>

    <van-divider content-position="left">可选标签</van-divider>
    <div class="tags-box">
        <div class="select-box">
            <van-tag
                    plain type="primary"
                    size="large"
                    v-for="(item,index) in tagsList"
                    :key="index"
                    @click="selectTag(item)"
            >
                {{ item }}
            </van-tag>
        </div>
    </div>

    <div style="margin: 16px;">
        <van-button round block type="primary" @click="submit">
            提交
        </van-button>
    </div>

    <div style="margin: 16px;">
        <van-button round block type="primary" @click="router.push('/user')">
            返回
        </van-button>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router"
import {onMounted, ref} from "vue";
import {getCurrentUserApi, getTagsApi, updateUserTagsByUidApi} from "../api/user.ts";

const router = useRouter()

const selectTags = ref([])
const tagsList = ref([])

onMounted(() => {
    getTags()
    getUserTags()
})

const getTags = () => {
    getTagsApi('').then(res => {
        tagsList.value = res.data
    })
}

const getUserTags = () => {
    getCurrentUserApi().then(res => {
        selectTags.value = res.data.tags
    })
}

const selectTag = (item) => {
    selectTags.value.push(item)
}

const deleteTag = (item) => {
    selectTags.value = selectTags.value.filter(it => it !== item)
}

const submit = () => {
    const data = {
        tags: Array.from(selectTags.value).join(',').trim().toString()
    }
    updateUserTagsByUidApi(data).then(res => {
        if (res.code === 0) {
            showToast('修改成功')
            router.push('/user')
        } else {
            showToast('修改失败')
        }
    })
}

</script>

<style lang="less" scoped>
.tags-box {
  padding: 0 10px;

  .van-tag {
    margin: 5px;
  }
}

</style>