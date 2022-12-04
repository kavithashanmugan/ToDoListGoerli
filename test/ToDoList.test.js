const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ToDoList",function(){

  async function deployToDoList(){
       const ToDoList = await ethers.getContractFactory("ToDoList");
       const todolist = await ToDoList.deploy();

       return { todolist}
  }

describe("Create To Do",function(){
  it("Should create to do",async function(){
    const {todolist} = await loadFixture(deployToDoList);
    let task = await todolist.setTodo("wash dishes")
    let taskTxn = await task.wait();
    console.log("taskTxn",taskTxn);
    let todo = taskTxn.events.find((x) => x.event == "TaskStatus").args._todo;
    console.log("todo task is",todo)

  })
})
})


