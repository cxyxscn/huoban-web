<template>
    <div class="app-container" v-if="team">
        <van-cell-group>
            <van-cell title="队伍名称" :value="team.name"/>
            <van-cell title="队伍描述" :label="team.description"/>
            <van-cell title="队伍类型" :value="team.status===0?'公开':'私密'"/>
            <van-cell title="创建用户">
                <van-tag type="primary" plain>
                    {{ team.createUser.nickname }}
                </van-tag>
            </van-cell>
            <van-cell title="队伍人数">
                <template #value>
                    {{ team.users.length + 1 }}/{{ team.maxNum }}
                </template>
            </van-cell>
            <van-cell title="队伍成员">
                <template #label>
                    <van-tag v-for="(user,index) in team.users"
                             :key="index" type="primary" plain>
                        {{ user.nickname }}
                    </van-tag>
                </template>
            </van-cell>
            <van-cell title="过期时间" :value="team.expireTime"/>
            <van-cell title="创建时间" :value="team.createTime"/>
            <van-cell title="更新时间" :value="team.updateTime"/>
        </van-cell-group>
        <div class="btn_box">
            <van-button round block type="primary" @click="quitTeam">
                退出队伍
            </van-button>
            <van-button round block type="primary" @click="router.push('/team')">
                返回
            </van-button>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router"
import {getTeamApi, teamQuitApi} from "../../api/team.ts"

const route = useRoute()
const teamId = route.params.id
const team = ref()
const router = useRouter()
onMounted(() => {
    getTeam()
})

const getTeam = () => {
    getTeamApi(teamId).then(res => {
        team.value = res.data
    })
}
const quitTeam = () => {
    teamQuitApi(teamId).then(res => {
        if (res.code === 200) {
            showToast('退出成功')
            router.push('/team')
        }else {
            showToast(res.msg)
        }
    })
}
</script>

<style lang="less" scoped>
.btn_box {
  margin: 16px;

  button {
    margin-bottom: 10px;
  }
}
</style>
