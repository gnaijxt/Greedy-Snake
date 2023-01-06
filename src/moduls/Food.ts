//定义食物类
class Food{
    //定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor(){
        //变量后使用！，表示类型推断排除null、undefined
        //获取食物属性
        this.element=document.getElementById('food')!;
    }
     //获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    //修改食物的位置
    change(){
        //生成随机位置
        let top=Math.round(Math.random()*29)*10;
        let left=Math.round(Math.random()*29)*10;
        this.element.style.left=left+'px';
        this.element.style.top=top+'px';
    }
}

export default Food;