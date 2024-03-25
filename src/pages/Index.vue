<template>
    <van-nav-bar
            title="伙伴匹配"
            left-arrow
            @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search"/>
        </template>
    </van-nav-bar>

    <div class="search-box" v-show="isShowSearch">
        <van-search
                v-model="keyword"
                show-action
                placeholder="请输入搜索的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
        <van-divider content-position="left">已选标签</van-divider>
        <div class="selected-box">
            <van-tag closeable type="primary">标签</van-tag>
        </div>
        <van-divider content-position="left">选择标签</van-divider>
        <div class="select-box">
            <van-tag plain type="primary">标签</van-tag>
        </div>
    </div>

    <van-empty description="空列表" v-show="userList.length === 0"/>

</template>

<script setup lang="ts">
import {ref} from "vue";

const onClickRight = () => {
    isShowSearch.value = true
}

const onCancel = () => {
    isShowSearch.value = false
}

const onSearch = () => {

}


const keyword = ref('')
const isShowSearch = ref(false)
const userList = ref([])
const selectTags = ref([])
const selectedTags = ref([])
</script>

<style scoped>
.selected-box, .select-box {
    padding: 0 10px;
}
</style>