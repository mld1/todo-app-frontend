import React from "react";
import "./task.css";

class Task extends React.Component {
  render() {
    return (
      <div className="row p-2 grey rowmargin">
        <div className="col-6">{this.props.text}</div>
        <div className="col-3">
          <button type="button" className="btn btn-light">
            <i className="fa fa-trash"></i>
          </button>
        </div>
        <div className="col-3">
          <button type="button" className="btn btn-dark">
            {this.props.completed ? (
              <i className="fa fa-undo"></i>
            ) : (
              <i className="fa fa-check greenCheck"></i>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
