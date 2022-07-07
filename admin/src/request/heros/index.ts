import request from '../index';

interface skillType {
    icon: string;
    name: string;
    descr: string;
    tips: string;
}

export interface heroDataType {
    name: string;
    avatar: string;
    title: string;
    categories: string[];
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

// 新建英雄接口
export const addHerosData = (data: heroDataType) => {
    return request({
        url: "/rest/Heros",
        data,
        method: "POST"
    })
}

// 英雄列表接口
export const getHerosData = () => {
    return request({
        url: "/rest/Heros",
        method: "GET"
    })
}

// 获取编辑英雄信息接口
export const getEditHerosId = (id: string) => {
    return request({
        url: `/rest/Heros/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑英雄信息的接口
export const saveEditHeros = (id: string, content: heroDataType) => {
    return request({
        url: `/rest/Heros/${id}`,
        data: content,
        method: 'PUT'
    })
}

// 删除英雄信息的接口
export const deleteHeros = (id: string, content: editDataType) => {
    return request({
        url: `/rest/Heros/${id}`,
        data: content,
        method: "DELETE"
    })
}