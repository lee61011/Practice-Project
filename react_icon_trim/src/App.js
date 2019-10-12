import React from 'react';
import ImageClip from './component/ImageClip'
// import './static/reset.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    
    //  初始化状态
    this.state = {
      stage: 0,
      pic: ''
    }
  }

  render() {
    let {stage, pic} = this.state;

    return (
      <main className="mainBox">
        <div className="baseInfo" style={{
          display: stage === 0 ? 'block' : 'none'
        }}>
          <div className="imgBox"
            onClick={en => {
              this.setState({stage: 1});
            }}>
            <img src={pic} alt="" />
          </div>
          <div className="desc">
            <p>姓名：张三</p>
            <p>性别：男</p>
            <p>微信：12345678</p>
            <p>... ...</p>
          </div>
        </div>

        <div className="handleBox" style={{
          display: stage === 0 ? 'none' : 'block'
        }}>
          <div className="returnBtn">
            <span onClick={ev => {
              this.setState({stage: 0});
            }}>返回</span>
          </div>
          <ImageClip change={this.change}></ImageClip>
        </div>
      </main>
    );
  }

  change = imagedata => {
    this.setState({ 
      stage: 0,
      pic: imagedata 
    });
  }
}

export default App;
