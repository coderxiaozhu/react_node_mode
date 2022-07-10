import request from '../index';

interface itemsDataTypes {
    image: string;
    url: string;
}

interface itemTypes {
    name: string;
    items: itemsDataTypes[],
}

export const addItemData = (data: itemTypes) => {
    return request({
        url: "/rest/ads",
        data,
        method: "POST"
    })
}

export const getItemData = () => {
    return request({
        url: "/rest/ads",
        method: "GET"
    })
}

export const getEditItemId = (id: string) => {
    return request({
        url: `/rest/ads/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

export const saveEditItem = (id: string, content: itemTypes) => {
    return request({
        url: `/rest/ads/${id}`,
        data: content,
        method: "PUT"
    })
}


export const deleteItemData = (id: string) => {
    return request({
        url: `/rest/ads/${id}`,
        method: "DELETE"
    })
}