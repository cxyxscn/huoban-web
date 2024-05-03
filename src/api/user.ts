import myAxios from "../utils/myAxios.ts"
import {LocationQueryValue} from "vue-router";

const path = "/api/user"
export const userPageApi = (pageNum: number, pageSize: number, tags: string | LocationQueryValue[]): Promise<responseType> => {
    return myAxios.get(`${path}/page?pageNum=${pageNum}&pageSize=${pageSize}&tags=${tags}`)
}

export const recommendApi = (): Promise<responseType> => {
    return myAxios.get(`${path}/recommend`)
}