
<template>
    <el-container id="layout-container">
        <el-aside id="layout-aside"><layout-aside /></el-aside>
        <!-- 侧边栏的滑动 -->
        <el-container>
            <el-header id="layout-header" height="55px"><layout-header /></el-header>
            <el-main id="layout-main"><layout-main /></el-main>

        </el-container>
    </el-container>
</template>  





<script setup>
import LayoutHeader from "./components/Header.vue";
import LayoutAside from "./components/Aside.vue";
import LayoutMain from "./components/Main.vue";
</script>


<style lang="less" scoped>
#layout-container {
    height: 100vh;
}


#layout-aside {
    background-color: white;
    width: 200px;
}


#layout-header {
    position: relative;
    z-index: 10;
    background-color: white;
    border-bottom: 1px solid #e4e7ed;
}


#layout-main {
    background-color: white;
}
</style>