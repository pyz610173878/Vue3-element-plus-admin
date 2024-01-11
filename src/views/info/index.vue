<template>
    <router-link :to="{ path: '/newsDetailed' }" class="pull-right">
        <el-button type="danger" @click="true">新增</el-button>
    </router-link>
    <el-col :span="18" class="main">
        <el-form :inline="true" label-width="80px">
            <el-form-item label="类别 : ">
                <el-cascader v-model="data.category_id" :options="category_data.category_options"
                    :props="data.cascader_props">
                </el-cascader>
            </el-form-item>
            <el-form-item label="关键字 : ">
                <el-select label-width="80px" v-model="request_data.key">
                    <el-option v-for="item in data.keyword_options" :value="item.value" :label="item.label"  ></el-option>
                    {{ request_data.key }}
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入关键字" label-width="80px" v-model="request_data.keyword"></el-input>
                <el-button type="danger" @click="handlerkeyword(request_data.keyword)">搜索</el-button>
            </el-form-item>
            <el-form-item class="pull-right">


            </el-form-item>
        </el-form>
    </el-col>
    <el-table :data="data.tableData" style="width: 100%;" @selection-change="handlerSelectionChange">
        <!-- 表格组件 -->
        <el-table-column type="selection" width="100"></el-table-column>
        <!-- 多选框 -->
        <el-table-column prop="title" label="标题" width="550"></el-table-column>
        <!-- 表的行 -->
        <el-table-column prop="category_name" label="类别"></el-table-column>
        <el-table-column prop="createDate" label="日期" :formatter="formatDate"></el-table-column>
        <el-table-column prop="status" label="发布状态">
            <template #default="scope">
                <el-switch v-model="scope.row.status" @click="SwitchComfirm(scope.row)" :loading="scope.row.loading" />
            </template>


        </el-table-column>
        <el-table-column label="操作" width="200">
            <template #default="scope">
                <el-button type="danger" size="">编辑</el-button>
                <el-button type="danger" size="" @click="handlerDeleteComfirm(scope.row.id)">删除</el-button>

            </template>
        </el-table-column>
    </el-table>
    <el-row class="margin-top-30">
        <el-col :span="6">
            <el-button @click="handlerDeleteComfirm()"> 批量删除</el-button>

        </el-col>
        <el-col :span="18">
            <!-- 分页栏组件 -->
            <el-pagination class="pull-right" size="small" background @size-change="handlerSizeChange"
                @current-change="handlerCurrentChange" v-model="data.current_page" :page-size="10"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onBeforeUnmount, onBeforeMount } from 'vue'
import { routerKey, useRouter, useRoute } from "vue-router";
import { GetTableList, Delete, Status } from "../../api/info"
import { getDate } from '../../utils/common'
import { categoryHook } from "../../hook/infoHook"
const router = useRouter()
const { push } = useRouter();
const { proxy, ctx } = getCurrentInstance();

const value = ref("")

const total = ref(100)

const { infoData: category_data, handlerGetCategory: getList } = categoryHook();




const handlerSelectionChange = (val) => {
    if (val.length > 0) {
        const iditme = val.map(item => item.id)
        console.log(iditme);

    }

}
/** 分页接口定义*/
interface Data {
    total: number;
    current_page: number;
    tableData: any[];
    category_id: []
    status: boolean
    // loading: boolean
    row_id: string
    cascader_props: {
        label: string
        value: string
    }
    keyword_options: Object[]
}
/** 分页需要的值 */
const data: Data = reactive({
    total: 0,
    current_page: 1,
    category_id: [],
    tableData: [],
    status: true,
    row_id: '',
    cascader_props: {
        label: "category_name",
        value: "id",
    },
    keyword_options:
        [{ label: 'ID', value: 'id' },
        { label: '标题', value: 'title' },]
});

// 这意味着 data 是一个常量，其值不能被改变。如果需要改变 data 中的值，我们可以使用 toRefs 函数。

/** 分页响应数据接口定义 */
interface Request_data {
    pageNumber: Number
    pageSize: Number
    key?: string
    keyword?: string
}

const request_data: Request_data = reactive(
    {
        pageNumber: 1, //当前页码
        pageSize: 10, //每页请求数量
        key: '',
        keyword: ''
    }
)

const handlerkeyword = (val) => {
    request_data.keyword = val
    GetTableList(request_data).then(response => {
        const request_data = response.data
        console.log(request_data, "123");

        data.tableData = request_data.data
        data.total = request_data.total
    })
}

/** 获取分页接口数据 */
const hadlerGetList = () => {
    GetTableList(request_data).then(response => {
        const request_data = response.data
        data.tableData = request_data.data
        data.total = request_data.total
    })
}

const formatDate = (row) => {
    return getDate({ value: row.createDate * 1000 })

}
/** 下拉框页面分页获取 */
const handlerSizeChange = (val) => {
    request_data.pageSize = val;
    request_data.pageNumber = 1;
    hadlerGetList()
}
/**  指定页码获取 */
const handlerCurrentChange = (val) => {
    request_data.pageNumber = val;
    hadlerGetList();
}


/** 删除分类函数*/
const handlerDeleteComfirm = (val) => {
    console.log(val, "数据");
    // 参数跟编辑一样。
    // 弹窗信息不知道。
    // 如果是父分类，需要获取整个对象
    proxy.deleteConfirm(
        {
            title: "删除",
            message: "确认删除当前数据吗？",
            thenfun: () => { return handlerDelete(val) } //匿名函数（立即执行函数）
        }
    )
}


const handlerDelete = (value) => {

    return new Promise((resolve, reject) => {
        Delete({ id: value }).then(response => {
            // 成功提示
            proxy.$message({
                message: response.message,
                type: "success"
            })
        })
        hadlerGetList();
        data.row_id = [];
        resolve();
    }).catch(
        (error => {
            reject();
        }))
}


/** 发布状态函数 */
const SwitchComfirm = (data) => {

    // val = switch 发布状态
    // data 文章对象
    data.loading = true


    Status({ id: data.id, status: data.status }).then(response => {

        proxy.$message.success(response.message) // 发布成功
        data.loading = false
    }
    ).catch(error => {
        data.loading = false
    }
    )

}
console.log(data.status);

/** 挂载前运行的函数 */
onBeforeMount(() => {
    hadlerGetList()
    getList()

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