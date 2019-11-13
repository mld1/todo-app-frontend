import React from "react";
import "./App.css";
import moment from "moment";

class AddTask extends React.Component {
  //initial state
  state = {
    newTaskText: "",
    dateSelected: moment().format("YYYY-MM-DD")
  };

  updateTaskText = event => {
    this.setState({
      newTaskText: event.target.value
    });
  };

  handleClick = () => {
    if (
      typeof this.state.newTaskText !== "string" ||
      this.state.newTaskText == ""
    ) {
      alert("Please enter text");
    }
    this.props.addTaskFunc(this.state.newTaskText, this.state.dateSelected);
    this.setState({
      newTaskText: ""
    });
  };

  handleDateChange = e => {
    this.setState({
      dateSelected: e.target.value
    });
  };

  render() {
    // JSX is NOT HTML
    return (
      <div className="row p-2">
        <div className="col-9">
          <input
            type="text"
            className="form-control addTaskTextArea"
            aria-describedby="text"
            placeholder="E.g. take out bins"
            value={this.state.newTaskText}
            onChange={this.updateTaskText}
          ></input>
        </div>
        <div className="col-2">
          <div className="form-group mx-sm-3 mb-2">
            <input
              className="form-control"
              type="date"
              onChange={this.handleDateChange}
              value={this.state.dateSelected}
            ></input>
          </div>
        </div>

        <div className="col-1">
          {/* <div className="mt-3 mb-3"> */}
          <button
            id="addButton"
            className="btn btn-dark addTaskButton"
            onClick={this.handleClick}
          >
            <i className="fa fa-plus"> </i>{" "}
          </button>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default AddTask;
