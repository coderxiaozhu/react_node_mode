import request from "../index";

export const getNewsList = () => {
    return request({
        url: "/news/list",
        method: "GET"
    })
}