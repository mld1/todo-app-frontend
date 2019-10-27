import React from "react";

class Task extends React.Component {
  render() {
    return (
      <div className="row p-2">
        <div className="col-6">Buy milk</div>
        <div className="col-3">
          <button type="button" className="btn btn-light">
            Done
          </button>
        </div>
        <div className="col-3">
          <button type="button" className="btn btn-dark">
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
