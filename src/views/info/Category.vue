<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div>
                    <el-form>
                        <el-form-item label="">
                            <el-button type="" @click="handlerCategory('first_category_add', node)"><span>{{ "添加一级分类"
                            }}</span></el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-header>
            <el-container>
                <el-aside width="400px">
                    <el-tree ref="categoryTree" :data="data.tree_data" :props="data.defaultProps" default-expand-all
                        :expand-on-click-node="false">
                        <template #default="{ node, data }">
                            <div class="custom-tree-node">
                                <span>{{ node.label }}</span>
                                <span>
                                    <el-button type="danger" round
                                        @click="handlerCategory('child_category_add', node)">添加子级</el-button>
                                    <el-button type="success" round
                                        @click="handlerCategory(node.level === 1 ? 'parent_category_edit' : 'child_category_edit', node)">编辑</el-button>
                                    <el-button round @click="handlerCategory('delete_category', node)">删除</el-button>
                                </span>
                            </div>
                        </template>
                    </el-tree>
                    <!-- <el-button type="" @click="handlerCategory('child_category_add')"><span>{{ '添加子级分类' }}</span></el-button>
                    <el-button type="" @click="handlerCategory('child_category_add')"><span>{{ '编辑' }}</span></el-button> -->
                </el-aside>
                <el-main>
                    <div class="right">
                        <h4 class="xx">{{ config[config.type].title }}</h4>
                        <el-form label-width="120px">
                            <el-form-item label="父级分类名称：">
                                <el-input v-model.trim="data.parent_category" placeholder=""
                                    :disabled="config[config.type].parent_disable"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form label-width="120px">
                            <el-form-item label="子级分类名称：" v-if="config[config.type].sub_show">
                                <el-input v-model.trim="data.sub_category" placeholder=""
                                    :disabled="config[config.type].sub_disable"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form>
                            <el-form-item label="">
                                <el-button type="danger" @click="handlerSubmit"
                                    :loading="data.button_loading">确定</el-button>
                                    <el-button type="danger" @click="testes">12321</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onBeforeMount } from 'vue';
import { firstCategoryAdd, GetCategory, ChildCategoryAdd, CategoryEdit, CategoryDel } from "../../api/info";

const { proxy } = getCurrentInstance();


// 定义交互变量

const testes = (value) => {
    console.log(value,'测试');
    
    proxy.test(
        {
            title: '删除',
            message: '确定删除'
        }
    )
}



// 1. 分类表单
const data = reactive(

    {
        tree_data: [],
        parent_category: "",  //父级分类名称
        sub_category: "",      //子级分类名称
        button_loading: false,          //加载 “按钮” 确定
        defaultProps: {
            children: 'children',
            label: 'category_name'
        },
        parent_category_data: {},
        sub_category_data: {}
    },
)
const categoryTree = ref(null);

// 2. 分类页面的逻辑交互
const config = reactive({
    type: "default",
    default: {
        title: "分类标签",
        parent_disable: true,
        sub_disable: true,
        sub_show: true,         //显示或隐藏初始化标签 

    },
    // 父级分类状态
    first_category_add: {
        title: "添加父级",
        parent_disable: false,
        sub_disable: false,
        sub_show: false,
        clear: ["parent_category", "sub_category"],

    },
    child_category_add: {
        // 子级添加按钮状态
        title: "添加子级",
        parent_disable: true,
        sub_disable: false,
        sub_show: true,
        clear: ["sub_category"],
        creat: ["parent_category"]
    },
    child_category_edit: {
        title: "编辑添加子级",
        parent_disable: true,
        sub_disable: false,
        sub_show: true,

    },
    parent_category_edit: {
        title: "编辑添加父级",
        parent_disable: false,
        sub_disable: true,
        sub_show: false,
    },

})




const handlerCategory = (type, category_data) => {
    console.log(category_data, "删除按钮");
    if (type === "child_category_edit") {
        // 子级修改需要传递子级对象
        data.parent_category_data = category_data.parent || null;
        data.sub_category_data = category_data || null;
    } else {
        data.parent_category_data = category_data || null;
    }
    config.type = type === "delete_category" ? "default" : type;
    // 文本清除、还原
    handlerInputValue();
    // 弹窗二次提示
    (type === "delete_category") && handlerDeleteComfirm();
}
const handlerInputValue = () => {
    // 获取清除数据的对象
    const clearObject = config[config.type].clear;
    // 获取还原数据的对象
    const createObject = config[config.type].create;

    // 执行清除动作 
    if (clearObject && clearObject.length > 0) {
        clearObject.forEach(item => {
            data[item] = "";
        })
    }
    // 执行还原动作
    if (createObject && createObject.length > 0) {
        createObject.forEach(item => {
            data[item] = data[`${item}_data`].data.category_name;
        })
    }
}

const handlerSubmit = () => {
    if (config.type === 'first_category_add') { handlerFirstCategoryAdd(); }
    if (config.type === 'child_category_add') { handlerChildCategoryAdd(); }
    if (config.type === 'child_category_edit' || config.type === 'parent_category_edit') { handlerCategoryEdit(); }
}

// 添加父级分类
const handlerFirstCategoryAdd = () => {
    // 输入框不能为空
    if (data.parent_category === "") {
        proxy.$message.error("父级分类不能为空");
        return false
    }
    // 防止确定按钮连续点击
    data.button_loading = true;
    // 调用接口传入数据
    firstCategoryAdd(
        { categoryName: data.parent_category }
    ).then(response => {
        data.button_loading = false;
        // 成功提示
        proxy.$message(
            {
                message: response.message,
                type: "success"
            }
        )
        // 删除输入框元素
        data.parent_category = ""
    }).catch(error => {
        data.button_loading = false;   //  删除按钮加载状态
    })

}

// 添加子级
// 添加父级分类
// 子级分类添加
const handlerChildCategoryAdd = () => {

    // 子级为空时提示
    if (!data.sub_category) {
        proxy.$message.error("子级分类不能为空");
        return false
    }
    // 按钮加载状态
    data.button_loading = true;
    // 接口
    ChildCategoryAdd({
        categoryName: data.sub_category,           // 分类名称参数
        parentId: data.parent_category_data.id // 父级分类ID参数
    }).then(response => {
        // 清除加载状态
        data.button_loading = false;
        // 成功提示
        proxy.$message({
            message: response.message,
            type: "success"
        })
        // 清除子级分类文本
        data.sub_category = "";
        // 追加子级数据
        categoryTree.value.append(response.data, data.parent_category_data);
    }).catch(error => {
        // 清除加载状态
        data.button_loading = false;
    })
}

const handlerCategoryEdit = () => {
    // 父级分类不能为空
    if (data.parent_category === "" || data.sub_category === '') {
        const message = config.type === "parent_category_edit" ? "父级" : "子级";
        proxy.$message.error(`${message}分类不能为空`);
        return false
    }
    data.button_loading = true
    const node_parent = data.parent_category_data.data
    const node_sub = data.sub_category_data.data
    CategoryEdit(
        {
            categoryName: config.type === "parent_category_edit" ? data.parent_category : data.sub_category, // 分类名称参数 }
            id: config.type === "parent_category_edit" ? node_parent.id : node_sub.id      // 分类ID参数
        }
    ).then(response => {
        data.button_loading = false
        proxy.$message(
            {
                message: response.message,
                type: "success"
            }
        )
        // 同步更新树形菜单节点
        const node_date = config.type === "parent_category_edit" ? node_parent : node_sub;
        console.log(response.data.category_name, "这个值是什么");

        node_date.category_name = response.data.category_name;
        handlerGetCategory()
    }).catch(error => {
        data.button_loading = true
    }

    )
}


/** 删除分类函数*/
const handlerDeleteComfirm = () => {
    // 参数跟编辑一样。
    // 弹窗信息不知道。
    // 如果是父分类，需要获取整个对象

    proxy.$confirm("确认删除该分类吗？删除后将无法恢复", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,            // 取消右上角关闭按钮
        closeOnClickModal: false,    // 取消点击遮罩关闭 MessageBox
        closeOnPressEscape: false,   // 取消按下ESC键关闭MessageBox
        type: 'warning',
        beforeClose: (action, instance, done) => {
            if (action === "confirm") {
                instance.confirmButtonLoading = true;
                CategoryDel({ categoryId: data.parent_category_data.data.id }).then(response => {
                    // 成功提示
                    proxy.$message({
                        message: response.message,
                        type: "success"
                    })
                    instance.confirmButtonLoading = false;
                    done();
                    // 删除交互
                    categoryTree.value.remove(data.parent_category_data);
                }).catch(error => {
                    instance.confirmButtonLoading = false;
                    done();
                })
            }
            else {
                done();
            }
        }
    })
}


const handlerGetCategory = () => {
    GetCategory().then(response => {
        const response_data = response.data
        data.tree_data = response_data || [];
    })
}
onBeforeMount(() => {
    handlerGetCategory()
})
</script>


<style scoped lang="scss">
.spacing-hr {
    border: none; // 设置无边框
    border-top: 1px solid #e9e9e9; // 底部1像素，实线边框，颜色为 e9e9e9
    margin: 30px 0; // 上下边距为30像素，左右为0
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
}

:deep(.el-tree-node__content) {
    height: auto;

    button {
        padding: 8px 12px;
        margin: 8px 3px;
        font-size: 12px;
        height: auto;
    }
}

.column {
    height: 44px;
    padding: 0 20px;
    margin-bottom: 30px;
    line-height: 44px;
    border-radius: 6px;
    background-color: #f3f3f3;
}
</style>