<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>

<script setup>
import login from "./views/login/index.vue"
import { RouterLink, RouterView } from 'vue-router';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

let locale = zhCn


</script>