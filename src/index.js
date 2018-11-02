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

/*
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
*/
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
               {this.props.children.map( (el,i)=><div key={i} className='containerborder'>{i}{el}</div>    )}
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


//状态提升 react官方

function BoilingVerdict(props) {
    if(( props.scale==='c'&&props.celsius >= 100)||(props.scale==='f'&&props.celsius >= 212) ){
        return <p>水会被烧开</p>
    }else return <p>水不会被烧开</p>
}

const scaleNames ={
    c:'Celsius',
    f:'Fahrenheit'
};

function toCelsius(fahrenheit ) {
     return (fahrenheit-32)*5/9;
}
function toFahrenheit(celsius) {
    return (celsius*9/5)+32;
}

class Temperature extends React.Component {

    constructor(props){
        super(props);


    }

    handleChange(e){
        this.props.onHandleChange(e.target.value);

    }

    render(){

        let scale = this.props.scale;


        return(

            <fieldset>
                <legend>输入一个{scaleNames[scale]}温度</legend>
                <input value={this.props.temperature} onChange={this.handleChange.bind(this)} />
                <BoilingVerdict  scale={this.props.scale}  celsius={parseFloat(this.props.temperature)}/>
            </fieldset>

        )


    }
}

class Calculator extends React.Component{

    constructor(props){
        super(props);
        this.state={
            temperature:'',
            scale:'c'
        }
    }

    HandleChangeC(value){
        this.setState({
            scale:'c',temperature:value
        })

    }
    HandleChangeF(value){
        this.setState({
            scale:'f',temperature:value
        })

    }


    render()   {
        const {scale,temperature} = this.state;
//简单转换
        const celsius = scale ==='f'? (temperature-32)/1.8: temperature;
        const fahrenheit = scale ==='c'?(temperature ===''? temperature:(temperature*1.8+32)):temperature;

        /* C 和 F 是 固定的提示显示   change的 c 和 f 是告诉主键我们改变的是那个 然后转换另一个  */
        return (
            <div>
              <Temperature scale='c'  temperature={celsius} onHandleChange={this.HandleChangeC.bind(this)} />
              <Temperature scale='f'  temperature={fahrenheit} onHandleChange={this.HandleChangeF.bind(this)} />
               <p>在Fahrenheit中 需要再次分别在底层划分 C和F的区别</p>
            </div>
        )
    }
}



ReactDOM.render(
    <Calculator/>,
    document.getElementById('stateup')

);
//  https://react.docschina.org/docs/thinking-in-react.html


class SearchBar extends React.Component{


    handleChangeInput(e){
        this.props.onHandleChangeInput(e.target.value);

    }
    handleChangeCheck(e){
        this.props.onHandleChangeCheck(e.target.checked)
    }

    render(){
        return(
            <form>
                <input type='text' value={this.props.filterText}  onChange={this.handleChangeInput.bind(this)} placeholder="Search..."/><br/>
                <input type='checkbox' value="" onChange={this.handleChangeCheck.bind(this)}  />Only show products in stock
            </form>
        )
    }
}

class ProductCategoryRow extends React.Component{


    render(){
        return (
            <tr>
                <td colSpan='2'>
                    <strong>    {this.props.P.category}</strong>
                    </td>
            </tr>

        )

    }
}

class ProductRow extends React.Component{


    render(){

        //判断 缺货
        var name = this.props.P.stocked ? this.props.P.name:
            <span style={{color:"red"}}>{this.props.P.name}</span>
        return(
            <tr>
                <td> {name} </td>
                <td> {this.props.P.price} </td>
            </tr>

        )
    }
}


class ProductsTable extends  React.Component{



    render(){

        const {products,filterText,inStockOnly} = this.props;
        var lastCategory = null;
        var row=[];
        products.forEach(function (product) {

            if(product.name.indexOf(filterText)===-1 || (!product.stocked && inStockOnly)){
                return;   //过滤 input 的输入词:没有找到 返回空
            }

            if(product.category !== lastCategory){
                row.push(<ProductCategoryRow P={product} key={product.category}/>)
            }
            row.push(<ProductRow P={product} key={product.name}/>)
            lastCategory = product.category;

        });



        return(
            <table style={{width:'230px',textAlign:'center'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                 <tbody>
                 {row}
                 </tbody>

            </table>

        )

    }
}


class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            filterText:'',
            inStockOnly:false
        }
    }


    handleChange(val){
       this.setState({
           filterText:val
       })
    }
    handleChangeCheck(chk){
        this.setState({
            inStockOnly:chk
        })
    }


    render(){
        return(
            <div style={{border:"1px solid orange",width:'250px',padding:'10px'}}>
                <SearchBar
                    filterText={this.state.filterText}
                    onHandleChangeInput={this.handleChange.bind(this)}
                    onHandleChangeCheck={this.handleChangeCheck.bind(this)}
                />
                <ProductsTable
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    products={this.props.products}/>

            </div>

        )

    }

}
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable  products={PRODUCTS}/>,
    document.getElementById('products')

);

//https://blog.csdn.net/a153375250/article/details/52667739?utm_source=blogxgwz2  简单实战 添加个人信息

class CommentInput extends React.Component{

    HandleChangeInput(){
        this.props.onHandleChangeInput();
      //  console.log(this.props.input)
    }
    ChangeInput(e){
        this.props.onChangeStateName(e.target.value);
    }
    ChangeContent(e){
        this.props.onChangeStateContent(e.target.value);

    }
    render(){
        return(
            <form>
                <div><span>用户名:</span>
                    <input type='text'    onChange={this.ChangeInput.bind(this)}/>
                </div>
                <div><span>用户评论:</span>
                    <textarea  onChange={this.ChangeContent.bind(this)}>{''}</textarea>
                </div>
                <div>
                    <input type='button' onClick={this.HandleChangeInput.bind(this)} value={'发布'} />
                </div>
            </form>

        )
    }
}


class CommentList extends React.Component{

    render(){

        // const lists = [
        //     { 'name': 'Jerry', content: 'Hello'},
        //     { name: 'Tomy', content: 'World'},
        //     { name: 'Lucy', content: 'Good'}
        // ]
        console.log( this.props.lists);
        return(
            <div>
                {this.props.lists.map( (list,index)=><p key={list.name+index}><span>{list.name}:</span>{list.content} <hr/></p> )}

            </div>
        )
    }
}

class CommentApp extends React.Component{
    constructor(props){
        super(props);

        this.state={
            Comments:[{ name: 'Lucy', content: 'Good'}],
            comments_name:'',
            comments_content:''

        };   //评论数组
    }


    ChangeStateName(val){
        this.setState({
            comments_name:val
        })
    }

    ChangeStateContent(val){

        this.setState({
            comments_content:val
        })

    }


    handleInput(){

        console.log(this.state.Comments);
        this.setState(

            (prevState)=>{
                prevState.Comments.push({'name':prevState.comments_name, 'content':prevState.comments_content});
                return prevState.Comments
              }

        );
    }


    render(){
        return(
            <div>
                <CommentInput
                    onChangeStateName={this.ChangeStateName.bind(this)}
                    onChangeStateContent={this.ChangeStateContent.bind(this)}
                    onHandleChangeInput={this.handleInput.bind(this)}
                />
                <CommentList  lists={this.state.Comments} />
            </div>
        )
    }


}

ReactDOM.render(
    <CommentApp />,
    document.getElementById('comment')
);



//Tic Tac Toe 三子棋
class Square extends React.Component {
/* 单独测试用
    constructor(props) {
        super();
        this.state={value:null}
    }


    render(){
        return(
            <button className='square' onClick={()=>{this.setState({value:'X'})}}>
                {this.state.value}
            </button>
        )
    }
*/

    render(){
        if(this.props.isHightLight){
        return(
            <button className='square' onClick={this.props.onClick} style={{color:"red"}}>
                <strong>  {this.props.value} </strong>
            </button>
        )} else{

        return(
            <button className='square' onClick={this.props.onClick}>
                <strong>  {this.props.value} </strong>
            </button>
        )}
}


}

class Board extends React.Component{


    _renderSquare(i){
        return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} isHightLight={this.props.winnerLine.includes(i)}/>
    };

    render(){
        return(
           <div >
                <div className='board-row'>
                    {this._renderSquare(0)}
                    {this._renderSquare(1)}
                    {this._renderSquare(2)}
                </div>
               <div className='board-row'>
                   {this._renderSquare(3)}
                   {this._renderSquare(4)}
                   {this._renderSquare(5)}
               </div>
               <div className='board-row'>
                   {this._renderSquare(6)}
                   {this._renderSquare(7)}
                   {this._renderSquare(8)}
               </div>

           </div>

        )
    }
}



class Game extends React.Component{

    constructor(){
        super();
        this.state={
            history:[
                {squares: Array(9).fill(null),
                  lastStep:'Game Start'
                }
            ],
            nowStep:0,
            xIsNext:true,
            sort:false   //false 是正序 true是反序
        }
    }

    handleClick(i){
     //   const sq0 = this.state.squares.slice();//复制一个新数组

        const history= this.state.history.slice(0,this.state.nowStep+1); //当前位置+1才是全部数组
        const current = history[history.length-1];
        const squares = current.squares.slice();


        if(calculateWinner(squares).winner||squares[i]){
            return;
        }
        console.log(history);
        squares[i] = this.state.xIsNext?'X':'O';
        const desc = squares[i] +' Move # '+i;
        this.setState({
            history :history.concat([{squares:squares,lastStep:desc}]),   //生成下一步
            xIsNext:!this.state.xIsNext,
            nowStep:history.length   //起始位置就有一个空数组 长度1
        });

    };


    //撤退 返回
    jumpTo(step){
        console.log(this.state.nowStep+" : "+step+' sort: '+this.state.sort+' length: '+this.state.history.length);
        this.setState({
            nowStep:this.state.sort?this.state.history.length- step-1  :step,  //
            xIsNext: (step % 2) === 0   //判断当前是奇数步还是偶数步  偶数X 奇数O
        })
    }
    sortLine(){
       this.setState({
           sort:!this.state.sort
       })
    }

    render(){


        let history= this.state.history;
        const current = history[this.state.nowStep];
        const  winner=calculateWinner(current.squares).winner;  //遍历数组求赢家
        const winnerLine =calculateWinner(current.squares).winnerLine;
        let status;
        if(winner){
            status = 'Winner is:'+winner;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (this.state.sort){
            history = this.state.history.slice();
            history.reverse();
            console.log(history)
        }
        const moves = history.map((step,move)=>{
            const desc =step.lastStep;
            return(
                <li key={move} >
                    <a href='#game' onClick={()=>this.jumpTo(move)} >{desc}</a>
                </li>
            )
            }
        );



        return(
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}  winnerLine={winnerLine} />
                </div>

                <div className='game-info'>

                    <div>
                        {status}
                    </div>
                    <button onClick={()=>this.sortLine()}>Sort</button>
                    <div>
                        <ol start="0">
                            {moves}
                        </ol>
                    </div>
                </div>
            </div>

        )
    }

}

ReactDOM.render(
    <Game/>,
    document.getElementById('game')
);
//计算胜利者
function calculateWinner(squares) {
    const lines=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(squares[a] &&squares[a]===squares[b]&&squares[a] ===squares[c]){
            return {winner:squares[a],winnerLine:[a,b,c]};
        }
    }
    return {winner:null,winnerLine:[]};
}





registerServiceWorker();
