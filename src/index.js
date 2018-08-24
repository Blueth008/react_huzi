import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


/**
 * 下面是在http://huziketang.mangojuice.top/books/react/lesson9 开始的练习
 *
 */


/**lesson 9的事件监听的练习
*  不能摸的狗 ： 有一只狗，不允许别人摸它，一旦摸它就会叫，然后就跑了。

 完成 Dog 组件，当用户点击的时候会执行自身的 bark 和 run 方法。
 * */

class Dog extends  Component {

    bark(){
        console.log('barking');
    }
    run(){
        console.log('running')
    }

    handleClickDog(){
        this.bark();
        this.run();
    }

    render(){
        return (
            <div onClick={this.handleClickDog.bind(this)} >
                Dog
            </div>
        )
    }
}

class Dog2 extends  Component {
    constructor(props){
        super(props);
        this.state={
            barking:false,
            running:false
        }
    }


    bark(){
        this.setState({
            barking:true
        });
        console.log('barking');
    }
    run(){
        this.setState({
            running:true
        });
        console.log('running')
    }

    handleClickDog(){
        this.bark();
        this.run();
// 使用es6的箭头函数 （）=>{ }   如果有返回值的话  ()=>({ 返回值 })
        setTimeout(()=>{
            this.setState((prevState)=>({
                barking:!prevState.barking,
                running:!prevState.running
            }));
            console.log('no barking and running')
        },3000)

    }

    render(){
        const  {barking,running} = this.state;   // es6的 写法 相等于 barking = this.state.barking ,running =this.state.running
        return (
            <div onClick={this.handleClickDog.bind(this)} >
                Dog is { barking && running === true ? ' Running and  Barking' :' Stopping '}
            </div>
        )
    }
}

ReactDOM.render(
    <Dog2 />,
    document.getElementById('dog')
);

// 数据的渲染 主要针对数组的数据输出



class Lesson extends  Component{


    render(){

        return(
            <div>
                { this.props.lessons.map( (item,i) => <LessonList  key={i} num={i} lesson={item} /> )   }
            </div>
        )

    }


}

class LessonList extends Component{

    handleShowContent(){
        console.log((this.props.num+1)+' : '+ this.props.lesson.title +' - ' + this.props.lesson.description )
    }

    render(){
        const {lesson} = this.props;
        return(
            <div style={{padding:'0 10px',color: '#78c9fc'}}>
                <h3 onClick={this.handleShowContent.bind(this)}>{ lesson.title}</h3>
                <p>{lesson.description }</p>
            </div>
        )
    }

}
const lessons = [
    { title: 'Lesson 1: title', description: 'Lesson 1: description' },
    { title: 'Lesson 2: title', description: 'Lesson 2: description' },
    { title: 'Lesson 3: title', description: 'Lesson 3: description' },
    { title: 'Lesson 4: title', description: 'Lesson 4: description' }

];
ReactDOM.render(
    <Lesson  lessons={lessons}/>,
    document.getElementById('lesson')
);


/**
 * 实战做一个评论的框架
 *  http://huziketang.com/books/react/lesson14
 * */


class  CommentAPP extends  Component{

    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    }

    handleGetSubmit(a){

        console.log(a);

        this.setState((prevState)=> {
            prevState.comments.push(a);
            return {comments: prevState.comments}
        })

    }

    render(){


        return(
            <div style={{border:'1px solid red',width:'300px'}}>
                <CommentInput
                    onHandleGetSubmit = {this.handleGetSubmit.bind(this)}
                />
                <CommentList  comments={this.state.comments} />
            </div>
        )
    }
}


class  CommentInput extends  Component{
    constructor(props) {
        super(props);
        this.state={
            name:'',
            comment:'',
        }
    }


    handleGetName(e){
        this.setState({
            name:e.target.value
        })
    }

    handleGetComments(e){
        this.setState({
            comment:e.target.value
        })
    }

    handleSubmit(){
        if(this.props.onHandleGetSubmit){
            const  {name,comment} =this.state;
            this.props.onHandleGetSubmit({name:name,comment:comment })
        }
        this.setState({
            comment:'' ,  //清控评论
            name:''
        })

    }

    render(){


        return(
            <div  >
                <div className='commentinput'>
                    <span className='commentinput-name'>用户名：</span>
                    <div className='commentinput-filed'>
                        <input type='text'  value={this.state.name}   onChange={this.handleGetName.bind(this)}/>
                    </div>
                </div>
                <div className='commentinput'>
                    <span className='commentinput-name'>评论内容：</span>
                    <div  className='commentinput-filed'>

                        <textarea className='content'  value={  this.state.comment}   onChange={this.handleGetComments.bind(this)} />
                    </div>
                </div>
                <div> <button className='sbutton' onClick={this.handleSubmit.bind(this)}> 发布</button>  </div>

            </div>
        )
    }
}


class CommentList extends  Component{

    render(){

        const comments = this.props.comments;
        console.log(comments);
        return(
            <div >
                {comments.map((comment,i)=><Comment  key={i}  comment={comment} />) }
            </div>
        )
    }
}

class Comment extends  Component{


    render(){
        const {comment} = this.props;
        return(
            <div>
                <div>
                    <span  style={{textAlign:'center', display: 'inline-block' }}>{comment.name}</span>:
                    <div  style={{display: 'inline-block',color:'blue'}}>
                        {comment.comment}
                    </div>
                </div>
            </div>

        )
    }
}



ReactDOM.render(
    <CommentAPP />,
    document.getElementById('comment')
);

//Step 2
// lesson 9百分比转换器
/*
* 讨论区 (71)
做一个百分比换算器，需要你完成三个组件：

<Input />：封装了原生的<input />，可以输入任意数字

<PercentageShower />：实时 显示 <Input /> 中的数字内容，但是需要把它转换成百分比，例如 <Input /> 输入的是 0.1，那么就要显示 10.00%，保留两位小数。

<PercentageApp />：组合上述两个组件。
* */


class Input extends  Component{

    handleChange(e){
       this.props.onHandleChange(e.target.value)
    }

     render(){
         return(
             <input type='text'  value={this.props.input} onChange={this.handleChange.bind(this)}/>
         )
     }
}

class PercentageShower extends Component{


    render(){
        if(!isNaN(this.props.number)){
        return(
             <p>输入的百分数是： { this.props.number+(this.props.number===''?'':'%') }</p>
        )}
        else {
            return   ( <p>请输入一个正确是数字</p> )
        }
    }
}


class PercentageApp extends  Component{
    constructor(props){
        super(props);
        this.state={
            percent:'',
            number:''
        }
    }

    handleChange(num){
        if(!isNaN(num)){
            const  a = parseFloat(num).toFixed(2);   //将字符串转为 float 然后保留 2 位数
            this.setState({
                percent:num,
                number:a
            })
        }

    }

    render(){
        return(
            <div>
                <Input
                    input={this.state.percent}
                    onHandleChange={this.handleChange.bind(this)}
            />
                <PercentageShower number={this.state.number}/>
            </div>
        )
    }
}

ReactDOM.render(
    <PercentageApp/>,
    document.getElementById('percent')
);

/*  挂在阶段的生命周期
 componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
 componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
 componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。


 shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
componentWillUpdate()：组件开始重新渲染之前调用。
componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。
* */

//时间

class Clock extends Component{
    constructor(props){
        super(props);
        this.state={
            time: new Date()
        }
    }

    componentWillMount(){
        this.timer = setInterval(
            () =>{ this.setState({time:new Date()})}
            ,1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(){
        return(
            <h3>现在的时间是：{this.state.time.toLocaleTimeString()}</h3>
        )
    }
}



ReactDOM.render(
    <Clock />,
    document.getElementById('clock')
);

//ref的使用 打印当前文本的行高
 class Post extends  Component {

     handleGetWidth(){
         console.log(this.p.clientWidth)
     }

     render(){
         return(
             <p onClick={this.handleGetWidth.bind(this) } ref={(p)=>{this.p=p}}>{this.props.content}</p>
         )
     }
 }

ReactDOM.render(
    <Post content='ddddddddddddddd'/>,
    document.getElementById('refwd')
);

 //props.children 的使用

class BlackBlockContainer extends Component{


    render(){
        return(
           <div >
               {this.props.children.map( (el,i)=><div key={i} className='containerborder'>{el}</div>    )}
           </div>

        )
    }
}

class BlackContainer extends  Component{

    render(){
        return(
            <BlackBlockContainer>
                <div className='name'> My name : Lucy  </div>
                <p className='age'>
                    My age :<span>12</span>
                </p>
            </BlackBlockContainer>
        )
    }
}

ReactDOM.render(
    <BlackContainer/>,
    document.getElementById('propschildren')
)
registerServiceWorker();
