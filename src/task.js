import React from "react";
import "./task.css";
import moment from "moment";

class Task extends React.Component {
  updateTasks = task => {
    const tasksCopy = this.state.completedTasks.slice();
    tasksCopy.push(task);
    this.setState({
      completedTasks: tasksCopy
    });
  };
  handleDelete = e => {
    console.log("Button was clicked", e);
    this.props.deleteTaskFunc(this.props.id);
  };

  handleComplete = e => {
    console.log("Button was clicked", e);
    this.props.completedTaskFunc(this.props.id);
  };

  handleUndo = e => {
    console.log("Button was clicked", e);
    this.props.undoTaskFunc(this.props.id);
  };

  toggleSortByDate = e => {};

  render() {
    return (
      <div
        className={
          this.props.completed
            ? "completed row p-2 rowmargin"
            : "row p-2 grey rowmargin"
        }
      >
        <div
          className={
            moment(this.props.dueBy).isAfter(moment())
              ? "col-4"
              : "col-4 redText"
          }
        >
          {this.props.text}
        </div>
        <div
          className={
            moment(this.props.dueBy).isAfter(moment())
              ? "col-2"
              : "col-2 redText"
          }
        >
          <p>Created {moment(this.props.date).format("YYYY-MM-DD")}</p>
        </div>
        <div
          className={
            moment(this.props.dueBy).isAfter(moment())
              ? "col-2"
              : "col-2 redText"
          }
        >
          <p>Due {moment(this.props.dueBy, "YYYY-MM-DD").fromNow()}</p>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={this.handleDelete}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-dark">
            {this.props.completed ? (
              <i className="fa fa-undo" onClick={this.handleUndo}></i>
            ) : (
              <i
                className="fa fa-check greenCheck"
                onClick={this.handleComplete}
              ></i>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
