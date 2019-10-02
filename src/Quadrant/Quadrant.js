import React, { Component } from "react";
import "./style.css";

/*
type IProps = {
  points: {
    id: number
    managerId: number
    name: string
    x: number
    y: number
  }[]  
}
*/

class Quadrant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedManagers: [],
      managers: []
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
    console.log(this.state.checkedManagers);
    console.log(
      this.props.points.filter(x =>
        this.state.checkedManagers.find(y => y == x.managerId)
      )
    );
  };

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
            {this.props.points
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
                      fontSize: "12px",
                      left: worker.x*2 + "pt",
                      bottom: worker.y*2 + "pt",
                      position: "absolute",
                      width: "100px"
                    }}
                  >
                    {"( "}
                    {worker.x}
                    {", "}
                    {worker.y}
                    {")"}
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
                <span className="checkmark"></span>
              </label>
            );
          })}
        </div>
        <div className="search">
          <h5>Search by Worker Names:</h5>
          <input type="text" />
        </div>
        <div className="title">
          <h1 style={{ textAlign: "center" }}>Where are my workers?? ಠ_ಠ</h1>
        </div>
      </div>
    );
  }
}

export default Quadrant;
