import myAxios from "../utils/myAxios.ts"

const path = "/api/tag"

export const searchTagsApi = (name: string) => {
    return myAxios.get(`${path}/search?name=${name}`)
}

