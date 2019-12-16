import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Aux from "../../../hoc/_Aux";
import "./Scores.css";
import Button from "../../common/Button";
import { ROUTE_INTRO } from "../../../constants/routeNames";
import { GenerateMessageByTrials } from "../../../helpers";
import { gameAction } from "../../../store/actions";
import IconButton from "../../common/IconButton";

class Scores extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);

    if (this.props.trials <= 0 && !this.props.wordScoreList) {
      this.backtoHome();
    }
  }

  backtoHome = () => {
    const { dispatch } = this.props;
    dispatch(gameAction.clearGame());
  };

  handleSubmit = event => {
    event.preventDefault();
    this.backtoHome();
  };

  render() {
    let { currentUser, trials, wordScoreList, wrongCount } = this.props;

    let userName = currentUser.userName ? currentUser.userName : "";

    let resultMsg = GenerateMessageByTrials(trials,userName);

    let totalScore = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;

    if (wordScoreList) {
      totalScore = Object.values(wordScoreList).reduce((totalScore, next) => {
        return totalScore + next;
      }, 0);

      totalCorrect = Object.keys(wordScoreList).length;
      totalIncorrect = wrongCount;
    }

    return (
      <Aux>
        <div className="game-scores">
          <h1>{resultMsg}</h1>
          <div className="game-scores-chart">
            <table className="result-table">
              <tbody>
                <tr>
                  <th>Player Name:</th>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <th>Total Trials:</th>
                  <td>{trials}</td>
                </tr>
                <tr>
                  <th>Total Points:</th>
                  <td>{totalScore}</td>
                </tr>
                <tr>
                  <th>Right:</th>
                  <td>{totalCorrect}</td>
                </tr>
                <tr>
                  <th>Wrong:</th>
                  <td>{totalIncorrect}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="action-bar">
            <IconButton
              iconName="home"
              tooltip="Back to Home"
              handleSubmit={this.handleSubmit}
            />
            <label>Back to home</label>
          </div>
        </div>
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, wordScoreList, trials, wrongCount } = state.game;
  return { currentUser, wordScoreList, trials, wrongCount };
}

Scores = connect(mapStateToProps)(Scores);

export default Scores;
