<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
        <el-col :span="8">
            <el-form-item label="信息类别 : ">
                <el-cascader v-model="ruleForm.category_id" :options="category_data.category_options"
                    :props="ruleForm.cascader_props">
                </el-cascader>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label=" 信息标签 :" prop="title">
                <el-input v-model="ruleForm.title">
                </el-input>
            </el-form-item>
        </el-col>
        <el-form-item label="缩略图：" prop="image_url">
            <el-upload :action="Baseurl" class="avatar-uploader" :show-file-list="false" :on-success="handlerAvatarSuccess"
                :http-request="handlerUpload" :before-upload="handlerBeforeOnUpload" on-error="handlerOnError"
                :on-remove="handleRemove">
                <img v-if="ruleForm.image_url" :src="ruleForm.image_url" class="avatar">
                <span v-else> + </span>
            </el-upload>
        </el-form-item>
        <el-form-item label="发布日期 :" prop="create_date">
            <el-date-picker v-model="ruleForm.create_data" type="datetime" placeholder="请输入日期" class="data-picker" />
            {{ ruleForm.create_data }}
        </el-form-item>
        <el-form-item label="是否发布: " prop="status">
            <el-radio-group v-model="ruleForm.status">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="内容 :" prop="content">
            <div ref="editor"></div>
        </el-form-item>



        <el-form-item label="">
            <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>

    </el-form>
</template>
<script setup lang="ts">
import { reactive, getCurrentInstance, watch, onBeforeMount, ref, onMounted, toRefs } from 'vue';
import WangEditor from "wangeditor";
import { useStore } from "vuex";
import { categoryHook } from "../../hook/infoHook"
import type { FormInstance, FormRules } from 'element-plus'
import Editor from 'wangeditor';
import { UploadFile } from "../../api/common";
import { InfoCreate } from "../../api/info";
import { ElMessage } from 'element-plus';
import * as dayjs from 'dayjs'

// 获取store对象

const store = useStore();
const { infoData: category_data, handlerGetCategory: getList } = categoryHook();
const { proxy } = getCurrentInstance();



const time = ref('')
const imageUrl = ref('')


interface RuleForm {
    category_id: []
    image_url: string
    create_data: string
    content: string
    status: string
    title: string
    cascader_props: {
        label: string
        value: string
    }
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    category_id: [],
    image_url: '',
    create_data: '',
    content: '',
    status: "1",
    title: '',
    cascader_props: {
        label: "category_name",
        value: "id",
    }
})

const rules = reactive<FormRules<RuleForm>>({
    category_id:
        [
            {
                required: true,
                message: "分类不能为空",
                trigger: "blur"
            }
        ],
    title: [
        {
            required: true,
            message: "标题不能为空",
            trigger: "change"
        }
    ],
    image_url: [
        {
            required: true,
            message: "缩略图不能为空",
            trigger: "change"
        }
    ],
    create_data: [
        {
            type: 'datetime',
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
    ],
    content: [
        {
            required: true,
            message: "内容不能为空",
            trigger: "change"
        }
    ],
})


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
                    ruleForm.content = value
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
            ruleForm.image_url = respons.data.files_path
        }
    )
}


/** 表单校队与提交函数 */
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        // console.log(request_data);
        if (valid) {
            const request_data = JSON.parse(JSON.stringify(ruleForm))
            // 日期处理
            request_data.create_data = dayjs(request_data.create_data).format('YYYY-MM-DD HH:mm:ss');
            request_data.category_id =
                request_data.category_id[request_data.category_id.length - 1];
            InfoCreate(request_data).then(
                response => {
                    proxy.$message.success(response.message) // 弹窗提示
                }
            )
        } else {
            ElMessage("表单提交失败")
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    console.log(formEl);

    if (!formEl) return
    formEl.resetFields()
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
