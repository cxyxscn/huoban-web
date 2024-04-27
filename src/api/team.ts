import myAxios from "../utils/myAxios.ts"
import {Ref, UnwrapRef} from "vue";

const path = "/team"

export const getTeamListApi = (name: Ref<UnwrapRef<string>>) => {
    return myAxios.get(`${path}/search/users?name=${name}`)
}

