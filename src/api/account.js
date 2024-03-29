import instance from "@/utils/request";  // 引入拦截器
/** 注册 */
export function Register(data = {}){
    return instance.request({
        method: "post",
        url: "/register/",
        data
    })
}

/** 登录 */
export function Login(data = {}){
    return instance.request({
        method: "post",
        url: "/login/",
        data
    })
}

/** 登出 */
export function Logout(data = {}){
    return instance.request({
        method: "post",
        url: "/logout/",
        data
    })
}

/** 路由权限 */
export function GetPermission(data = {}){
    return instance.request({
        method: "post",
        url: "/permission",
        data
    })
}
    