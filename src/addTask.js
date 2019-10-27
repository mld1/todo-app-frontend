import React from "react";

class AddTask extends React.Component {
  render() {
    return (
      <div className="row p-2">
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            aria-describedby="add task"
            placeholder="Enter task"
          />
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-light">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddTask;
