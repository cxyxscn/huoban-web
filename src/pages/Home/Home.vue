<template>
    <van-empty description="空列表" v-show="userList && userList.length === 0"/>
    <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="userPage"
    >
        <template v-for="(item, index) in userList" :key="index">
            <van-card class="user_info">
                <template #title>
                    <div class="title">{{ item.nickname }}</div>
                </template>
                <template #thumb>
                    <van-image :src="'/api' + item.avatar"></van-image>
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
    </van-list>

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
import {onMounted, ref} from "vue"
import {userPageApi} from "../../api/user.ts"

const route = useRoute()
const loading = ref(true)
const finished = ref(false);
const tags = route.query.tags || ''
const userList = ref([])
const showBox = ref(false)
const contactData = ref({phone: '', email: ''})
const pageNum = ref(1)
const pageSize = ref(20)
const total = ref(0)

onMounted(() => {
    userPage()
})

const userPage = () => {
    if (loading.value) {
        userPageApi(pageNum.value, pageSize.value, tags).then(res => {
            if (res.code === 200) {
                loading.value = false
                total.value = res.data.total
                userList.value = [...userList.value, ...res.data.records]
                pageNum.value = pageNum.value + 1
                if (userList.value.length >= total.value) {
                    finished.value = true
                }
            }
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
.user_info {
  padding-bottom: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 0 10px 5px 0;
  }

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>