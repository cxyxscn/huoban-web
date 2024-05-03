import myAxios from "../utils/myAxios.ts"

const path = "/api/team"

export const teamPageApi = (pageNum: number, pageSize: number, flag: number, keyword: string) => {
    return myAxios.get(`${path}/page?pageNum=${pageNum}&pageSize=${pageSize}&flag=${flag}&keyword=${keyword}`)
}

export const teamJoinApi = (data: object) => {
    return myAxios.post(`${path}/join`, data)
}

export const getTeamApi = (id: number) => {
    return myAxios.get(`${path}/get/${id}`)
}

export const teamAddApi = (data: object) => {
    return myAxios.post(`${path}/add`, data)
}

export const teamUpdateApi = (data: object) => {
    return myAxios.post(`${path}/update`, data)
}

export const teamQuitApi = (id: number) => {
    return myAxios.get(`${path}/quit/${id}`)
}

export const teamDeleteApi = (id: number) => {
    return myAxios.get(`${path}/delete/${id}`)
}

