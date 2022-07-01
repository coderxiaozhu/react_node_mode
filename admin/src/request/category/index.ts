import request from '../index';

interface addDataType {
    name: string
}

export const addCategoryData = (data: addDataType) => {
    return request({
        url: "/admin/api/categorise",
        data,
        method: "POST"
    })
}