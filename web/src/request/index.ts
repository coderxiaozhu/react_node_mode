import axios from "axios";

const request = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:3001/web/api/"
})

request.interceptors.request.use(config => {
    return config;
}, err => {
    return err;
})

request.interceptors.response.use(response => {
    return response;
}, err => {
    return err;
})

export default request