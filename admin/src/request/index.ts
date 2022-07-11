import { message } from "antd";
import axios from "axios";
import NProgress from 'nprogress';

export const baseUrl = "http://127.0.0.1:3001/admin/api";

const request = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

request.interceptors.request.use(
    config => {
        NProgress.start();
        const token = localStorage.getItem("token");
        if(token) {
            config.headers!.Authorization = "Bearer " + token
        }
        return config;
    },
    err => {
        NProgress.done();
        return err;
    }
)

request.interceptors.response.use(
    res => {
        NProgress.done();
        return res;
    },
    err => {
        if(err.response.data) {
            if(err.response.status === 422) {
                message.error(err.response.data.message)
            }
            if(err.response.status === 401) {
                message.error("请先登录");
            }
        }
        NProgress.done();
        return err;
    }
)

export default request;