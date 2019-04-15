import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

// function counter(props){
//     var [count, setCount] = React.useState(0)
//     return (
//         <div>
//             <button onClick={()=>setCount(count-1)}>-</button>
//             <span>{count}</span>
//             <button onClick={()=>setCount(count+1)}>+ </button>
//         </div>
//     )
// }

class Todoapp extends React.Component{
    constructor(){
        super()
        this.state = {
            todos: [{
                content: 'eat',
                checked: true
            },{
                content: 'drink',
                checked: false
            },{
                content: 'sleep',
                checked: true
            }]
            
        }
    }
    isAllseleted = ()=>{
        if(this.state.todos.length){
            return  this.state.todos.every(it => it.checked)
        } else {
            return false
        }
    }// 全选初始状态
    toggleAll =() => {
        if(!this.isAllseleted()){
            this.setState({todos: this.state.todos.map(it => {
                return {
                    ...it,
                    checked: true
                }
            })})
        } else {
            this.setState({todos: this.state.todos.map(it => {
                return {
                    ...it,
                    checked: false
                }
            })})
        }
    }
    toggleStatus = (todo) => {
        todo.checked = !todo.checked
        this.forceUpdate()
        // this.setState({
        //     todos: this.todos.map(it => {
        //         if(it == todo){
        //             return {
        //                 content: it.content,
        //                 checked: !it.checked
        //             }
        //         } else {
        //             return it
        //         }
        //     })
        // })
    }
    addTodo = (e)=>{
        var content = e.target.value.trim();
        if((e.keyCode == 13 || e.type=="click") && content){
        
            this.setState({
               todos: [
                   ...this.state.todos,
                 {
                    content,
                    checked: false,
                 }
                ]
            })
            e.target.value = ""
        }

    }
    deleteTodo = (todo)=>{
        this.setState({
            todos: this.state.todos.filter(it => it!==todo)
        })
    }
    render(){
        return (
          <div id="todo-app">
          <div> 
            <input type="checkbox" checked={this.isAllseleted()} onChange={this.toggleAll}/>
            <input type="text" onKeyUp={(e) => this.addTodo(e)}/>
            <button onClick={(e)=>this.addTodo(e)}>add</button>
        </div>
              <ul>
                  {
                   this.state.todos.map((todo,idx) => (
                       <li key={todo.content}>
                           <input type="checkbox" checked={todo.checked} onChange={() => this.toggleStatus(todo)}/>
                           <span>{todo.content}</span>
                           <button onClick={(e) => this.deleteTodo(todo)}>&times;</button>
                       </li>
                   ))   
                 }
               </ul>
          </div>  
        )
    }
}
class Clock extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        date: new Date()
      }  
    }
    componentDidMount(){
      this.timerId = setInterval(
        ()=>this.tick(),1000
      )
    }
    
    componentWillUnmount(){
      clearInterval(this.timerId)
    }
    tick (){
        this.setState({
          date: new Date()
        })
    }
    
    render(){
      return (
        <div>
         <h1>Hello world</h1>
         <h2>This is {this.state.date.toLocaleTimeString()}</h2>
        </div>
      )
    }
  }
ReactDOM.render(
    <div>
        <Todoapp/>
        <Clock/>
    </div>
    ,
    document.getElementById('root')
);