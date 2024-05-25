<template>
    <div class="app-container">
        <van-tabs v-model:active="active" @change="onChange">
            <van-tab title="所有队伍" :name="0"></van-tab>
            <van-tab title="我加入的" :name="1"></van-tab>
            <van-tab title="我创建的" :name="2"></van-tab>
        </van-tabs>
        <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getTeamPage"
        >
            <TeamCard v-for="item in teamList" :key="item.id" :team="item">
                <template v-if="active===0">
                    <van-button type="primary" size="small" plain @click="joinTeamPre(item.id, item.status)">
                        加入队伍
                    </van-button>
                </template>

                <template v-if="active===1">
                    <van-button type="primary" size="small" plain
                                @click="$router.push(`/team/detail/${item.id}`)">
                        查看详细
                    </van-button>
                </template>

                <template v-if="active===2">
                    <van-button type="primary" size="small" plain
                                @click="$router.push(`/team/detail/${item.id}`)">
                        查看详细
                    </van-button>
                    <van-button type="primary" size="small" plain
                                @click="$router.push(`/team/edite/${item.id}`)">
                        编辑队伍
                    </van-button>
                </template>
            </TeamCard>
        </van-list>

        <van-dialog v-model:show="show" title="提示" show-cancel-button @confirm="joinTeam">
            <van-field
                    v-model="joinTeamData.password"
                    type="password"
                    label="队伍密码"
                    placeholder="请输入队伍密码"
                    style="margin-bottom: 10px"
                    autocomplete="off"
            />
        </van-dialog>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {teamJoinApi, teamPageApi} from "../../api/team.ts";
import {useRoute, useRouter} from "vue-router";
import TeamCard from "../../components/TeamCard.vue";

const route = useRoute()
const router = useRouter()
const active = ref(0)
const pageNum = ref(1)
const pageSize = ref(20)
const teamList = ref([])
const loading = ref(false)
const finished = ref(false)
const total = ref(0)
const keyword = route.query.keyword || ''
const show = ref(false)
const joinTeamData = ref({})

const joinTeamPre = (id, status) => {
    joinTeamData.value = {
        teamId: id
    }
    if (status === 0) {
        joinTeam()
    }
    if (status === 1) {
        show.value = true
    }
}

const joinTeam = () => {
    teamJoinApi(joinTeamData.value).then((res) => {
        if (res.code === 200) {
            showToast('加入成功')
        } else {
            showToast(res.msg)
        }
    })
}

const onChange = () => {
    teamList.value = []
    finished.value = false
    pageNum.value = 1
}

const getTeamPage = () => {
    teamPageApi(pageNum.value, pageSize.value, active.value, keyword).then(res => {
        if (res.code === 200) {
            loading.value = false
            total.value = res.data.total
            teamList.value = [...teamList.value, ...res.data.records]
            pageNum.value = pageNum.value + 1
            if (teamList.value.length >= total.value) {
                finished.value = true
            }
        } else {
            showToast(res.msg)
        }
    })
}

</script>

<style lang="less" scoped>

</style>