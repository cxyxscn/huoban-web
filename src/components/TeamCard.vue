<template>
    <van-card class="team-info">
        <template #title>
            <van-text-ellipsis class="title" :content="team.name"/>
        </template>
        <template #desc>
            <van-text-ellipsis class="desc" :content="team.description" :rows="2"/>
        </template>
        <template #thumb>
            <van-image width="88" height="88" :src="'/api' + team.coverUrl"></van-image>
        </template>
        <template #footer>
            <slot></slot>
        </template>
    </van-card>
</template>

<script setup lang="ts">

defineProps({
    team: {
        type: Object,
    }
})

</script>

<style lang="less" scoped>
.team-info {
  padding-bottom: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .desc {
    padding: 5px 0;
    font-size: 16px;
  }

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>