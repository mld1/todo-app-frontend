import React from "react";
import Task from "./task";
import axios from "axios";
import AddTask from "./addTask";
import OutstandingTasks from "./outstandingTasks";
import "./App.css";
import moment from "moment";
import Dropdown from "./dropdown";
import FlipMove from "react-flip-move";

class App extends React.Component {
  state = {
    tasks: [],
    incompleteSortOption: ""
  };

  componentDidMount() {
    axios
      .get("https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/")
      .then(response => {
        const tasksFromDB = response.data;
        this.setState({
          tasks: tasksFromDB.tasks
        });
      })
      .catch(err => {
        console.log("Error getting tasks data", err);
      });
  }

  addTask = (taskText, dueByDate) => {
    const newTask = {
      Completed: false,
      DateCreated: moment().format("YYYY-MM-DD"),
      DateDue: dueByDate,
      Text: taskText,
      UserId: 1
    };

    console.log("from axios addTask " + newTask.DateCreated);
    const tasksCopy = this.state.tasks.slice();

    axios
      .post(
        "https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/",
        newTask
      )
      .then(response => {
        console.log(response);
        const taskFromDB = response.data;
        tasksCopy.push(taskFromDB);

        this.setState({
          tasks: tasksCopy
        });
      })
      .catch(err => console.log("Error creating task", err));

    //Add that task to the state
    //never do this.state.tasks.push(item) and access state directly
  };

  deleteTask = id => {
    axios
      .delete(
        "https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/" + id
      )
      .then(response => {
        console.log(response);
        const tasksNotDel = this.state.tasks.filter(task => {
          return task.TaskID !== id;
        });
        this.setState({
          tasks: tasksNotDel
        });
        console.log(this.state.birthdays);
      })
      .catch(err => console.log("Error deleting task", err));
  };

  editTask = (id, completed) => {
    const editedTask = {
      Completed: completed
    };
    axios
      .put(
        "https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/" +
          id,
        editedTask
      )
      .then(response => {
        const updatedtasks = this.state.tasks.map(task => {
          // console.log(response);
          if (task.TaskID === id) {
            task.Completed = completed;
          }
          return task;
        });
        this.setState({
          tasks: updatedtasks
        });
      })
      .catch(err => console.log("Error editing task", err));
  };

  completeTask = id => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.TaskID === id) {
        task.Completed = true;
        this.editTask(task.TaskID, task.Completed);
      }

      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  };

  undoTask = id => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.TaskID === id) {
        task.Completed = false;
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
    const updatedTasks = this.state.tasks.sort(function(a, b) {
      if (option === "created") {
        return a.DateCreated < b.DateCreated ? -1 : 1;
      } else if (option === "due") {
        return a.DateDue < b.DateDue ? -1 : 1;
      }
    });
    this.setState({
      tasks: updatedTasks
    });
  };

  // toggleListSort = tasks => {
  //   let taskList = [];
  //   if(let i = 0; i < tasks.length; i++){
  //     if (tasks[i].date)
  //   }
  // };

  render() {
    console.log(this.state.tasks);
    const completedTasks = this.state.tasks.filter(task => {
      return task.Completed === true;
    });

    const incompleteTasks = this.state.tasks.filter(task => {
      return task.Completed ? false : true;
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
            <FlipMove
              duration={250}
              easing="ease-out"
              enterAnimation={{
                from: {
                  duration: 1050,
                  transform: "rotateY(180deg)",
                  opacity: 0.1
                },
                to: {
                  transform: ""
                }
              }}
              leaveAnimation={{
                from: {
                  transform: ""
                },
                to: {
                  duration: 1050,
                  transform: "rotateY(-120deg)",
                  opacity: 0.1
                }
              }}
            >
              {incompleteTasks.map(task => {
                return (
                  <Task
                    text={task.Text}
                    completed={task.Completed}
                    key={task.TaskID}
                    deleteTaskFunc={this.deleteTask}
                    completedTaskFunc={this.completeTask}
                    id={task.TaskID}
                    date={task.DateCreated}
                    dueBy={task.DateDue}
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
                    text={task.Text}
                    completed={task.Completed}
                    key={task.TaskID}
                    deleteTaskFunc={this.deleteTask}
                    undoTaskFunc={this.undoTask}
                    id={task.TaskID}
                    date={task.DateCreated}
                    dueBy={task.DateDue}
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

// "TaskID": 2,
//             "Completed": 1,
//             "DateCreated": "2019-06-21T00:00:00.000Z",
//             "DateDue": "2019-11-28T00:00:00.000Z",
//             "Text": "Karate chop plank of wood",
//             "UserID": 2
