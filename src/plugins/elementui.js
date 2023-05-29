import { ElConfigProvider, ElSlider, ElButton, ElSwitch, ElTree, ElForm, ElFormItem, ElInput, ElSelect, ElCol, ElRow, ElMessage, ElMessageBox, ElContainer, ElAside, ElHeader, ElMain, ElMenu, ElMenuItem, ElSubMenu, ElTable, ElPagination, ElUpload, ElDatePicker, ElCascader, ElRadio, ElLoading, ElTimePicker, ElCheckbox, ElDialog, ElInputNumber} from 'element-plus';
// 导出
export default (app) => {
    app.use(ElConfigProvider);
    app.use(ElButton);
    app.use(ElSwitch);
    app.use(ElForm);
    app.use(ElFormItem);
    app.use(ElInput);
    app.use(ElCol);
    app.use(ElRow);
    app.use(ElMessage);
    app.use(ElMessageBox);
    app.use(ElContainer);
    app.use(ElAside);
    app.use(ElHeader);
    app.use(ElMain);
    app.use(ElMenu);
    app.use(ElMenuItem);
    app.use(ElSubMenu);
    app.use(ElSlider);
    app.use(ElSelect);
    app.use(ElTable);
    app.use(ElPagination);
    app.use(ElTree);
    app.use(ElUpload);
    app.use(ElDatePicker);
    app.use(ElRadio);
    app.use(ElLoading);
    app.use(ElTimePicker);
    app.use(ElCascader);
    app.use(ElCheckbox);
    app.use(ElDialog);
    app.use(ElInputNumber);
}