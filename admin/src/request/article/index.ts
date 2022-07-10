import request from '../index';

interface articleTypes {
    name: string;
    categories: string[],
    body: string
}

export const addArticleData = (data: articleTypes) => {
    return request({
        url: "/rest/articles",
        data,
        method: "POST"
    })
}

export const getArticleData = () => {
    return request({
        url: "/rest/articles",
        method: "GET"
    })
}

// 获取编辑文章信息接口
export const getEditArticleId = (id: string) => {
    return request({
        url: `/rest/articles/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}

// 保存编辑文章的接口
export const saveEditArticle = (id: string, content: articleTypes) => {
    return request({
        url: `/rest/articles/${id}`,
        data: content,
        method: "PUT"
    })
}


export const deleteArticleData = (id: string) => {
    return request({
        url: `/rest/articles/${id}`,
        method: "DELETE"
    })
}