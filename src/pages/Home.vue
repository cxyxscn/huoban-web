<template>
    <van-empty description="空列表" v-show="userList && userList.length === 0"/>

    <div class="user-info" v-for="(item, index) in userList" :key="index">
        <van-card>
            <template #title>
                <div class="title">{{ item.username }}</div>
            </template>
            <template #desc>
                <van-text-ellipsis class="desc" :content="item.signature"/>
            </template>
            <template #thumb>
                <van-image :src="item.avatarUrl"></van-image>
            </template>
            <template #tags>
                <van-tag
                        v-for="(tag, index) in item.tags.split(',')"
                        :key="index"
                        plain size="large"
                        type="primary"
                        :color="item.gender===0?'primary':'red'"
                >
                    {{ tag }}
                </van-tag>
            </template>
            <template #footer>
                <van-button size="small" type="primary" plain @click="contact(item)">立即联系</van-button>
            </template>
        </van-card>
    </div>

    <van-popup
            v-model:show="showBox"
            position="center"
            :style="{ width: '80%',padding:'20px',borderRadius:'5px' }"
    >
        <van-cell title="邮箱" :value="contactData.email"/>
        <van-cell title="电话" :value="contactData.phone"/>
    </van-popup>

</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getUsersApi} from "../api/user.ts";

const route = useRoute()

const tags = route.query.tags

const userList = ref([]);

const showBox = ref(false)

const contactData = ref({phone: '', email: ''})

onMounted(() => {
    searchUser()
})

const searchUser = () => {
    if (typeof tags === "string") {
        getUsersApi(tags).then(res => {
            userList.value = res.data
        })
    } else {
        getUsersApi('').then(res => {
            userList.value = res.data
        })
    }
}

const contact = (item) => {
    showBox.value = true
    contactData.value.phone=item.phone
    contactData.value.email=item.email
}
</script>

<style lang="less" scoped>
.user-info {
  padding-bottom: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 0px 10px 5px 0;
  }

  .desc {
    font-size: 16px;
  }

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>