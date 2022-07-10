import request from '../index';

interface userTypes {
    username: string;
    password: string
}

export const addUserData = (data: userTypes) => {
    return request({
        url: "/rest/admin_users",
        data,
        method: "POST"
    })
}

export const getUserData = () => {
    return request({
        url: "/rest/admin_users",
        method: "GET"
    })
}

// 获取编辑文章信息接口
export const getEditUserId = (id: string) => {
    return request({
        url: `/rest/admin_users/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑文章的接口
export const saveEditUser = (id: string, content: userTypes) => {
    return request({
        url: `/rest/admin_users/${id}`,
        data: content,
        method: "PUT"
    })
}


export const deleteUserData = (id: string) => {
    return request({
        url: `/rest/users/${id}`,
        method: "DELETE"
    })
}