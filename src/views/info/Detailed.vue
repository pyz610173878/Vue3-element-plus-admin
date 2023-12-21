<template>
    <el-form ref="formDom" model="field" :rules="form_rules">
        <el-col :span="8">
            <el-form-item label="信息类别 : " prop="categoryId">
                <el-cascader :options="infoData.category_options" :props="form_data.field.cascader_props"></el-cascader>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label=" 信息标签 :" prop="title">
                <el-input></el-input>
            </el-form-item>
        </el-col>
        <el-form-item label="缩略图：" prop="imageUrl">
            <el-upload action="" class="avatar-uploader" :show-file-list="false" :on-success="handlerAvatarSuccess"
                :http-request="handlerUpload" :before-upload="handlerBeforeOnUpload" on-error="handlerOnError">
                <img v-if="form_data.field.image_url" :src="form_data.field.image_url" class="avatar">
                <span v-else> + </span>
            </el-upload>
        </el-form-item>
        <el-form-item label="发布日期 :" prop="createDate">
            <el-date-picker v-model="form_data.field.data" type="datetime" placeholder="请输入日期" />

        </el-form-item>
        <el-form-item label="是否发布: " prop="status">
            <el-radio-group v-model="form_data.field.status">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
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
<script setup>
import { reactive, getCurrentInstance, watch, onBeforeMount, ref, onMounted, toRefs } from 'vue';
import WangEditor from "wangeditor";
import { useStore } from "vuex";
import { categoryHook } from "@/hook/infoHook"
import { UploadFile } from "../../api/common";
// 文件接口函数
import { ElMessage } from 'element-plus';
import globalData from "@/js/data";
import dayjs from "dayjs";

// 获取store对象

const store = useStore();
const { infoData, handlerGetCategory } = categoryHook();

// const { go } = useRouter();
// const { query } = useRoute();
// 挂载之前

onBeforeMount(
    () => {
        handlerGetCategory();
    }
)
const time = ref('')
const form_data = reactive(
    {
        field: {
            image_url: "",
            data: "",
            content: "",
            category: "",
            status: "1",
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



const editor = ref();
let editor_instance = null;
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
    const isJPG = file.type === "image/jpeg"
    const isLt2M = file.size / 1024 / 1024 < 2; // 限制文件大小不能大于 2M
    if (!isJPG) {
        ElMessage(
            {
                message: "上传图片大小不能超过 2MB!"
            }
        )
        return false;
    }
    if (!isLt2M) {
        ElMessage(
            {
                message: "上传图片大小不能超过 2MB!"
            }
        )
        return false;
    }
    return isJPG && isLt2M;
}

const handlerUpload = async (params) => {
    console.log(params);
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
            console.log(form_data.field.image_url);
        }
    )
}

const formDom = ref();
// 
const handlerSubmitForm = () => {
    formDom.value.validate((valid) => {
        // 表单验证通过
        if (valid) {
            console.log(123);
            console.log(form_data.field);
        }
        else {
            console.log("error submit !");
        }
    })
}


</script>


<style lang="less" scoped>
.data {
    margin-bottom: 20px;
}
</style>