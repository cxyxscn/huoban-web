<template>
    <van-card class="user-info">
        <template #title>
            <div class="title">{{ user.nickname ? user.nickname : '用户' + user.account }}</div>
        </template>
        <template #thumb>
            <van-image width="88" height="88" :src="user.avatar?'/api' + user.avatar : '/api/images/avatar.png'"/>
        </template>
        <template #tags>
            <template v-for="(tag,index) in user.tags" :key="index">
                <van-tag
                        plain size="large"
                        type="primary"
                        :color="user.gender===0?'primary':'red'"
                >
                    {{ tag }}
                </van-tag>
            </template>
            <van-tag
                    v-if="user.tags.length === 0"
                    plain size="large"
                    type="primary"
                    color="primary"
            >
                萌新
            </van-tag>
        </template>
        <template #footer>
            <van-button size="small" type="primary" plain @click="contact">立即联系</van-button>
        </template>
    </van-card>

    <van-popup
            v-model:show="showBox"
            position="center"
            :style="{ width: '90%',padding:'10px',borderRadius:'5px' }"
    >
        <van-cell title="邮箱" :value="user.email"/>
        <van-cell title="电话" :value="user.phone"/>
    </van-popup>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";

defineProps({
    user: {
        type: Object as PropType<userType>,
        required: true
    }
})

const showBox = ref(false)

const contact = () => {
    showBox.value = true
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

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>