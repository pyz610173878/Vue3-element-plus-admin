<template>
    <div class="container">
    </div>
</template>
<script setup lang="ts">
</script>


<style scoped lang="scss">
@import '../../styles/minxin.scss';

// 调用

// 生成.el-container
@include b(container) {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;

// 生成 .el-container.is-vertical
    @include when(vertical) {
        flex-direction: column;
    }
}





</style>