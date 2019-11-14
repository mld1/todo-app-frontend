import React from "react";

class Dropdown extends React.Component {
  state = {
    showDropdown: false
  };

  handleSortMenu = () => {
    if (this.state.showDropdown === false) {
      this.setState({
        showDropdown: true
      });
    } else {
      this.setState({
        showDropdown: false
      });
    }
  };

  handleSortOption = option => {
    this.props.sortByFunc(option);
    this.handleSortMenu();
  };

  render() {
    let message;
    if (this.props.sortOption === "due") {
      message = "Sorted By Date Due";
    } else if (this.props.sortOption === "created") {
      message = "Sorted By Date Created";
    } else {
      message = "Sort By";
    }

    return (
      <div className="col-4">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary btn-sm dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={this.handleSortMenu}
          >
            {message}
          </button>
          <div
            className={
              this.state.showDropdown
                ? "dropdown-menu isVisible"
                : "dropdown-menu"
            }
          >
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleSortOption("created")}
            >
              Date Created
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleSortOption("due")}
            >
              Date Due
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
