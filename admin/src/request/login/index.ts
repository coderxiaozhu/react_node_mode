import request from "..";

interface loginType {
    username: string;
    password: string; 
}

export const putLoginData = (data: loginType) => {
    return request({
        url: "/login",
        data,
        method: "POST"
    })
}