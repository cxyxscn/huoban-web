<template>
    <van-tabs v-model:active="active" @change="onChange">
        <van-tab title="所有队伍" :name="0">
            <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getTeamPage"
            >
                <template v-for="(item, index) in teamList" :key="index">
                    <van-card class="team_info">
                        <template #title>
                            <div class="title">{{ item.name }}</div>
                        </template>
                        <template #desc>
                            <van-text-ellipsis class="desc" :content="item.description"/>
                        </template>
                        <template #thumb>
                            <van-image :src="'/api' + item.coverUrl"></van-image>
                        </template>
                        <template #footer>
                            <van-button type="primary" size="small" plain @click="joinTeam(item.id)">
                                加入队伍
                            </van-button>
                        </template>
                    </van-card>
                </template>
            </van-list>
        </van-tab>
        <van-tab title="我加入的" :name="1">
            <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getTeamPage"
            >
                <template v-for="(item, index) in teamList" :key="index">
                    <van-card class="team_info">
                        <template #title>
                            <div class="title">{{ item.name }}</div>
                        </template>
                        <template #desc>
                            <van-text-ellipsis class="desc" :content="item.description"/>
                        </template>
                        <template #thumb>
                            <van-image :src="'/api' + item.coverUrl"></van-image>
                        </template>
                        <template #footer>
                            <van-button type="primary" size="small" plain
                                        @click="$router.push(`/team/detail/${item.id}`)">
                                查看详细
                            </van-button>
                        </template>
                    </van-card>
                </template>
            </van-list>
        </van-tab>
        <van-tab title="我创建的" :name="2">
            <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getTeamPage"
            >
                <template v-for="(item, index) in teamList" :key="index">
                    <van-card class="team_info">
                        <template #title>
                            <div class="title">{{ item.name }}</div>
                        </template>
                        <template #desc>
                            <van-text-ellipsis class="desc" :content="item.description"/>
                        </template>
                        <template #thumb>
                            <van-image :src="'/api' + item.coverUrl"></van-image>
                        </template>
                        <template #footer>
                            <van-button type="primary" size="small" plain
                                        @click="$router.push(`/team/detail/${item.id}`)">
                                查看详细
                            </van-button>
                            <van-button type="primary" size="small" plain
                                        @click="$router.push(`/team/edite/${item.id}`)">
                                编辑队伍
                            </van-button>
                        </template>
                    </van-card>
                </template>
            </van-list>
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {teamJoinApi, teamPageApi} from "../../api/team.ts";
import {useRoute} from "vue-router";

const route = useRoute()
const active = ref(0)
const pageNum = ref(1)
const pageSize = ref(20)
const teamList = ref([])
const loading = ref(false)
const finished = ref(false)
const total = ref(0)
const keyword = route.query.keyword || ''

onMounted(() => {
    getTeamPage()
})

const joinTeam = (id) => {
    teamJoinApi({teamId: id}).then(res => {
        if (res.code === 200) {
            showToast('加入成功')
        } else {
            showToast(res.msg)
        }
    })
}

const onChange = () => {
    console.log(active.value)
    teamList.value = []
    finished.value = false
    pageNum.value = 1
    getTeamPage()
}

const getTeamPage = () => {
    if (loading.value) {
        teamPageApi(pageNum.value, pageSize.value, active.value, keyword).then(res => {
            if (res.code === 200) {
                loading.value = false
                total.value = res.data.total
                teamList.value = [...teamList.value, ...res.data.records]
                pageNum.value = pageNum.value + 1
                if (teamList.value.length >= total.value) {
                    finished.value = true
                }
            }
        })
    }
}

</script>

<style lang="less" scoped>
.team_info {
  padding-bottom: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 0 10px 5px 0;
  }

  .desc {
    font-size: 16px;
  }

  .van-tag {
    margin: 5px 10px 5px 0;
  }
}
</style>