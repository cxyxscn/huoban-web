<template>
    <div class="app-container">
        <template v-for="(item,index) in userList" :key="index">
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
    </div>
</template>

<script setup lang="ts">
import {recommendApi} from "../../api/user.ts"
import {onMounted, ref} from "vue"

const userList = ref<userType[]>([])
const showBox = ref(false)
const contactData = ref({phone: '', email: ''})

onMounted(() => {
    getRecommendUsers()
})



const getRecommendUsers = () => {
    recommendApi().then(res => {
        if (res.code === 200) {
            userList.value = res.data
        }
    })
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