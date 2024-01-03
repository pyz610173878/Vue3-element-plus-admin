<template>
    <router-link :to="{ path: '/newsDetailed' }" class="pull-right">
        <el-button type="danger" @click="true">新增</el-button>
    </router-link>
    <el-col :span="18" class="main">
        <el-form :inline="true" label-width="80px">
            <el-form-item label="类别 : ">
                <el-select placeholder="请选择" class="width-160" v-model="value">
                    <el-option v-for=" item  in  data.category_option " :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                {{ value }}
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
    <el-table :data="data.tableData" style="width: 100%;">
        <!-- 表格组件 -->
        <el-table-column type="selection" width="100"></el-table-column>
        <!-- 多选框 -->
        <el-table-column prop="title" label="标题" width="550"></el-table-column>
        <!-- 表的行 -->
        <el-table-column prop="category_name" label="类别"></el-table-column>
        <el-table-column prop="createDate" label="日期"></el-table-column>
        <el-table-column label="操作" width="200">
            <template #default="scope">
                <el-button type="danger" size="">编辑</el-button>
                <el-button type="danger" size="">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row class="margin-top-30">
        <el-col :span="6">
            <el-button> 批量删除</el-button>
        </el-col>
        <el-col :span="18">
            <!-- 分页栏组件 -->
            <el-pagination class="pull-right" size="small" background @size-change="" @current-change=""
                v-model="data.current_page" :page-size="10" :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onBeforeUnmount, onBeforeMount } from 'vue'
import { routerKey, useRouter, useRoute } from "vue-router";
import { GetTableList } from "../../api/info"
const router = useRouter()
const { push } = useRouter();

const value = ref("")

const total = ref(100)

/** 分页接口定义*/
interface Data {
    total: number;
    current_page: number;
    category_option: {
        label: string;
        value: number;
    }[];
    tableData: any[];
}
/** 分页需要的值 */
const data: Data = reactive({
    total: 0,
    current_page: 1,
    category_option: [
        {
            label: "Web前端",
            value: 0,
        },
        {
            label: "Web前端",
            value: 1,
        },
    ],
    tableData: [],
});

// 这意味着 data 是一个常量，其值不能被改变。如果需要改变 data 中的值，我们可以使用 toRefs 函数。

/** 分页响应数据接口定义 */
interface Request_data {
    pageNumber: Number,
    pageSize: Number,
}

const request_data: Request_data = reactive(
    {
        pageNumber: 1, //当前页码
        pageSize: 10 //每页请求数量
    }
)

/** 获取分页接口数据 */
const hadlerGetList = () => {
    GetTableList(request_data).then(response => {
        const request_data = response.data
        data.tableData = request_data.data
        console.log(data.tableData, 123);

        data.total = request_data.total
        console.log(data.total);
    })
}


/** 挂载前运行的函数 */
onBeforeMount(() => {
    hadlerGetList()
})


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

.margin-top-30 {
    margin-top: 30px;
}
</style>