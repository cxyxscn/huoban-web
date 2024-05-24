<template>
    <div class="app-container">
        <van-empty v-if="userList.length===0" image="error" description="请先填写标签"/>

        <div class="user-list">
            <template v-for="item in userList" :key="item.id">
                <van-card class="user-info">
                    <template #title>
                        <div class="title">{{ item.nickname || '用户' + item.account }}</div>
                    </template>
                    <template #thumb>
                        <van-image width="88" height="88" :src="item.avatar?'/api' + item.avatar : '/api/images/avatar.png'"></van-image>
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
        userList.value = res.data
    })
}

const contact = (item) => {
    showBox.value = true
    contactData.value.phone = item.phone
    contactData.value.email = item.email
}
</script>

<style lang="less" scoped>
.app-container {
  .user-list {
    margin-bottom: 10px;

    .user-info {
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
  }
}

</style>