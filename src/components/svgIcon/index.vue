<template>
    <svg aria-hidden="true" class="svg-class" :class="svgClassName">
        <use :xlink:href="symbolId" :fill="color"/>
    </svg>
</template>
<script>
import {ref, computed } from "vue";
export default {
    name: "SvgIcon",
    props: {
        name: 'SvgIcon',
            prefix: {
                type: String,
                default: 'icon',
            },
            name: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                default: 'currentColor',
            },
            className :{
                type: String,
                default:"menu-icon"
            }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)

        const svgClassName = ref(props.className)
        const svgModules = import.meta.globEager('./icon/*.svg')
        
        const svgFiles = Object.keys(svgModules).map(filePath => svgModules[filePath])
        return {
            symbolId,
            svgFiles,
            svgClassName
        }

    }
}


</script>

<style lang="scss">
.svg-class {
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>