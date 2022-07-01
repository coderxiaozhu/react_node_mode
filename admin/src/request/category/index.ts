import request from '../index';

interface addDataType {
    name: string
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