// const globalData = {
//     whether: [
//         { value: "1", label: "是" },
//         { value: "0", label: "否" },
//     ]
// }
// export default globalData;


function instanceof1(Obj, yx) {
    // 第一个是实例对象
    // 第二个是原型
    let pro = Object.getPrototypeOf(Obj)

    while (pro) {
        if (pro === yx.prototype) {
            return true
        }
        pro = Object.getPrototypeOf(pro)
        // 因为是原型链所以层层获取
    }
    return false

}
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);


console.log(instanceof1(auto, Car));




function new1(yx, ...args) {
    var Obj = Object.create(yx.prototype)

    var result = Object.apply(Obj, ...args)

    return result instanceof Object ? result : Obj
}


var color = "blue";
function changeColor() {
    let anotherColor = "red";
    function swapColors() {
        let tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        // 这里可以访问 color、anotherColor 和 tempColor 
    }
    // 这里可以访问 color 和 anotherColor，但访问不到 tempColor 
    swapColors();
}
// 这里只能访问 color 
changeColor();