import myAxios from "../utils/myAxios.ts"
import {LocationQueryValue, RouteParamValue} from "vue-router";

const path = "/api/team"

export const teamPageApi = (pageNum: number, pageSize: number, flag: number, keyword: string | LocationQueryValue[]): Promise<responseType> => {
    return myAxios.get(`${path}/page?pageNum=${pageNum}&pageSize=${pageSize}&flag=${flag}&keyword=${keyword}`)
}

export const teamJoinApi = (data: object): Promise<responseType> => {
    return myAxios.post(`${path}/join`, data)
}

export const getTeamApi = (id: string | RouteParamValue[]): Promise<responseType> => {
    return myAxios.get(`${path}/get/${id}`)
}

export const teamAddApi = (data: object): Promise<responseType> => {
    return myAxios.post(`${path}/add`, data)
}

export const teamUpdateApi = (data: object): Promise<responseType> => {
    return myAxios.post(`${path}/update`, data)
}

export const teamQuitApi = (id: string | RouteParamValue[]): Promise<responseType> => {
    return myAxios.get(`${path}/quit/${id}`)
}

export const teamDeleteApi = (id: number): Promise<responseType> => {
    return myAxios.get(`${path}/delete/${id}`)
}

