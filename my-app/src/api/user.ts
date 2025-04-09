import { data } from "react-router-dom";
import { post,get } from "../utils/http/request";

interface loginData{
    username:string,
    password:string
}

export function login(data:loginData){
    return post("/login",data)
}

export function getMenu(){
    return get("/menu")
}