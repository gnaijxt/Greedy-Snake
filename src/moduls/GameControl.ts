//引入其他类
import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import { isJSDocThisTag } from "../../node_modules/typescript/lib/typescript";

//游戏控制类，控制其他所有类
class GameControl{
    //定义三个属性
    snake:Snake;
    scorePanel:ScorePanel;
    food:Food;

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction:String='';

    //创建一个属性用来记录游戏是否结束
    isLive=true;

    constructor(){
        this.snake=new Snake();
        this.scorePanel=new ScorePanel();
        this.food=new Food();
        this.init();
    }

    //游戏初始化方法，调用后游戏即开始
    init(){
        //绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandle.bind(this))
        //调用run方法，使蛇移动
        this.run();
    }

    //创建一个键盘按下的响应函数
    keydownHandle(event:KeyboardEvent){
        //需要检查用户是否按了正确的按键，然后修改的direction属性
        this.direction=event.key;
    }

    //创建一个控制蛇移动的方法
    run(){
        //根据方向（direction）来使蛇的位置改变
        //获取蛇现在的坐标
        let x=this.snake.X;
        let y=this.snake.Y;

        //根据按键方向来修改x和y
        switch(this.direction){
            case 'ArrowUp':
            case 'Up':
                y-=10;
                break;

            case 'ArrowDown':
            case 'Down':
                y+=10;
                break;

            case 'ArrowLeft':
            case 'Left':
                x-=10;
                break;

            case 'ArrowRight':
            case 'Right':
                x+=10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(x,y);

        //修改蛇的x和y值
        try {
            this.snake.X=x;
            this.snake.Y=y;
        } catch (e) {
            alert((e as any).message+' GAME OVER!');
            this.isLive=false;
        }

        //开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
    }

    //定义一个方法，检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X===this.food.X && Y===this.food.Y){
            //吃到食物后食物的位置要重置
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;