<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
            <span>
                <span>
                    <span>123</span>123213

                    asdasdsa
                </span>
            </span>
            <div>123</div>
            <Rate :value="score" theme="yellow"></Rate>
            
        <Rate></Rate>
        {{ font_size }}

        {{ title }}
        </el-container>

        <p :style="{'font-size':'20px'}">123</p>
        </el-container>
    </div>
</template>
  

<script setup lang="ts">
import { defineProps, computed, ref} from 'vue';
import Rate from "../../components/Rate/Rate.vue";


let score = ref(5)
let font_size = ref(22)
const title = computed((score) => score - 22)
</script>

<style scoped lang="less">

</style>