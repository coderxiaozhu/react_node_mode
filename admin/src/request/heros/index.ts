import request from '../index';

interface skillType {
    icon: string;
    name: string;
    descr: string;
    tips: string;
}

interface addDataType {
    name: string;
    avatar: string;
    title: string;
    category: string[];
    scores: {
        difficult: number;
        skill: number;
        attack: number;
        survive: number;
    };
    skills: skillType[];
    items1: string[];
    items2: string[];
    usageTips: string;
    battleTips: string;
    teamTips: string;
}

interface editDataType {
    _id: string
    name: string
    __v: number
}

// 新建物品接口
export const addHerosData = (data: addDataType) => {
    return request({
        url: "/rest/Heros",
        data,
        method: "POST"
    })
}

// 物品列表接口
export const getHerosData = () => {
    return request({
        url: "/rest/Heros",
        method: "GET"
    })
}

// 编辑物品接口
export const getEditHerosId = (id: string) => {
    return request({
        url: `/rest/Heros/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑物品的接口
export const saveEditHeros = (id: string, content: editDataType) => {
    return request({
        url: `/rest/Heros/${id}`,
        data: content,
        method: 'PUT'
    })
}

// 删除物品的接口
export const deleteHeros = (id: string, content: editDataType) => {
    return request({
        url: `/rest/Heros/${id}`,
        data: content,
        method: "DELETE"
    })
}