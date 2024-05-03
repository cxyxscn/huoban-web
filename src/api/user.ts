import myAxios from "../utils/myAxios.ts"

const path = "/api/user"
export const userPageApi = (pageNum: number, pageSize: number, tags: string) => {
    return myAxios.get(`${path}/page?pageNum=${pageNum}&pageSize=${pageSize}&tags=${tags}`)
}

export const recommendApi = () => {
    return myAxios.get(`${path}/recommend`)
}