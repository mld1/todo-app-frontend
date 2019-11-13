import React from "react";
import Task from "./task";
import AddTask from "./addTask";
import OutstandingTasks from "./outstandingTasks";
import "./task.js";
import uuid from "uuid/v4";
import "./App.css";
import moment from "moment";

class App extends React.Component {
  state = {
    tasks: [
      {
        text: "Pet cat",
        completed: true,
        date: "2019-10-25",
        id: uuid(),
        dueBy: "2019-11-20"
      },
      {
        text: "Jump rope",
        completed: false,
        date: "2019-10-20",
        id: uuid(),
        dueBy: "2019-11-11"
      },
      {
        text: "Rob bank",
        completed: true,
        date: "2019-08-26",
        id: uuid(),
        dueBy: "2019-12-16"
      },
      {
        text: "Hide cash",
        completed: false,
        date: "2019-08-26",
        id: uuid(),
        dueBy: "2019-11-17"
      }
    ],
    completedTasks: []
  };

  addTask = (taskText, dueByDate) => {
    //create new task (with default completed and date properties)
    //"buy shoes"
    const newTask = {
      text: taskText,
      completed: false,
      date: moment().format("dddd, MMMM Do YYYY"),
      dueBy: dueByDate,
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

  deleteTask = id => {
    const taskToDel = this.state.tasks.filter(task => {
      return task.id !== id;
    });
    this.setState({
      tasks: taskToDel
    });
  };

  completeTask = id => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.completed = true;
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  undoTask = id => {
    console.log(id);
    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.completed = false;
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  countTasksCompleted = task => {
    let count = 0;
    if (task.completed === true) {
      count++;
    }
    return count;
  };

  // toggleListSort = tasks => {
  //   let taskList = [];
  //   if(let i = 0; i < tasks.length; i++){
  //     if (tasks[i].date)
  //   }
  // };

  render() {
    const completedTasks = this.state.tasks.filter(task => {
      return task.completed;
    });

    const incompleteTasks = this.state.tasks.filter(task => {
      return task.completed ? false : true;
    });

    return (
      <div className="Container">
        <header>
          <h1>
            <span className="h1Letter">To Do </span>
            <span className="list">
              <u>List</u>
            </span>
          </h1>
        </header>
        <br className="grey"></br>
        <div className="row">
          <div className="col-12">
            <br className="grey"></br>

            <AddTask addTaskFunc={this.addTask} />
            <div className="row">
              <div className="col-4"></div>
              <div className="col-2">
                <button type="button" class="btn btn-secondary btn-sm">
                  Sort by date created
                </button>
              </div>
              <div className="col-2">
                <button type="button" class="btn btn-secondary btn-sm">
                  Sort by urgency
                </button>
              </div>
            </div>
            {/* <br className="grey"></br> */}
            <OutstandingTasks count={this.state.tasks.length} />
            {incompleteTasks.map(task => {
              return (
                <Task
                  text={task.text}
                  completed={task.completed}
                  key={task.id}
                  deleteTaskFunc={this.deleteTask}
                  completedTaskFunc={this.completeTask}
                  id={task.id}
                  date={task.date}
                  dueBy={task.dueBy}
                />
              );
            })}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <br className="grey"></br>
            <br className="grey"></br>
            {completedTasks.map(task => {
              return (
                <Task
                  text={task.text}
                  completed={task.completed}
                  key={task.id}
                  deleteTaskFunc={this.deleteTask}
                  undoTaskFunc={this.undoTask}
                  id={task.id}
                  date={task.date}
                  dueBy={task.dueBy}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
