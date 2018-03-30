var WINDOW_WIDTH = 0;
var WINDOW_HEIGHT = 0;
var RADIUS = 0;             //  小球半径
var MARGIN_TOP = 0;        //  数字距离画布的上边距
var MARGIN_LEFT = 0;       //  第一个数字距离画布的左边距

/*const endTime = new Date(2018,3,1,12,12,12);*/        //  设置倒计时为一个固定时间
var endTime = new Date();
endTime.setTime( endTime.getTime() + 3600*1000 )    //  设置倒计时为一小时
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5","#09c","#a6c","#93c","#9c0","#690","#fb3","#f80","#f44","#c00"];

window.onload = function(){
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4/5 /108) - 1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurShowTimeSeconds();
    //  render( context );
    setInterval(function(){
        render( context );
        update();
    },50);
};

function getCurShowTimeSeconds (){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 );

    return  ret >= 0? ret : 0;
};

function update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours *3600)/60);
    var curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls( MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours/10));
        };
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours/10));
        };

        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        };
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        };

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        };
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        };

        curShowTimeSeconds = nextShowTimeSeconds;
    };

    updateBalls();
};

function updateBalls(){
    for(var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){     //  碰撞检测
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.6;        //  上弹  .6是摩擦系数
        }
    };

    var cnt = 0;
    for (var i = 0; i < balls.length; i++){         //  性能优化  删除数组中滚出界面的小球
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){     //  表示小球还在界面中
            balls[cnt++] = balls[i];        //  前cnt 个小球还在界面中 需要保留; cnt 后面的可以删掉啦
        }

    };

    while ( balls.length > cnt ){
        balls.pop();                        //  删除 cnt 后面的
    }
}

function addBalls(x,y,num){
    for(var i = 0; i < digit[num].length; i++){
        for(var j = 0; j < digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                var aBall = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),     //  x y 表示小球坐标
                    g: 1.5+Math.random(),       //  小球加速度 1.5---2.5 随机
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4,  //  x方向速度   若 Math.ceil(Math.random()*1000) 为偶数则 vx 为4; 否则 vx 为 -4
                    vy: -5,     //  y 方向速度 上抛效果
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall );
            }
        };
    };
};

function render (cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt( curShowTimeSeconds / 3600 );
    var minutes = parseInt( (curShowTimeSeconds-hours*3600) / 60 );
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt );    //  10表示冒号所在的索引;
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt );
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt );
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt );
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt );
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt );

    for (var i = 0; i < balls.length; i++){     //  绘制掉落的小球
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
};

function renderDigit ( x, y, num, cxt ){
    cxt.fillStyle = "rgb(0, 102, 153)";

    for (var i = 0; i < digit[num].length; i++){
        for (var j = 0; j < digit[num][i].length; j++){
            if (digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI );
                cxt.closePath();

                cxt.fill();
            };
        };
    };
};