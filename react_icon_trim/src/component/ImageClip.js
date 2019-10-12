import React from 'react';

class ImageClip extends React.Component {
    constructor(props) {
        super(props);

        //  初始化 canvas 和 mark 的大小和位置
        let winW = document.documentElement.clientWidth,
            ratio = window.ratio;
        let W = winW - .4 * ratio,
            H = W,
            MW = W * .7,            //  计算遮罩层尺寸大小
            MH = MW,
            ML = (W - MW) / 2,      //  计算遮罩层水平垂直居中
            MT = (H - MH) / 2;
        this.state = {
            W, H, MW, MH, ML, MT,
            S: false,               //  控制遮罩层显示隐藏
        };
    }

    render() {
        let { W, H, MW, MH, ML, MT, S } = this.state;

        return <div className="clipImageBox">
            <div className="canvasBoxDiv"
                onTouchStart={ev => {
                    let point = ev.changedTouches[0];
                    this.startX = point.clientX;
                    this.startY = point.clientY;
                }}
                onTouchMove={ev => {
                    let point = ev.changedTouches[0];
                    let changeX = point.clientX - this.startX,
                        changeY = point.clientY - this.startY;
                    if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
                        this.IL += changeX;
                        this.IT += changeY;
                        this.drawImage();
                        this.startX = point.clientX;
                        this.startY = point.clientY;
                    }
                }}
            >
                {/* x 代表当前元素，挂载到 当前实例的 _canvas 上 */}
                <canvas className="canvasBox"
                    ref={x => this._canvas = x}
                    width={W}
                    height={H}
                ></canvas>
                <div className="mark"
                    style={{
                        width: MW + 'px',
                        height: MH + 'px',
                        left: ML + 'px',
                        top: MT + 'px',
                        display: S ? 'block' : 'none'
                    }}
                ></div>
            </div>

            <div className="buttonBox">
                <input type="file" accept="image/*" className="file"
                    ref={x => this._file = x} 
                    onChange={this.fileChange}/>
                <button className="choose"
                    onClick={ev => {
                        this._file.click();     // 通过 ref 获取 file 元素，并在点击按钮时触发 file 点击事件
                    }}
                >选择图片</button>
                <button
                    onClick={ev => {
                        if (!this.img) return;
                        this.IW += 10;
                        this.IH += 10;
                        this.drawImage();
                    }}
                >放大</button>
                <button
                    onClick={ev => {
                        if (!this.img) return;
                        this.IW -= 10;
                        this.IH -= 10;
                        this.drawImage();
                    }}
                >缩小</button>
                <button className="submit"
                    onClick={ev => {
                        if (!this.img) return;
                        let imagedata = this.ctx.getImageData(ML, MT, MW, MH),
                            canvas2 = document.createElement('canvas'),
                            ctx2 = canvas2.getContext('2d');
                        canvas2.width = MW;
                        canvas2.height = MH;
                        ctx2.putImageData(imagedata, 0, 0, 0, 0, MW, MH);
                        //  canvas2.toDataURL('image/png');
                        this.props.change(canvas2.toDataURL('image/png'));

                    }}
                >保存图片</button>
            </div>
        </div>;
    }

    //  获取上传的图片，最后把图片渲染到 canvas 中
    fileChange = () => {
        this.setState({ S: true });
        let picOM = this._file.files[0];
        if (!picOM) return;
        //  从读取的文件对象中读取出图片的数据（获取到当前图片的 base64 码）
        let fileReade = new FileReader();
        fileReade.readAsDataURL(picOM);
        fileReade.onload = ev => {
            //  创建一张图片
            this.img = new Image();
            this.img.src = ev.target.result;

            this.img.onload = () => {
                let n = 1,
                    { W, H } = this.state;
                this.IW = this.img.width;
                this.IH = this.img.height;
                if (this.IW > this.IH) {    //  图片宽度大于高度的情况
                    n = this.IW / W;        //  计算图片缩放比例
                    this.IW = W;
                    this.IH = this.IH / n;
                } else {
                    n = this.IH / H;
                    this.IH = H;
                    this.IW = this.IW / n;
                }
                //  计算图片在 canvas 垂直水平居中的距离
                this.IL = (W - this.IW) / 2;
                this.IT = (H - this.IH) / 2;

                //  将图片绘制到 canvas 中
                this.drawImage();
            }
        }
    }

    drawImage = () => {
        let { W, H } = this.state;

        this.ctx = this._canvas.getContext('2d');
        this.ctx.clearRect(0, 0, W, H);         //  绘制前先清空画布
        // this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);     //  原图大小绘制
        this.ctx.drawImage(this.img, this.IL, this.IT, this.IW, this.IH);        //  按照比例绘制
    }
}

export default ImageClip
