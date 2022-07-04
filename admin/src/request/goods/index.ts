import request from '../index';

interface addDataType {
    name: string,
    icon: string
}

interface editDataType {
    _id: string
    name: string
    icon: string
    __v: number
}

// 新建物品接口
export const addGoodsData = (data: addDataType) => {
    return request({
        url: "/rest/goods",
        data,
        method: "POST"
    })
}

// 物品列表接口
export const getGoodsData = () => {
    return request({
        url: "/rest/goods",
        method: "GET"
    })
}

// 编辑物品接口
export const getEditGoodsId = (id: string) => {
    return request({
        url: `/rest/goods/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑物品的接口
export const saveEditGoods = (id: string, content: editDataType) => {
    return request({
        url: `/rest/goods/${id}`,
        data: content,
        method: 'PUT'
    })
}

// 删除物品的接口
export const deleteGoods = (id: string, content: editDataType) => {
    return request({
        url: `/rest/goods/${id}`,
        data: content,
        method: "DELETE"
    })
}