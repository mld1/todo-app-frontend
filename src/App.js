import React from "react";
import "./App.css";
import Task from "./task";
import AddTask from "./addTask";
import OutstandingTasks from "./outstandingTasks";

class App extends React.Component {
  render() {
    return (
      <div className="Container">
        <header>
          <h1>Welcome</h1>
        </header>
        <AddTask />
        <OutstandingTasks />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    );
  }
}

export default App;
