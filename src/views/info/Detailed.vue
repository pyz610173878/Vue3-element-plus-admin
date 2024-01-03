<template>
    <el-form ref="formDom" model="field" :rules="form_data.form_rules">
        <el-col :span="8">
            <el-form-item label="信息类别 : " v-model="form_data.field.category_id" prop="category_id">
                <el-cascader :options="category_data.category_options"
                    :props="form_data.field.cascader_props"></el-cascader>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label=" 信息标签 :" prop="title">
                <el-input v-model="form_data.field.title">
                </el-input>
            </el-form-item>
        </el-col>
        <el-form-item label="缩略图：" prop="imageUrl">
            <el-upload :action="Baseurl" class="avatar-uploader" :show-file-list="false" :on-success="handlerAvatarSuccess"
                :http-request="handlerUpload" :before-upload="handlerBeforeOnUpload" on-error="handlerOnError"
                :on-remove="handleRemove">
                <img v-if="form_data.field.image_url" :src="form_data.field.image_url" class="avatar">
                <span v-else> + </span>
            </el-upload>
        </el-form-item>
        <el-form-item label="发布日期 :" prop="createDate">
            <el-date-picker v-model="form_data.field.create_data" type="datetime" placeholder="请输入日期" class="data-picker" />

        </el-form-item>
        <el-form-item label="是否发布: " prop="status">
            <el-radio-group v-model="form_data.field.status">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="内容 :" prop="content">
            <div ref="editor"></div>
        </el-form-item>



        <el-form-item label="">
            <el-button type="danger" @click="handlerSubmitForm">确定</el-button>
        </el-form-item>

    </el-form>
</template>
<script setup lang="ts">
import { reactive, getCurrentInstance, watch, onBeforeMount, ref, onMounted, toRefs } from 'vue';
import WangEditor from "wangeditor";
import { useStore } from "vuex";
import { categoryHook } from "../../hook/infoHook"
// 

import { UploadFile } from "../../api/common";
// 文件接口函数
import { ElMessage } from 'element-plus';
import Editor from 'wangeditor';
// import globalData from "@/js/data";
import dayjs from 'element-plus';

// 获取store对象

const store = useStore();
const { infoData: category_data, handlerGetCategory: getList } = categoryHook();
const { proxy } = getCurrentInstance();

// const { go } = useRouter();
// const { query } = useRoute();

const time = ref('')
const imageUrl = ref('')
const form_data = reactive(
    {
        field: {
            category_id: [],
            image_url: "",
            create_data: [],
            content: "",
            status: "1",
            title: "",
            cascader_props: {
                label: "category_name",
                value: "id",
            },
        },

        form_rules: {
            categoryId:
                [
                    {
                        required: true,
                        message: "分类不能为空",
                        trigger: "change"
                    }
                ],
            title: [
                {
                    required: true,
                    message: "标题不能为空",
                    trigger: "change"
                }
            ],
            imgUrl: [
                {
                    required: true,
                    message: "缩略图不能为空",
                    trigger: "change"
                }
            ],
            createDate: [
                {
                    required: true,
                    message: "请选择发布日期",
                    trigger: "change"
                }
            ],
            status: [
                {
                    required: true,
                    message: "请选择发布状态",
                    trigger: "change"
                }
            ]
        },
        content: [
            {
                required: true,
                message: "内容不能为空",
                trigger: "change"
            }
        ]

    }
)


const props = defineProps({
    modelValue: [String, Object, Array],
    // 图片数量限制
    limit: {
        type: Number,
        default: 1,
    },
    // 大小限制(MB)
    fileSize: {
        type: Number,
        default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
        type: Array,
        default: () => ["png", "jpg", "jpeg"],
    },
    // 是否显示提示
    isShowTip: {
        type: Boolean,
        default: true
    },
});

const fileTypes = ref(['png', 'jpg', 'jpeg']);

const Baseurl = ref("https://jsonplaceholder.typicode.com/posts/")

const editor = ref();
let editor_instance: Editor;
// 声明变量为Editor
onMounted(
    () => {
        editor_instance = new WangEditor(editor.value);
        Object.assign(editor_instance.config,
            {
                onchange(value) {
                    form_data.field.content = value
                }
            });
        editor_instance.create();
    }
)

const handlerOnError = (res, file) => { }
const handlerBeforeOnUpload = async (file) => {
    let isImg = false;
    let fileExtension = "";
    const isLt2M = file.size / 1024 / 1024 < 5; //限制不能超过5MB

    // 提取文件扩展名
    if (file.name.includes(".")) {
        fileExtension = file.name.split(".").pop();
        console.log(fileExtension);
    }

    // 检查文件的扩展名是否存在于 fileType 数组中
    isImg = fileTypes.value.includes(fileExtension);
    if (!isImg) {
        console.log(isImg);
        proxy.$message.error("格式不正确");
        return false
    }
    if (!isLt2M) {
        proxy.$message.error("图片过大");
    }

    return isImg && isLt2M

}

const handlerUpload = async (params) => {
    // 一个对象有文件的基本信息
    console.log(params, 123);
    const file = params.file;
    // 实例化表单对象
    const form = new FormData();
    // 表单添加 files 字段
    form.append("files", file);
    // 上传接口
    UploadFile(form).then(
        respons => {
            // 显示图片
            form_data.field.image_url = respons.data.files_path
        }
    )
}

const formDom = ref();
// 表单提交函数
const handlerSubmitForm = () => {
    formDom.value.validate((valid) => {
        // 表单验证通过
        console.log(form_data.field, 123);


        if (valid) {
        }
        else {
            proxy.$message.error("error submit !");
        }
    })
}

// 删除图片函数

const handleRemove = (name: String) => {

}


const handlerAvatarSuccess = (name: String) => {

}

// 挂载之前
onBeforeMount(
    () => {
        getList();
    }
)


</script>


<style lang="less" scoped>
.data {
    margin-bottom: 20px;
}


.data-picker {}

.avatar {
    width: 150px;
    height: 150px;
}

.el-upload {
    width: 150px !important;
}
</style>
