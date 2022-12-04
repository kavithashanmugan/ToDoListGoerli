import React, { Component } from 'react';
import {ethers} from 'ethers';
import ToDo from './ToDoList.json';


const TODOLIST_ADDRESS = "0x04dD864854726BC0E8a938FFB369Ba783601E190";


class ToDoList extends Component {

    constructor() {
        super()
        this.state = ({
            todos: [],
            value:""
        });
        
}
onChange = (e) => {
    this.setState({ value: e.target.value });
  };

async componentDidMount(){
    if (typeof window.ethereum !== "undefined") {
        //ethereum is usable get reference to the contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(TODOLIST_ADDRESS, ToDo.abi, provider);
  
        //try to get the greeting in the contract
        try {
            const data = await contract.getTodo();
            console.log("data",data);
            this.setState({todos:data})
        } catch (e) {
            console.log("Err: ", e)
        }
      }
}
async deleteTodo(index){

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(TODOLIST_ADDRESS, ToDo.abi, signer);
        console.log("index deleted",index);
        const txn = await contract.deleteToDo(index);
        await txn.wait();
        const data = await contract.getTodo();
        this.setState({todos:data})
    } catch (e) {
        console.log("Err: ", e)
    }

}

async setTodo(){
    if (this.state.value !== "") {
        
      

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(TODOLIST_ADDRESS, ToDo.abi, signer);
       
        console.log("todo added ",this.state.value);
        const txn = await contract.setTodo(this.state.value);
        await txn.wait();
        const data = await contract.getTodo();
        this.setState({ value: "" });
        this.setState({todos:data})
    } catch (e) {
        console.log("Err: ", e)
    }
}

}


    render() {
        const mylist = this.state.todos.map((todo,index) => (
            <li className='todo_item' key={index}>{todo}
                <button onClick={()=>this.deleteTodo(index)}>Delete</button>
            </li>
             ));
        return (
            <div>
            <h1><b>TODOLIST</b> </h1>
            <form id="add-form">
            <input value={this.state.value} onChange={this.onChange} placeholder={"Enter New To Do"}/>
            <button onClick={() => {this.setTodo()}}>Add</button>
            </form>
            <ul className='todo_wrapper'>
                    {mylist}
                </ul>
          
        </div>
        );
    }
}

export default ToDoList;