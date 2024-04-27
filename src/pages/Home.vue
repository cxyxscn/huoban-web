<template>
    <van-empty description="空列表" v-show="userList && userList.length === 0"/>
    <template v-for="(item, index) in userList" :key="index">
        <van-card class="user-info">
            <template #title>
                <div class="title">{{ item.nickname }}</div>
            </template>
            <template #desc>
                <van-text-ellipsis class="desc" :content="item.signature"/>
            </template>
            <template #thumb>
                <van-image :src="item.avatar"></van-image>
            </template>
            <template #tags>
                <template v-for="(tag, index) in item.tags" :key="index">
                    <van-tag
                            plain size="large"
                            type="primary"
                            :color="item.gender===0?'primary':'red'"
                    >
                        {{ tag }}
                    </van-tag>
                </template>
            </template>
            <template #footer>
                <van-button size="small" type="primary" plain @click="contact(item)">立即联系</van-button>
            </template>
        </van-card>
    </template>

    <van-popup
            v-model:show="showBox"
            position="center"
            :style="{ width: '90%',padding:'10px',borderRadius:'5px' }"
    >
        <van-cell title="邮箱" :value="contactData.email"/>
        <van-cell title="电话" :value="contactData.phone"/>
    </van-popup>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {onMounted, onUnmounted, ref} from "vue"
import {getUsersApi} from "../api/user.ts"

const route = useRoute()

const tags = route.query.tags

const userList = ref([])

const showBox = ref(false)

const contactData = ref({phone: '', email: ''})

const pageNum = ref(1)

const pageSize = ref(10)

const oldScrollTop = ref(0)

onMounted(() => {
    searchUser()
    window.addEventListener("scroll", scrolling);
})

onUnmounted(() => {
    window.removeEventListener("scroll", scrolling);
})

const scrolling = () => {
    // 滚动条距文档顶部的距离
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动条滚动的距离
    let scrollStep = scrollTop - oldScrollTop.value;
    // 更新——滚动前，滚动条距文档顶部的距离
    oldScrollTop.value = scrollTop;
    //变量windowHeight是可视区的高度
    let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight) {
        pageNum.value = pageNum.value + 1
        searchUser()
    }
}

const searchUser = () => {
    if (typeof tags === "string") {
        getUsersApi(pageNum.value, pageSize.value, tags).then(res => {
            userList.value = [...userList.value, ...res.data]
        })
    } else {
        getUsersApi(pageNum.value, pageSize.value, '').then(res => {
            userList.value = [...userList.value, ...res.data]
        })
    }
}

const contact = (item) => {
    showBox.value = true
    contactData.value.phone = item.phone
    contactData.value.email = item.email
}
</script>

<style lang="less" scoped>
.user-info {
  padding-bottom: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 0 10px 5px 0;
  }

  .desc {
    font-size: 16px;
  }

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>