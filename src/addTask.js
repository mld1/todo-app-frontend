import React from "react";

class AddTask extends React.Component {
  //initial state
  state = {
    newTaskText: ""
  };

  updateTaskText = event => {
    this.setState({
      newTaskText: event.target.value
    });
  };

  handleClick = () => {
    this.props.addTaskFunc(this.state.newTaskText);
    this.setState({
      newTaskText: ""
    });
  };

  render() {
    // JSX is NOT HTML
    return (
      <section>
        <div className="row p-2">
          <div className="col-8">
            <label for="exampleFormControlTextarea1"></label>
            <input
              type="email"
              className="form-control addTaskTextArea"
              aria-describedby="emailHelp"
              placeholder="E.g. take out bins"
              value={this.state.newTaskText}
              onChange={this.updateTaskText}
            ></input>
          </div>
          <div className="mt-3 mb-3">
            <button
              id="addButton"
              className="btn btn-dark addTaskButton"
              onClick={this.handleClick}
            >
              <i className="fa fa-plus"> </i>{" "}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default AddTask;
