import router from "./index";
import store from "../store";
// cookie
import { getToken } from '../../src/utils/cookies'
// 全局前置守卫
router.beforeEach((to, from, next) => {
    if(!getToken()) {
        if(to.name !== "Login") {
            next("Login");
        }else{
            next();
        }
    }else{
        if(store.state.permission.async_router.length === 0){
            store.dispatch("permission/getRouterAction").then(response => {
                // 获取动态路由
                const async_router_data = store.getters["permission/async_router"];
                // 获取静态路由
                const default_router_data = router.options.routes;
                // 更新静态路由
                router.options.routes = default_router_data.concat(async_router_data);
                // 更新动态路由
                async_router_data.forEach(item => {
                    router.addRoute(item);
                });
                if(to.name === "Admin") {
                    const first_router = async_router_data[0]?.children[0] || async_router_data[0];
                    next({ ...first_router, replace: true});
                }else{
                    // 确认进入下一个路由
                    next({ ...to, replace: true});
                }
            })
        }else{
            next();
        }
    }
})



// 全局后置守卫
router.afterEach((to, from) => {
})

