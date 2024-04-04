import axios from "axios";
import { getToken, getUsername, removeToken, removeUsername } from "@/utils/cookies";

import { ElMessage } from 'element-plus'
// vue-router
import router from "@/router";

const instance = axios.create({
    baseURL: 'http://v3.web-jshtml.cn/api',    // 请求地址
    timeout: 5000,  // 超时
});
// 拦截器
// 添加请求拦截器，我们想服务器传递的数据。首先判断是否存在tokne和用户名。这是基本的判断
// 避免，假数据传进来，影响服务器的传输效率
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(getToken()) {
        config.headers['Token'] = getToken();        // 携带token
    }
    if(getUsername()) {
        config.headers['Username'] = getUsername();  // 携带用户名
    }
    return config;

}, function (error) {
    // 对请求错误做些什么/
    // 加上响应失败，返回错误信息。
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 响应数据，就是服务器所返回的数据。
    const data = response.data;
    if(data.resCode === 0) {
        return Promise.resolve(data);
    }else{
        ElMessage({
            message: data.message,
            type: "error"
        })
        return Promise.reject(data);
    }
}, function (error) {
    const errorData = JSON.parse(error.request.response);
    if(errorData.message) {
        ElMessage({
            message: errorData.message,
            type: "error"
        })
    }
    // token失效自动退出
    if(errorData.resCode === 1010) {
        router.replace({
            name: "Login"
        })
        removeToken();
        removeUsername();
    }
    // 对响应错误做点什么
    return Promise.reject(errorData);
});



// 暴露instance
export default instance;