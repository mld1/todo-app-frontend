import React from "react";
import Task from "./task";
import AddTask from "./addTask";
import OutstandingTasks from "./outstandingTasks";
import "./task.js";
import uuid from "uuid/v4";

class App extends React.Component {
  state = {
    tasks: [
      { text: "Pet cat", completed: true, date: "2019-10-25", id: uuid() },
      { text: "Jump rope", completed: false, date: "2019-10-20", id: uuid() },
      { text: "Rob bank", completed: true, date: "2019-08-26", id: uuid() },
      { text: "Hide cash", completed: false, date: "2019-08-26", id: uuid() }
    ]
  };

  addTask = taskText => {
    //create new task (with default completed and date properties)
    //"buy shoes"
    const newTask = {
      text: taskText,
      completed: false,
      date: "2019-10-21",
      //create a random id - hash or uuid
      id: uuid()
    };
    //Add that task to the state
    //never do this.state.tasks.push(item) and access state directly
    const tasksCopy = this.state.tasks.slice();
    tasksCopy.push(newTask);
    this.setState({
      tasks: tasksCopy
    });
  };

  render() {
    return (
      <div className="Container">
        <header>
          <h1>To Do List</h1>
        </header>
        <br className="grey"></br>
        <AddTask addTaskFunc={this.addTask} />
        <br className="grey"></br>
        <OutstandingTasks count={this.state.tasks.length} />
        <br className="grey"></br>
        {this.state.tasks.map(task => {
          return <Task text={task.text} />;
        })}
      </div>
    );
  }
}

export default App;
