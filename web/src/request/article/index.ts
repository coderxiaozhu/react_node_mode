import request from "../index"

export const getArticle = (id: string) => {
    return request({
        url: `/articles/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}