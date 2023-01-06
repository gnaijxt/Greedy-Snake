class Snake{
    //表示蛇头的元素
    head:HTMLElement;

    //蛇的身体（包括蛇头）
    bodies:HTMLCollection;

    //获取蛇的容器
    element:HTMLElement;

    constructor(){
        this.element=document.getElementById('snake')!;
        this.head=document.querySelector('#snake>div') as HTMLElement;
        this.bodies=document.getElementById('snake')!.getElementsByTagName('div');
    }

    //获取蛇的坐标（蛇头的坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value:number){
        //如果新值与旧值相同，则不需要修改
        if(this.X===value){
            return;
        }

        //X值的合法范围是0-290之间
        if(value<0 || value>290){
            //进入判断，说明蛇撞墙了
            throw new Error('蛇撞墙了！')
        }

        //蛇不能掉头，即当蛇向左移动时，不能再向右移动，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft==value){
            //如果发生了掉头就让蛇往反方向继续移动
            if(value>this.X){
                value=this.X-10;
            }else{
                value=this.X+10;
            }
        }
        
        //移动身体
        this.moveBody();

        this.head.style.left=value+'px';
        
        //检查有没有撞到自己
        this.checkHeadBody();
    }
    set Y(value:number){
        if(this.Y===value){
            return;
        }

        //Y值的合法范围是0-290之间
        if(value<0 || value>290){
            //进入判断，说明蛇撞墙了
            throw new Error('蛇撞墙了！')
        }

         //蛇不能掉头，即当蛇向上移动时，不能再向下移动，反之亦然
         if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop==value){
            //如果发生了掉头就让蛇往反方向继续移动
            if(value>this.Y){
                value=this.Y-10;
            }else{
                value=this.Y+10;
            }
        }

        //移动身体
        this.moveBody();

        this.head.style.top=value+'px';

        //检查有没有撞到自己
        this.checkHeadBody();
    }

    //设置蛇增加身体的方法
    addBody(){
        //向element中添加一个div
        this.element.insertAdjacentHTML('beforeend','<div></div>');
    }

    //添加一个蛇身体移动的方法
    moveBody(){
        //将后边身体的位置设置为前边身体的位置
        //遍历获取所有的身体
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前边身体的位置
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;

            //将值设置为当前身体上
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }

    //检查头和身体有没有相撞
    checkHeadBody(){
        //获取所有身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement;
            if(this.X==bd.offsetLeft && this.Y==bd.offsetTop){
                //进入判断说明头撞到了身体，游戏结束
                throw new Error('撞到自己了！')
            }
        }
    }
}

export default Snake;