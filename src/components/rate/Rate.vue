<template>
    <div>
        <span :style="rateStyle"></span>
    
<p></p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref} from 'vue';

const props = defineProps({
    value: {
        type: Number,
        default: 1,
    },
    theme: {
        type: String,
        default: 'orange',
    },
    size: {
        type: Number,
        default: 12,
    },
});


const rateText = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value));

const themeObj = {
    'black': '#000',
    'white': '#fff',
    'red': '#f5222d',
    'orange': '#fa541c',
    'yellow': '#fadb14',
    'green': '#73d13d',
    'blue': '#40a9ff',
};

const rateStyle = computed(() => {
    return {
        color: themeObj[props.theme],
        'font-size': `${props.size}px`,
    };
});
</script>

<style lang="scss">
/* 可以在这里添加一些基本的样式 */

.SK-rate {
    font-size: 22px;
}



</style>
