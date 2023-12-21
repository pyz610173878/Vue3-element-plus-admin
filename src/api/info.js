import instance from "@/utils/request";  // 引入拦截器
/** 一级分类添加 */
export function firstCategoryAdd(data = {}){
    return instance.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

/** 获取分类 */
export function GetCategory(data = {}){
    return instance.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    })
}

/** 子级分类添加 */
export function ChildCategoryAdd(data = {}){
    return instance.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}

/** 分类编辑 */
export function CategoryEdit(data = {}){
    return instance.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}

/** 分类删除 */
export function CategoryDel(data = {}){
    return instance.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}


/** 添加信息 */
export function InfoCreate(data = {}){
    return instance.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

/** 获取列表 */
export function GetTableList(data = {}){
    return instance.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

/** 发布状态 */
export function Status(data = {}){
    return instance.request({
        method: "post",
        url: "/news/status/",
        data
    })
}

/** 删除 */
export function Delete(data = {}){
    return instance.request({
        method: "post",
        url: "/news/delete/",
        data
    })
}

/** 获取详情 */
export function GetDetailed(data = {}){
    return instance.request({
        method: "get",
        url: "/news/detailed/",
        params: data
    })
}


/** 信息修改 */
export function InfoEdit(data = {}){
    return instance.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}

