interface userType {
    id: number,
    username: string,
    password: string,
    nickname: string,
    avatar: string,
    gender: number,
    email: string,
    phone: string,
    role: string,
    status: number,
    tags: string[],
    createTime: string,
    updateTime: string
}

interface teamType {
    id: number,
    name: string,
    description: string,
    coverUrl: string,
    status: number,
    maxNum: number,
    createUser: userType,
    users: userType[],
    expireTime: string,
    createTime: string,
    updateTime: string,
}

interface responseType {
    code: number,
    data: any,
    msg: string
}