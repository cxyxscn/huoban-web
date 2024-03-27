<template>
    <button @click="btn">按钮</button>
</template>

<script lang="ts" setup>

const btn = () => {
    showToast('你好')
}

</script>

<style lang="less" scoped>

</style>