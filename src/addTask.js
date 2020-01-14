import React from "react";
import "./App.css";

class AddTask extends React.Component {
  //initial state
  state = {
    newTaskText: "",
    dateSelected: "",
    showModal: false
  };

  updateTaskText = event => {
    this.setState({
      newTaskText: event.target.value
    });
  };

  handleClick = () => {
    if (
      typeof this.state.newTaskText !== "string" ||
      this.state.newTaskText === ""
    ) {
      this.setState({
        showModal: true
      });
    } else {
      this.props.addTaskFunc(this.state.newTaskText, this.state.dateSelected);
      this.setState({
        newTaskText: ""
      });
    }
  };
  handleModalDismiss = () => {
    this.setState({
      showModal: false
    });
  };
  handleDateChange = e => {
    this.setState({
      dateSelected: e.target.value
    });
  };

  render() {
    return (
      <div className="row p-2">
        <div
          className={this.state.showModal ? "modal isVisible" : "modal"}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Oops, you forgot to add the task content
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.handleModalDismiss}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {" "}
                  Do not let circumstances control you. You change your
                  circumstances. - JC
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.handleModalDismiss}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-sm-6">
          <input
            type="text"
            className="form-control addTaskTextArea"
            aria-describedby="text"
            placeholder="E.g. take out bins"
            value={this.state.newTaskText}
            onChange={this.updateTaskText}
          ></input>
        </div>
        <div className="col-lg-2 col-sm-4">
          <div className="form-group mx-sm-3 mb-2">
            <input
              className="form-control"
              type="date"
              onChange={this.handleDateChange}
              value={this.state.dateSelected}
            ></input>
          </div>
        </div>

        <div className="col-1 col-md-2">
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
