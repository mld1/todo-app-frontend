import React from "react";
import "./App.css";

class OutstandingTasks extends React.Component {
  render() {
    return (
      <div className="row p-2">
        <div className="col-12">
          You have {this.props.count} outstanding tasks
        </div>
      </div>
    );
  }
}

export default OutstandingTasks;
