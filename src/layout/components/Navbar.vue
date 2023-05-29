
<template>
    <div class="navbar">
        <a href="" class="navbar_svg">
            <Hamburger></Hamburger>
        </a>
                                                                                                            </el-dropdown> -->
        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img src="./assets/WeChat Image_20230311192007.jpg" alt="" class="user-avatar">
                    <span></span>
                </div>

                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                        <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                            <el-dropdown-item>Github</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                            <el-dropdown-item>Docs</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                            <el-dropdown-item>Log Out</el-dropdown-item>
                        </a>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup>



// 在组合式中，异步函数如何增加。
</script>



<style scoped lang="less">
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    align-items: center;
}

.example-showcase .el-dropdown-links {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    // background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    // border-style: solid;
    // 边框颜色
    .navbar_svg {
        position: absolute;
        padding: 15px 15px;
        border: black 1px;
    }
    .navbar_svg:hover{
        color: black;
        border-color: red;
        
    }

    // 右边个人信息
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        // &:focus {
        //     outline: none;
        // }

        // .right-menu-item {
        //     display: inline-block;
        //     padding: 0 8px;
        //     height: 100%;
        //     font-size: 18px;
        //     color: #5a5e66;
        //     vertical-align: text-bottom;

        //     &.hover-effect {
        //         cursor: pointer;
        //         transition: background .3s;

        //         &:hover {
        //             background: rgba(0, 0, 0, .025)
        //         }
        //     }
        // }

        // 个人中心容器
        .avatar-container {
            margin-right: 15px;
            padding-top: 5px;
        }

        .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }
    }
}
</style>