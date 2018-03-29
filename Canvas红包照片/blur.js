var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var radius = 50;
var clippingRegion = {x: -1, y: -1, r: radius};
var leftMargin = 0, topMargin = 0;

var theAnimation = null;

image.src = "image.jpg";
image.onload = function(e){

    $("#blur-div").css("widht", canvasWidth+"px");
    $("#blur-div").css("height", canvasHeight+"px");

    $("#blur-image").css("widht", image.width+"px");
    $("#blur-image").css("height", image.height+"px");

    leftMargin = (image.width - canvas.width)/2;
    topMargin = (image.height - canvas.height)/2;
    $("#blur-image").css("left", String(-leftMargin)+"px");
    $("#blur-image").css("top", String(-topMargin)+"px");

    initCanvas();
};

/*初始化Canvas*/
function initCanvas() {
    clearInterval(theAnimation);

    var theLeft = leftMargin<0?-leftMargin:0;
    var theTop = topMargin<0?-topMargin:0;
    clippingRegion = {  x: Math.random()*(canvasWidth-radius*2-theLeft*2)+radius+theLeft,
                        y: Math.random()*(canvasHeight-radius*2-theTop*2)+radius+theTop,
                        r: radius};
    draw( image, clippingRegion );
};
function setClippingRegion( clippingRegion ) {
    context.beginPath();
    context.arc( clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false );
    context.clip();
}

function draw( image, clippingRegion ) {
    context.clearRect(0,0,canvas.width,canvas.height);

    // 将清晰地图像绘制到 canvas 上
    context.save();     //  保存 canvas 的当前状态
    setClippingRegion( clippingRegion );

    /*context.drawImage( image, leftMargin, topMargin, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);*/
    //  处理image比canvas尺寸小的情况
    context.drawImage(  image,
                        Math.max(leftMargin,0), Math.max(topMargin,0),
                        Math.min(canvas.width, image.width), Math.min(canvas.height, image.height),
                        leftMargin<0?-leftMargin:0, topMargin<0?-topMargin:0,
                        Math.min(canvas.width, image.width), Math.min(canvas.height, image.height));
    context.restore();
}

function reset() {
    initCanvas();
}

function show() {
    clearInterval(theAnimation);
    theAnimation = setInterval(function(){
        clippingRegion.r += 20;        //  图片对角线尺寸为1000
        if (clippingRegion.r > 2*Math.max(canvas.width,canvas.height)) {
            clearInterval(theAnimation);
        }
        draw( image, clippingRegion );
    },30);
}

canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
});