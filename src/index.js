import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import App,{WithWrapped} from './App';
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

    _bark(){
        console.log('barking');
    }
    _run(){
        console.log('running')
    }

    handleClickDog(){
        this._bark();
        this._run();
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
       // console.log(a);
        this.setState((prevState)=> {
            prevState.comments.push(a);    //删除以前一个数组中的 被删除的一个元素
            return {comments: prevState.comments}   //重新设定新的 comments
        })

    }

    _loadLocalStorage(){
        var arr=[];
        for(var i=0;i<localStorage.length;i++) {
            var sitename = localStorage.key(i);

            // 甄别属于输入框的 item的
            if((/Input-Comment/).test(sitename))    //检测key中是否存在我们需要的 Input类型的值
            {
                var siteurl= localStorage.getItem(sitename);
                // JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
               // var a= JSON.parse(siteurl);
                //  console.log( typeof(a));
                //  console.log(a);
                  arr=JSON.parse(siteurl);   //转换为数组

            }


        }
        return arr;
    }
    componentWillMount(){  //在挂在渲染之前 获取本地的 localStorage  然后添加到 状态的 comments数组 ，后面的渲染通过 WillUpdate 更新渲染

        this.setState({comments:this._loadLocalStorage()})

    }

    handleDelete(index){

        this.setState( (prevState)=> {
                prevState.comments.splice(index, 1);
                return {comments: prevState.comments}
            }
          )

    }


    render(){


        return(
            <div style={{border:'1px solid red',width:'300px'}}>
                <CommentInput
                    onHandleGetSubmit = {this.handleGetSubmit.bind(this)}
                />
                <CommentList  comments={this.state.comments}
                              onHandleDelete={ this.handleDelete.bind(this)}
                />
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
            timeDiff:''
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

    _getNowTime(){
        let t = new Date();
        var t0 = t.getFullYear();
        var t1= t.getMonth()+1;
        var t2= t.getDate();
        var t3= t.getHours();
        var t4= t.getMinutes();
        var t5= t.getSeconds();

        t1= t1<=9 ?'0'+t1:t1;
        t2= t2<=9 ?'0'+t2:t2;

        return t0+'-'+t1+'-'+t2+' '+t3+':'+t4+':'+t5;
    }

    handleSubmit(){


         let timeDiff = this._getNowTime();

        const  {name,comment} =this.state;

        if(name==='' || comment===''){
                alert(' 请输入非空的用户名或者评论内容 ');
                return;
        }

    //    console.log(timeDiff);  显示当前发布的时间
        if(this.props.onHandleGetSubmit){    //传入参数
              this.props.onHandleGetSubmit({name:name,comment:comment,time: timeDiff})
        }

        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。

        var local= JSON.parse(localStorage.getItem("Input-Comment")) || [];
        local.push({name:name,comment:comment,time: timeDiff});
        localStorage.setItem('Input-Comment',JSON.stringify( local ) );

        this.setState({
            comment:'' ,  //清控评论
            name:''
        });
        this.infous.focus();
    }

    componentDidMount(){
        this.infous.focus();     //渲染完毕后自动对焦
    }

    render(){


        return(
            <div  >
                <div className='commentinput'>
                    <span className='commentinput-name'>用户名：</span>
                    <div className='commentinput-filed'>
                        <input type='text'  ref={(infous)=>{this.infous=infous}} value={this.state.name}   onChange={this.handleGetName.bind(this)}/>
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

    handleDelete(index){

        this.props.onHandleDelete(index);
    }


    render(){

        const comments = this.props.comments;
       // console.log(comments);
        return(
            <div >
                {comments.map((comment,i)=>
                    <Comment  key={i}  index={i}
                              comment={comment}
                              onHandleDelete={ this.handleDelete.bind(this)}
                    />)
                }
            </div>
        )
    }
}

class Comment extends  Component{




    handleDelete(){
        let index = this.props.index;
        this.props.onHandleDelete(index);

        var local= JSON.parse(localStorage.getItem("Input-Comment")) || [];
       // console.log(local);
        //删除当前选中的的一行
        local.splice(index,1);
       // console.log(local);
        //输出到localStorage 中 保存
       localStorage.setItem('Input-Comment',JSON.stringify( local ) );



    }



    render(){
        const {comment} = this.props;
        return(
            <div>
                <div style={{position:'relative',margin:'3px',padding:'2px',fontSize:'18px',border:'1px dashed #FF802B'}}>
                    <span  style={{textAlign:'center' }}>{comment.name}</span> :
                    <p  style={{border:'1px solid pink',color:'blue',margin:'3px',wordBreak:'break-all'}}>
                        {comment.comment}
                    </p>
                    <p style={{padding:'0 0 0 40%',fontSize:'10px',margin:'0'}}> 时间戳：{comment.time}</p>
                    <div  style={{position:'absolute',right:'10px',top:'-1px',color:'red'}}>
                        <button style={{fontSize:'10px',outline:'none',borderRadius:'3px'}} onClick={this.handleDelete.bind(this)}> 删除 </button>
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

/*  组件的生命周期可分成三个状态：
   https://react.docschina.org/docs/react-component.html

        Mounting：已插入真实 DOM
        Updating：正在被重新渲染
        Unmounting：已移出真实 DOM
生命周期的方法有：

    componentWillMount 在渲染前调用,在客户端也在服务端。

    componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

    componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

    shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
    可以在你确认不需要更新组件时使用。

    componentWillUpdate 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

    componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

    componentWillUnmount 在组件从 DOM 中移除的时候立刻被调用。
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
);

/*
* 高阶组件
* */

localStorage.setItem('username','ReactTest');



class Welcome extends Component{
    render(){
        return(
            <div>
                welcome {this.props.username }
            </div>
        )

    }
}
//组件转换
 Welcome = WithWrapped(Welcome);

ReactDOM.render(
    <Welcome />,
    document.getElementById('welcome')
);













registerServiceWorker();
