import myAxios from "../utils/myAxios.ts";

const path = "/user"
export const getUsersApi = (tags: string) => {
    return myAxios.get(`${path}/search/users?tags=${tags}`)
}

export const getTagsApi = (keyword: string) => {
    return myAxios.get(`${path}/search/tags?keyword=${keyword}`)
}

export const getCurrentUserApi = () => {
    return myAxios.get(`${path}/current`)
}

export const updateUserByIdApi = (data: object) => {
    return myAxios.post(`${path}/upp/uid`,data)
}

export const updateUserTagsByUidApi = (data: object) => {
    return myAxios.post(`${path}/upp/tags/uid`,data)
}

export const loginApi = (data: object) => {
    return myAxios.post(`${path}/login`, data)
}

export const logoutApi = () => {
    return myAxios.get(`${path}/logout`)
}


export const registerApi = (data: object) => {
    return myAxios.post(`${path}/reg`, data)
}