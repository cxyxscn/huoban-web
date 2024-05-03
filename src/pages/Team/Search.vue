<template>
    <van-search
            v-model="keyword"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @clear="onClear"
    />
</template>

<script setup lang="ts">
import {ref} from "vue"
import {useRouter} from "vue-router";

const router = useRouter()
const keyword = ref('')

const onSearch = () => {
    if (keyword.value === '') {
        router.push('/team')
    } else {
        router.push({
            path: '/team',
            query: {
                keyword: keyword.value
            }
        })
    }
}

const onClear = () => {
    keyword.value = ''
}

</script>

<style lang="less" scoped>

</style>