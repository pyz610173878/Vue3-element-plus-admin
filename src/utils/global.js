// Element Plus
import { ElMessageBox } from 'element-plus';
// 命名空间
const globalFunction = {}
/**
 * @param { message } String 内容，可选 
 * @param { title } String 标题，可选 
 * @param { thenFun } Function 回调函数，可选 
 * @description 确认弹窗
 */
globalFunction.deleteConfirm = (params) => {
    ElMessageBox.confirm(params.message || '确认删除当前数据吗？删除后将无法恢复', params.title || '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,            // 取消右上角关闭按钮
        closeOnClickModal: false,    // 取消点击遮罩关闭 MessageBox
        closeOnPressEscape: false,   // 取消按下ESC键关闭MessageBox
        type: 'warning',
        beforeClose: (action, instance, done) => {
            globalFunction.deleteConfirmObj = { instance, done };
            if (action === "confirm") {
                console.log(1);
                // 按钮加载状态
                globalFunction.confirmButtonLoading(true);
                // 判断thenFun存在并且是Function类型，是则自动执行函数
                params.thenFun && Object.prototype.toString.call(params.thenFun) === "[object Function]" && params.thenFun();
            } else {
                globalFunction.deleteConfirmClose();
            }
        }
    }).then(() => { }).catch(() => { })

}

/**
 * @param { bool } Boolean 加载状态，可选 
 * @description 弹窗确认按钮加载状态
 */
globalFunction.confirmButtonLoading = (bool) => {
    globalFunction.deleteConfirmObj.instance.confirmButtonLoading = bool;
}
/**
 * @param {*} params 
 */
globalFunction.deleteConfirmClose = () => {
    globalFunction.deleteConfirmObj.done();
    globalFunction.deleteConfirmObj = null;
}
/** 函数2 */
globalFunction.message = (params) => {
    console.log(params)
}

export default {
    install(app) {
        app.config.globalProperties["deleteConfirm"] = globalFunction.deleteConfirm;
        app.config.globalProperties["deleteConfirmClose"] = globalFunction.deleteConfirmClose;
        app.config.globalProperties["confirmButtonLoading"] = globalFunction.confirmButtonLoading;
        app.config.globalProperties["message"] = globalFunction.message;
    }
}