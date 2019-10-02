import React, { Component } from "react";
import "./style.css";

class Quadrant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedManagers: [],
      searchByName: '',
      workers: this.props.points,
      filteredWorkers: this.props.points
    };
  }

  mouseEnter = () => {
    document.getElementById("vertical-guide").style.display = "block";
    document.getElementById("horizontal-guide").style.display = "block";
  };

  mouseLeave = () => {
    document.getElementById("vertical-guide").style.display = "none";
    document.getElementById("horizontal-guide").style.display = "none";
  };

  mouseMove = event => {
    const quadrantRect = document
      .getElementById("graph")
      .getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const quadrantX = mouseX - quadrantRect.left;
    const quadrantY = mouseY - quadrantRect.top;

    document.getElementById("vertical-guide").style.left = `${quadrantX}px`;
    document.getElementById("horizontal-guide").style.top = `${quadrantY}px`;
  };

  handleFilter = e => {
    if (e.target.checked) {
      this.setState({
        checkedManagers: [...this.state.checkedManagers, e.target.value]
      });
    } else {
      let remove = this.state.checkedManagers.indexOf(e.target.value);
      this.setState({
        checkedManagers: this.state.checkedManagers.filter(
          (_, i) => i !== remove
        )
      });
    }
  };

  onChange = (e) => {
    const searchByName = e.target.value.toLowerCase();
    this.setState({ searchByName }, () => this.filterName())
  }

  filterName() {
    let workers = this.state.workers
    let searchByName = this.state.searchByName

    workers = workers.filter(function(w) {
      return w.name.toLowerCase().indexOf(searchByName) != -1
    })
    this.setState({ filteredWorkers: workers })
  }

  render() {
    const managers = this.props.points.filter(
      x => !!this.props.points.find(y => y.managerId == x.id)
    );

    return (
      <div id="quadrant">
        <div
          id="quadrant-wrapper"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onMouseMove={this.mouseMove}
        >
          <figure id="horizontal-guide"></figure>
          <figure id="vertical-guide"></figure>
          <div id="graph">
            <figure id="vertical-divider"></figure>
            <figure id="horizontal-divider"></figure>
            {this.state.filteredWorkers
              .filter(
                x =>
                  this.state.checkedManagers.find(y => y == x.managerId) ||
                  x.managerId == null
              )
              .map(worker => {
                return (
                  <span
                    key={worker.id}
                    style={{
                      fontSize: "14px",
                      left: worker.x*2.5 + "pt",
                      bottom: worker.y*2.5 + "pt",
                      position: "absolute",
                      width: "100px"
                    }}
                  >
                    {"( " + worker.x + ", " + worker.y + ")"}
                    <br />
                    {worker.name}
                  </span>
                );
              })}
            <div id="inner-quadrant"></div>
          </div>
        </div>
        <div className="scale-wrapper">
          <span>0%</span>
          <span>200%</span>
        </div>
        <div className="filter">
          <h5>Filter by Managers:</h5>
          {managers.map((manager, id) => {
            return (
              <label className="container" key={id}>
                <input
                  type="checkbox"
                  onClick={this.handleFilter}
                  value={manager.id}
                />
                {manager.name}
              </label>
            );
          })}
        </div>
        <div className="search">
          <h5>Search by Worker Names:</h5>
          <input type="text" onChange={this.onChange} />
        </div>
        <div className="title">
          <h1 style={{ textAlign: "center" }}>Where are my workers?? ಠ_ಠ</h1>
        </div>
      </div>
    );
  }
}

export default Quadrant;
