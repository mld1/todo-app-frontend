import React from "react";
import Task from "./task";
import AddTask from "./addTask";
import OutstandingTasks from "./outstandingTasks";
import uuid from "uuid/v4";
import "./App.css";
import moment from "moment";
import Dropdown from "./dropdown";
import FlipMove from "react-flip-move";

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
    incompleteSortOption: "none"
  };

  addTask = (taskText, dueByDate) => {
    const newTask = {
      text: taskText,
      completed: false,
      date: moment().format("dddd, MMMM Do YYYY"),
      dueBy: dueByDate,
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

  sortBy = option => {
    this.setState({
      incompleteSortOption: option
    });
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
      <div className="container">
        <header>
          <h1>
            <span className="h1Letter">To Do </span>
            <span className="list">
              <u>List</u>
            </span>
          </h1>
          <h6>
            Don't try to be like Jackie. There is only one Jackie. Study
            computers instead.
          </h6>
        </header>
        <br className="grey"></br>
        <div className="row">
          <div className="col-12">
            <br className="grey"></br>

            <AddTask addTaskFunc={this.addTask} />
          </div>
        </div>
        <div className="row p-2">
          <OutstandingTasks count={this.state.tasks.length} />
          <Dropdown
            sortByFunc={this.sortBy}
            sortOption={this.state.incompleteSortOption}
          />
        </div>
        <div className="row">
          <div className="col-12">
            <FlipMove duration={250} easing="ease-out">
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
            </FlipMove>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <br className="grey"></br>
            <br className="grey"></br>
            <FlipMove duration={250} easing="ease-out">
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
            </FlipMove>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
