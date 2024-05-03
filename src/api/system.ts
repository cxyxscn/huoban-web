import myAxios from "../utils/myAxios.ts"

const path = "/api/sys"

export const loginApi = (data: object) : Promise<responseType> => {
    return myAxios.post(`${path}/login`, data)
}

export const logoutApi = () : Promise<responseType>=> {
    return myAxios.get(`${path}/logout`)
}

export const getCurrentUserApi = (): Promise<responseType> => {
    return myAxios.get(`${path}/current`)
}

export const userSettingApi = (data: object): Promise<responseType> => {
    return myAxios.post(`${path}/setting`, data)
}

export const registerApi = (data: object): Promise<responseType> => {
    return myAxios.post(`${path}/reg`, data)
}

// 文件上传
export function uploadApi(data: any): Promise<responseType> {
    return myAxios.post(
        `/api/file/upload`,
        data,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        })
}