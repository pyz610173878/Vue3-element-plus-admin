import { reactive } from "vue";
import { GetCategory } from "../api/info";

interface CategoryOption {
  category_name: string;
  children?: string;
  id: number;
  parent_id: null;
}

interface InfoData {
  category_options: CategoryOption[];
}

/** 自定义hook */
export const categoryHook = () => {
  const infoData: InfoData = reactive({
    category_options: [],
  });

  /** 获取分类 */
  const handlerGetCategory = () => {
    return GetCategory().then((response) => {
      infoData.category_options = response.data;
      console.log(infoData.category_options, "分类名称");
    });
  };

  return {
    infoData,
    handlerGetCategory,
  };
};

// 调用api接口
// 不是直接定义函数，而是使用export关键字导出函数
// 定义一个与接口数据类型一致的变量。一般情况用reactive方法，因为他对应的是复杂数据。
// 编写具体的函数使用箭头函数，使用接口，采用.then方法，把获取的数据赋值给新变量。
// 使用return 关键字返回方法与数据。
