import axios from "axios";
import NProgress from 'nprogress';

const baseUrl = "http://127.0.0.1:3001";

const request = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

request.interceptors.request.use(
    config => {
        NProgress.start();
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
        NProgress.done();
        return err;
    }
)

export default request;