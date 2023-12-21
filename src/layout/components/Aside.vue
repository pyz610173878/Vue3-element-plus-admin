<template>
    <div class="aside-main">
        <div class="aside-icon">
            <div class="icon-main">
                <img src="../../assets/6128107.png" alt="" id="Vue-icon">
            </div>
        </div>
        <div class="aside-context ">
            <el-menu :collapse="data.collapse" :default-active="currentPath" active-text-color="#ffd04b" router >
                <template v-for="item in routers" :key="item.path">
                    <template v-if="!item.hidden">

                        <el-menu-item v-if="!item.children" :index="item.path">

                        </el-menu-item>
                        <!-- 子级菜单 -->
                        <el-sub-menu v-else :index="item.path">
                            <template #title>
                                <svg-icon :name="item.meta && item.meta.icon" class="menu-icon"></svg-icon>
                                {{ item.meta && item.meta.title }}</template>

                            <template v-for="child in item.children" :key="child.path">
                                <el-menu-item v-if="!child.hidden" :index="child.path">
                                    {{ child.meta && child.meta.title }}
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>  

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, computed, toRefs } from "vue";
import { useStore } from "vuex";
const { options } = useRouter();
const { path } = useRoute();
const routers = options.routes;

const store = useStore();

/**
    * 数据
    */

const data = reactive({
    logo: computed(() => {
        return store.state.app.collapse ? require("@/assets/images/logo-min.png") : require("@/assets/images/logo.png")
    }),
    collapse: computed(() => store.state.app.collapse)
})





const hasOnlyChild = (children) => {

    if (!children) { return false; }
    // 存储路由
    if (!children) { return false; }
    const childRouter = children.filter(item => {
        return item.hidden ? false : true;
    })

    // 只有一个子级路由
    if (childRouter.length === 1) {
        return true;
    }
    // 否则
    return false;
}

/**
 
  获取当前路由路径
 */
const currentPath = computed(
    () => path);


</script>




<style lang="less" scoped>
.aside-main {

    border-right: 1px solid #e4e7ed;
}

.aside-icon {}

.icon-main {
    margin-left: 29%;
}

#Vue-icon {
    width: 100px;
}

.menu-icon {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin: 0 10px 0 0;
}
</style>