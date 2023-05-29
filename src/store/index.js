import { createStore } from "vuex";


// 引用模块文件
import app from "./modules/app";
// import info from "./modules/info";
// import permission from "./modules/permission";
// 创建Vuex

export default createStore({
    modules: { // 模块化
      app,       // 载入 app 模块
    }
  });