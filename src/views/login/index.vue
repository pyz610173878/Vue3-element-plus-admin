<template>
    <div id="login">
        <div class="login-container">
            <div class="login_">
                <el-form ref="account_form" :model="data.form" :rules="data.form_rules" autocomplete="on">
                    <div class="title-container">
                        <span>
                            <img src="../../assets/vue-logo.png" alt="" class="title-logo">
                        </span>
                        <h3 class="title-size">

                            Vue3-Admin</h3>
                    </div>
                    <ul class="login-tab">
                        <li v-for="code in data.tab_menu" :key="code.type" @click="data.current_menu = code.type"
                            :class="{ 'current': data.current_menu === code.type }">{{ code.label }}
                        </li>
                    </ul>
                    <el-form-item prop="username" class="el-form-item">
                        <el-input v-model="data.form.username" placeholder="用户名 : admin" clearable size="large"
                            :prefix-icon="User" minlength="6" maxlength="25" type="text" autocomplete="on" tabindex="1">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="el-form-item_content" prop="pass">
                        <el-input v-model="data.form.password" type="password" placeholder="Please input password"
                            show-password :prefix-icon="Lock" size="large" minlength="6" maxlength="25" @change="" />
                    </el-form-item>
                    <el-form-item class="el-form-item_content" prop="checkPass">

                        <el-input v-if="data.current_menu === 'register'" v-model="data.form.passwords" type="password"
                            placeholder="Please input password" show-password :prefix-icon="Lock" size="large" minlength="6"
                            maxlength="25" @change="" />
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-row :gutter="10">
                            <el-col :span="14">
                                <el-input placeholder="请输入验证码" class="yzm_input" v-model="data.form.code" type="text">
                                </el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-button type="success" class="yzm-btn" @click="getCaptchaOnClick"
                                    :loading='data.code_button_loading' :disabled="data.code_button_disabled">
                                    {{ data.code_button_text
                                    }}
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="submitForm" :disabled="false" class="el-button-block">
                            {{ data.current_menu === "login" ? "登录" : "注册" }}
                        </el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>
  
<script setup >

import { reactive, ref, getCurrentInstance, onBeforeUnmount } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
// import { useStore } from "vuex";
import { routerKey, useRouter, useRoute } from "vue-router";
// import axios from 'axios';
import { validate_email, validate_password, validate_code } from "../../utils/validate";
import { GetCode, ErrorHttp } from "../../api/common";
import { ElMessage } from 'element-plus'
import sha1 from "js-sha1";
import { Register } from "../../api/account";
import { useStore } from "vuex";



const instance = getCurrentInstance();

const axios = instance?.appContext.config.globalProperties.$axios;
const router = useRouter()
const store = useStore();

const validate_name_rules = (rule, value, callback) => {
    let regEmail = validate_email(value);
    if (value === '') {
        callback(new Error("请输入邮箱"));
    } else if (!regEmail) {
        callback(new Error("邮箱格式不正确"));
    } else {
        callback();
    }
}

const validate_password_rules = (rule, value, callback) => {
    let regPassword = validate_password(value);
    // 获取“确认密码”
    const passwordsValue = data.form.passwords;
    if (value === '') {
        callback(new Error("请输入密码"));
    } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
    } else {
        callback();
    }
}
// 校验确认密码
const validate_passwords_rules = (rule, value, callback) => {
    // 如果是登录，不需要校验确认密码，默认通过
    if (data.current_menu === "login") { callback(); }
    let regPassword = validate_password(value);
    // 获取“密码”
    const passwordValue = data.form.password;
    if (value === '') {
        callback(new Error("请输入密码"));
    } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
    } else if (passwordValue && passwordValue !== value) {
        callback(new Error("两次密码不一致"));
    } else {
        callback();
    }
}
const validate_code_rules = (rule, value, callback) => {
    let regCode = validate_code(value);
    if (value === '') {
        callback(new Error("请输入验证码"));
    } else if (!regCode) {
        callback(new Error("请输入6位的验证码"));
    } else {
        callback();
    }
}
// const validate_code_rules = () => {
//     const username = data.form.username
//     const password = data.form.password
//     if ((username === '' && password === '')) {
//         data.code_button_disabled = true
//     }

//     else {
//         data.code_button_disabled = false
//     }
// }

const data = reactive({
    form: {
        username: "",      // 用户名
        password: "",      // 密码
        passwords: "",     // 确认密码
        code: "",          // 验证码
    },
    form_rules: {
        username: [
            { validator: validate_name_rules, trigger: 'change' }
        ],
        password: [
            { validator: validate_password_rules, trigger: 'change' }
        ],
        passwords: [
            { validator: validate_passwords_rules, trigger: 'change' }
        ],
        code: [
            { validator: validate_code_rules, trigger: 'change' }
        ]
    },
    tab_menu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" }
    ],
    current_menu: "login",
    /**
     * 获取验证码按钮交互
     */
    code_button_disabled: false,
    code_button_loading: false,
    code_button_text: "获取验证码",
    // 提交按钮
    submit_button_disabled: true,
    submit_button_loading: true,
    loading: false,
})

// 用户名与校验




const getCaptchaOnClick = () => {
    const username = data.form.username
    const password = data.form.password
    const passwords = data.form.passwords


    // 校验用户名
    if (!validate_email(username)) {
        ElMessage({
            message: "用户名不能为空 或 格式不正确",
            type: "error"
        })
        return false;
    }
    // 校验密码
    if (!validate_password(password)) {
        ElMessage({
            message: "密码不能为空 或 格式不正确",
            type: "error"
        })
        return false;
    }
    // 判断非 登录 时，校验两次密码
    if (data.current_menu === 'register' && (password !== passwords)) {
        ElMessage({
            message: "两次密码不一致",
            type: "error"
        })
        return false;
    }

    // 获取验证码接口
    const requestData = {
        username: data.form.username,
        module: data.current_menu
    }
    data.code_button_loading = true;
    data.code_button_text = "发送中";
    GetCode(requestData).then(response => {
        const resData = response;
        console.log(resData.data);
        // 激活提交按钮
        data.submit_button_disabled = false;

        //用户名存在
        if (resData.resCode === 1024) {
            // 用户名存在的请求码为1024
            ElMessage({
                message: resData.message,
                type: "error"
            });
            return false;
        }
        ElMessage(
            {
                message: resData.message,
                type: "success"
            }
        )
        // 执行倒计时
        countdown();

    }).catch(error => {
        data.code_button_loading = false;
        data.code_button_text = "获取验证码";
    }
    )
    const countdown = (time = 30) => {
        if (time && typeof time !== 'number') { return false; }
        let second = time || 60;
        data.code_button_loading = false;              // 取消加载
        data.code_button_disabled = true;              // 禁用按钮
        data.code_button_text = `${second}`;
        // if (data.code_button_timer) { clearInterval(data.code_button_timer) };
        // 开启定时器  

        const code_button_timer = setInterval(() => {
            second--;
            data.code_button_text = `${second}`;  // 按钮文本
            if (second <= 0) {
                data.code_button_text = `重新获取`;         // 按钮文本
                data.code_button_disabled = false;         // 启用按钮
                clearInterval(code_button_timer);     // 清除倒计时
            }
        }, 1000)
    }
}





// 表单提交
const account_form = ref(null);
const submitForm = (formName) => {
    account_form.value.validate((valid) => {
        if (valid) {
            //    根据data.current_menu的值来调用对应的函数
            data.current_menu === "login" ? login() : register();
        } else {
            alert('表单验证不通过');
            return false;
        }
    });
}



// 登录函数

const login = () => {


    const requestDatas = {
        username: data.form.username,
        password: sha1(data.form.password),
        code: data.form.code,
    }
    data.submit_button_loading = true
    store.dispatch("app/loginAction", requestDatas).then(response => {
        data.submit_button_loading = false;
        ElMessage({
            message: response.message,
            type: "success"
        });
        // 调用方法写入token的
        // 判断是否存在token，如果有就进行跳转。 
        router.push("/admin");
        reset()
    }
    ).catch(error => {
        data.submit_button_loading = false;
        console.log(error);
    })

}


const logins = () => {

    router.replace({ path: "/user" })

}

// 注册函数

const register = () => {
    const requestData = {
        username: data.form.username,
        password: sha1(data.form.password),
        code: data.form.code,
        create: 1
    }
    data.submit_button_loading = true;
    Register(requestData).then(response => {
        ElMessage({
            message: response.message,
            type: "success"
        })
        reset()
        // 这里需要一个重置函数。
    }).catch(error => {

        data.submit_button_loading = false;
    })
}

// 清空函数
const reset = () => {
    account_form.value.resetFields()
    data.form.passwords = "";
    data.current_menu = "login";
    // code_button_timer && clearInterval(code_button_timer);
    // 获取验证码重置文本
    data.code_button_text = "获取验证码";
    // 获取验证码激活
    data.code_button_disabled = false;
    // 禁用提交按钮
    data.submit_button_disabled = true;
    // 取消提交按钮加载
    data.submit_button_loading = false;
    // clearInterval(code_button_timer);
}


onBeforeUnmount(() => {
    clearInterval(code_button_timer);     // 清除倒计时
})


</script>

<style lang="less" scoped>
#login {
    height: 100vh;
}

.login-container {
    height: 75%;
    margin: auto;
    margin-top: 100px;

}

// 标题与logo
.title-container {
    display: flex;
    justify-content: space-between;
}

.title-size {
    font-size: 42px;
    font-family: "Microsoft YaHEi";
    text-align: center;
    margin-bottom: 30px;
    color: #34495E;
    padding-right: 31px;
}

// 主题的logo
.title-logo {
    width: 60px;
    height: 65px;
}

.login_ {
    width: 400px;
    margin: auto;
    margin-top: 50px;
    padding: 50px 35px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

}


// 登录与注册按钮

.login-tab {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    margin-bottom: 10px;

    li {
        display: inline-block;
        padding: 10px 24px;
        margin: 0 10px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        border: solid 1px;

        &.current {
            background-color: #009688;
        }
    }
}

// 注册样式
.reg-container {
    float: right;

    .reg a {
        font-size: 14px;
        color: red;
    }

    .reg a:hover {
        text-decoration: dashed;

    }
}

// 验证样式

.form-label {
    margin-right: 20px;
}

.login-button {
    width: 100%;
    height: 35px;
    background-color: black;
    border-radius: 8px;
    margin-bottom: 8px;
}

.login-btnsize {
    font-size: 16px;
}


// 注册样式
.re {
    display: flex;
    justify-content: space-between;
}



// 登录按钮


.el-button-block {
    width: 100%;
    height: 35px;
    border-radius: 20px;
}
</style>
  