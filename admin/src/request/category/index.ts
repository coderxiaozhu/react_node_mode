import request from '../index';

interface addDataType {
    name: string
}

interface editDataType {
    _id: string
    userId: string
    name: string
    __v: number
}

// 新建分类接口
export const addCategoryData = (data: addDataType) => {
    return request({
        url: "/admin/api/categorise",
        data,
        method: "POST"
    })
}

// 分类列表接口
export const getCategoryData = () => {
    return request({
        url: "/admin/api/categorise",
        method: "GET"
    })
}

// 编辑分类接口
export const getEditCategoryId = (id: string) => {
    return request({
        url: `/admin/api/categorise/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑分类的接口
export const saveEditCategory = (id: string, content: editDataType) => {
    return request({
        url: `/admin/api/categorise/${id}`,
        data: content,
        method: 'PUT'
    })
}