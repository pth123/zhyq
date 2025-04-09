import axios,{AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {message} from "antd";
import { store } from "../../store";

const http:AxiosInstance = axios.create({
    baseURL:"https://www.demo.com",
    timeout:5000 //请求超时时间
})

//请求拦截器：开头是http
http.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    //发起请求前执行一些处理任务
    const {token}=store.getState().authSlice
    if(token){
        //Authorization专门用来携带认证信息
        //Bearer表示的是一种认证类型，表示后面携带的是一个令牌
        config.headers['Authorization']=`Bearer ${token}`
    }
    return config
    });

//响应拦截器：请求的结果返回到前端之前
http.interceptors.response.use((response:AxiosResponse)=>{
    const res = response.data
    if(res.code!==200){
        message.error(res.code+":"+res.message)
        return Promise.reject(new Error(res.message))
    }

    return response.data; // 返回响应数据
    });

export default http