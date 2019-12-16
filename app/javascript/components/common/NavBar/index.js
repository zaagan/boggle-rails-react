import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import Aux from "../../../hoc/_Aux";
import "./NavBar.css";
import { withRouter } from "react-router-dom";
import IconButton from "../IconButton";
import { NB_HOME, NB_RESET } from "../../../constants/navBarAction";
import ReactStopwatch from "react-stopwatch";

import {
  ROUTE_SCORES
} from "../../../constants/routeNames";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

  }

  routeChange() {
    this.props.history.push(ROUTE_SCORES);
  }

  render() {
    let { currentUser, timeLimit } = this.props;

    return (
      <div className="nav-bar">
        <div className="navbar-left">
          <IconButton
            iconName="home"
            tooltip="Back to Home"
            handleSubmit={() => {
              this.props.onClick ? this.props.onClick(NB_HOME) : null;
            }}
          />

          <IconButton
            iconName="redo"
            tooltip="Reset Game"
            handleSubmit={() => {
              this.props.onClick ? this.props.onClick(NB_RESET) : null;
            }}
          />

          {
            timeLimit && <React.Fragment>
              <ReactStopwatch
                seconds={0}
                minutes={0}
                hours={0}
                limit={timeLimit}
                onChange={({ hours, minutes, seconds }) => {

                }}
                onCallback={() => this.routeChange()}
                render={({ formatted, hours, minutes, seconds }) => {
                  var extraClass = "timer-green";
                  if (minutes > 2) extraClass = "timer-red";
                  else if (minutes > 1 && minutes < 2) extraClass = "timer-yellow";
                  return (
                    <span className={"game-stopwatch " + extraClass}>
                      Elapsed: {formatted}
                    </span>
                  );
                }}
              />
              <ReactTooltip />
            </React.Fragment>
          }

        </div>

        <div className="navbar-right">
          <span className="game-player">
            Player: {currentUser ? currentUser.userName : ""}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, timeLimit } = state.game;

  console.log('Time Limit: ', timeLimit);
  return { currentUser, timeLimit };

}

export default compose(withRouter, connect(mapStateToProps))(NavBar);
