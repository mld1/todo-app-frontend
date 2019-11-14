import React from "react";
import "./App.css";

class OutstandingTasks extends React.Component {
  render() {
    return (
      <div className="col-4">
        <h4 className="rowmargin">
          You have <strong>{this.props.count}</strong> tasks:{" "}
        </h4>
      </div>
    );
  }
}

export default OutstandingTasks;
