import React from "react";
import WordScoreList from "./WordScoreList";
import "./ScoreBox.css";

const ScoreBox = props => {

  return (
    <div className="score-box">
      <WordScoreList />
    </div>
  );
};

export default ScoreBox;
