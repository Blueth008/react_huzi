import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;


 export function WithWrapped (WrappedComponent) {
    class NewComponent extends Component {
        constructor(props){
            super(props);
            this.state={
                username:''
            }
        }

        componentWillMount(){
            let username = window.localStorage.getItem('username');
            this.setState({
                username:username
            })
        }

        render(){
            return <WrappedComponent username={this.state.username}/>
        }
    }

    return NewComponent;
}


// export {WithWrapped}
/**
 es6中export和export default的区别
 export与export default均可用于导出常量、函数、文件、模块
 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用

 在一个文件或模块中，export、import可以有多个，export default仅有一个

 通过export方式导出，在导入时要加{ }，export default则不需要
 其实很多时候export与export default可以实现同样的目的，只是用法有些区别。注意第四条，通过export方式导出，在导入时要加{ }，export default则不需要。使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名。

 export { myFunction }; // 导出一个函数声明
 * */