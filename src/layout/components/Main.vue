<template>
    <div id="main-content">
        <router-view />
        
    </div>
</template>
  
<script setup lang="ts">
</script>
<style lang="less" scoped>
#main-content {
    box-sizing: border-box;
    background-color: #ffffff; // 背景色
    padding: 20px; // 内边距（4个边都为20px）
    min-height: 100%; // 高度
    border-radius: 6px;
    border: 1px solid  #e4e7ed;
    overflow: hidden;
    box-shadow: 0 0 12px #0000000d;
}
</style>