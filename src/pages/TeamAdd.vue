<template>
  <div>添加队伍</div>

    <div style="margin: 16px;">
        <van-button type="primary" round block
                    style="margin-bottom: 10px"
        >
            修改资料
        </van-button>
        <van-button type="danger" round block @click="logout">退出登录</van-button>
    </div>

</template>

<script>
export default {
    name: "TeamAdd"
}
</script>

<style scoped>

</style>