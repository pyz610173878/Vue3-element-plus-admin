<template>
    <div class="header">
        <div class="header-left">
            <span class="menu-btn">
                <svg-icon name="menuBtn" class="menu" @click="switchAside"></svg-icon>
            </span>

        </div>
        <div class="header-right">
            <img src="../../assets/avatar-ea67286d.gif" alt="610173878@qq.com" class="header-avatar">
            <span class="name">{{ username }}</span>
            <span class="logout" @click="handlerLogout">
                <svg-icon name="logout" class="icon-logout"></svg-icon>
            </span>
        </div>
    </div>
</template>
  
<script>
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getToken } from "../../utils/cookies";
export default {
    name: "Header",
    components: {},
    props: {},
    setup() {
        // 获取实例上下文
        const { proxy } = getCurrentInstance();
        // Vuex
        const store = useStore();
        const tokens = getToken()
        // 引入router
        const { replace } = useRouter();
        // 菜单按钮
        const switchAside = (() => {
            store.commit('app/SET_COLLAPSE');
        })
        // 用户名
        const username = ref(store.state.app.username);
        // 登出
        const handlerLogout = (() => {
            proxy.$confirm('确认退出管理后台', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('app/logoutAction').then(response => {
                    ElMessage({
                        message: response.message,
                        type: "success"
                    })
                    // 刷新页面清除数据
                    location.reload();
                    replace({
                        name: "Login"
                    })
                })
            }).catch(error => { });
        })

        return {
            switchAside,
            handlerLogout,
            username
        }

    }
};
</script>
  

<style lang="less" scoped>
.header {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.menu-btn {
    cursor: pointer;
}


// 头部左边

.header-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
}



// 个人头像
.header-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    padding-right: 20px;
}

// 注销

.logout {
    cursor: pointer;
}

.icon-logout {
    font-size: 24px;
}
</style>