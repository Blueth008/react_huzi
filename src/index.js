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
            name:'',
            comment:'',
            comments:[]
        }
    }


    handleGetName(n){
        this.setState({
            name:n
        })
    }
    handleGetComment(c){
        this.setState({
            comment:c
        })
    }
    handleGetSubmit(){

        const  {name,comment} = this.state;

        this.setState((prevState)=> {
            prevState.comments.push({name:name,comment:comment});
            return {comments: prevState.comments}
        });
        //清空评论
        this.state.name='';
        this.state.comment='';

    }

    render(){


        return(
            <div style={{border:'1px solid red',width:'300px'}}>
                <CommentInput
                    filename={this.state.name}
                    filecomment={this.state.comment}
                    onHandleGetName={this.handleGetName.bind(this)}
                    onHandleGetComment={this.handleGetComment.bind(this)}
                    onHandleGetSubmit = {this.handleGetSubmit.bind(this)}
                />
                <CommentList  comments={this.state.comments} />
            </div>
        )
    }
}


class   CommentInput extends  Component{


    //传递 底层的数据到上层进行分析
    handleGetName(e){
        this.props.onHandleGetName(e.target.value)
    }

    handleGetComments(e){
        this.props.onHandleGetComment(e.target.value)
    }

    handleSubmit(){
        if(this.props.onHandleGetSubmit){
            this.props.onHandleGetSubmit()
        }

    }

    render(){

        return(
            <div  >
                <div className='commentinput'>
                    <span className='commentinput-name'>用户名：</span>
                    <div className='commentinput-filed'>
                        <input type='text'  value={this.props.filename}   onChange={this.handleGetName.bind(this)}/>
                    </div>
                </div>
                <div className='commentinput'>
                    <span className='commentinput-name'>评论内容：</span>
                    <div  className='commentinput-filed'>

                        <textarea className='content'  value={  this.props.filecomment }   onChange={this.handleGetComments.bind(this)} />
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



registerServiceWorker();
