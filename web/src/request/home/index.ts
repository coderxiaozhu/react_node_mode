import request from "../index";

export const getNewsList = () => {
    return request({
        url: "/news/list",
        method: "GET"
    })
}

export const getHerosList = () => {
    return request({
        url: "/heroes/list",
        method: "GET"
    })
}

export const getBannerData = () => {
    return request({
        url: "/adlist",
        method: "GET"
    })
}