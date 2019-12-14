import React, { Component } from "react";
import { connect } from "react-redux";
import TotalScore from "./TotalScore";


class WordScoreList extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { wordScoreList } = this.props;

    let totalScore = 0;
    let words = [], scores = [];
    let wordsList = '', scoresList = '';
    if (wordScoreList) {
      totalScore = Object.values(wordScoreList).reduce(
        (totalScore, next) => {
          return totalScore + next;
        },
        0
      )
      words = Object.keys(wordScoreList);

      wordsList = words.map(function (word, index) {
        return <li key={index}>{word}</li>;
      });
      scores = Object.values(wordScoreList);
      scoresList = scores.map(function (score, index) {
        return <li key={index}>{score}</li>;
      });

    }
    return (
      <div>
        <div className="word-list">
          <div className="words">
            <h2>WORD</h2>
            <ul>{wordsList}</ul>
          </div>
          <div className="scores">
            <h2>SCORE</h2>
            <ul>{scoresList}</ul>
          </div>
        </div>
        <TotalScore totalScore={totalScore} label="Total Score" />
      </div>
    );

  }


}


function mapStateToProps(state) {
  const { wordScoreList } = state.game;
  return { wordScoreList };

}

WordScoreList = connect(mapStateToProps)(WordScoreList);

export default WordScoreList;
