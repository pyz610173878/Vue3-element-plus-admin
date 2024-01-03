/**
 * @param { String } value 时间的值
 * @param { String }  type
 * @param { Boolean }  br true换行、false默认
 * @param { String }  conn 任意字符
 * @returns 日期格式化
 */
export function getDate(params){
    const new_date = params.value ? new Date(params.value) : new Date();
    let year = new_date.getFullYear();       //年
    let month = new_date.getMonth() + 1;     //月
    let day = new_date.getDate();            //日
    let hh = new_date.getHours();            //时
    let mm = new_date.getMinutes();          //分
    let ss = new_date.getSeconds();          //分
    if(month < 10) { month = `0${month}`; }
    if(day < 10) { day = `0${day}`; }
    if(hh < 10) { hh = `0${hh}`; }
    if(mm < 10) { mm = `0${mm}`; }
    if(ss < 10) { ss = `0${ss}`; }
    // 连接符
    const conn = params.connDate || "-";
    // 格式化
    const br = params.br ? "<br />" : " ";
    const date = `${year}${conn}${month}${conn}${day}`;
    const time = `${hh}:${mm}:${ss}`;
    // 仅日期
    if(params.type === "date") { return date; }
    // 仅时间
    if(params.type === "time") { return time; }
    // 整体
    return `${date}${br}${time}`;
}

/**
 * @param { Function } fun 执行的函数
 * @param { Number } time 延时执行时间，默认500毫秒
 * @returns 防抖函数
 */
 export function debounce(fun, time = 500) {
    let timer;
    return function() {
      let args = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fun.apply(this, args)
      }, time)
    }
}