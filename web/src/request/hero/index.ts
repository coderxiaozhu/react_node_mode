import request from "../index";

export const getHeroDetail = (id: string) => {
    return request({
        url: `/heroes/${id}`,
        params: {
            id
        },
        method: "GET"
    })
}