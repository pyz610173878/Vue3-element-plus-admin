<template>
    <router-link to="/newsDetailed" class="pull-right">
        <el-button type="danger">新增</el-button>
        <el-button type="danger" size="mini" @click="handlerDetailed">编辑</el-button>
    </router-link>
    <el-col :span="18" class="main">
        <el-form :inline="true" label-width="80px">
            <el-form-item label="类别 : ">
                <el-select placeholder="请选择" class="width-160">
                </el-select>
            </el-form-item>
            <el-form-item label="关键字 : ">
                <el-select placeholder="ID" class="width-120">
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入内容" class="widht-180"></el-input>

            </el-form-item>
            <el-form-item class="pull-right">
                <el-button type="danger">搜索</el-button>
                <el-button type="danger">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-table ref="table" border :data="data.tableData" style="width: 100%;" @selection-change="handelerSelectionChange">
        <!-- 表格组件 -->
        <el-table-column type="selection" width="100"></el-table-column>
        <!-- 多选框 -->
        <el-table-column prop="name" label="标题" width="550"></el-table-column>
        <!-- 表的行 -->
        <el-table-column prop="address" label="类别"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="address" label="操作" width="200">
            <template #default="scope">
                <el-button type="danger" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row class="margin-top-30">
        <el-col :span="6">
            <el-button> 批量删除</el-button>
        </el-col>
        <el-col :span="18">
            <!-- 分页栏组件 -->
            <el-pagination class="pull-right" sizs="small" background @size-change="handlerSizeChange"
                @current-change="handlerCurrentChange" :current-page="data.current_page" :page-size="10"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
                :total="data.total"></el-pagination>
        </el-col>
    </el-row>

</template>
<script setup>
import { reactive, ref, getCurrentInstance, onBeforeUnmount, onBeforeMount } from 'vue'
import { routerKey, useRouter, useRoute } from "vue-router";
import { GetTableList } from "../../api/info"
const router = useRouter()
const { push } = useRouter();
const data = reactive(
    {
        total: 0,
        tableData: [
            {
                name: "彭逸钊", address: "长沙市雨花区", data: "2023-6.5"
            },
            {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            },
            {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            },
            {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            },
            {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            }, {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            }
            , {
                name: "lxc", address: "长沙市雨花区", data: "2023-6.5"
            },
            {
                currentPage: 1
            }
        ]
    }
)

const request_data = reactive(
    {
        pageNumber: 1, // 当前页码
        pageSize: 10, //  每页请求数量
    }
)

// 获取当前分类

const handlerGetList = () => {
    GetTableList(request_data).then(
        response => {
            const response_data = response.data
            data.tableData = response_data.data
            data.total = response.total
        }
    )
}

onBeforeMount(
    () => {
        handlerGetList();
    }
)
// 多选事件

const handelerSelectionChange = (val) => {
    return { data, handelerSelectionChange }
}

const handlerSizeChange = (val) => {

}

const handlerCurrentChange = (val) => {

}


const handlerDetailed = (val) => {
    push(
        {
            path: "/newsDetailed"
        }
    )
}
</script>


<style lang="less" scoped>
.width-160 {
    width: 160px;
}

.width-120 {
    width: 120px;
}

.width-180 {
    width: 180px;
}
</style>