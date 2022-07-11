import request from '../index';

interface addDataType {
    name: string,
    parents: string
}

interface editDataType {
    _id: string
    name: string
    parents: string
    __v: number
}

// 新建分类接口
export const addCategoryData = (data: addDataType) => {
    return request({
        url: "/rest/categories",
        data,
        method: "POST"
    })
}

// 分类列表接口
export const getCategoryData = () => {
    return request({
        url: "/rest/categories",
        method: "GET"
    })
}

// 编辑分类接口
export const getEditCategoryId = (id: string) => {
    return request({
        url: `/rest/categories/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑分类的接口
export const saveEditCategory = (id: string, content: editDataType) => {
    return request({
        url: `/rest/categories/${id}`,
        data: content,
        method: 'PUT'
    })
}

// 删除分类的接口
export const deleteCategory = (id: string) => {
    return request({
        url: `/rest/categories/${id}`,
        method: "DELETE"
    })
}