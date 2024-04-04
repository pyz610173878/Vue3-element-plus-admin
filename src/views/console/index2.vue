<template>


<div>123</div>




    <input v-model="title" @keyup.enter="init">
    <template v-for="datas in dataes.Todo">
      {{ datas.message }}
    </template>
    <input ref="myInput" @click="Change_color">

    <div class="test">123</div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  
  const title = ref('123');
  const myInput = ref(''); // 创建一个 ref 对象
  

  const color = ref('black')
  const status = ref(true)
  console.log(title);

interface Data {
  color: string
  status: boolean
}

const data = reactive<Data>({
  color: 'black',
  status: true
})
  

  const Change_color = () => {
    debugger


    
    status.value = !status.value
    console.log(status);
    
    color.value = status.value ? "blue":"red"
  }
  // 点击输入框变颜色，再次点击换另外一个颜色
  
  const dataes = reactive({
    Todo: [
      { message: '123' },
      { message: '123' },
      { message: '123' },
      { message: '123' }
    ]
  });
  
  const init = () => {
    // 1. 添加一个div盒子，把内容放进去。清空title的值
    title.value = '';
  };
  
  onMounted(() => {
    myInput
    
  });
  </script>


<style scoped>

.test {
  color:v-bind(color);
}
</style>
  