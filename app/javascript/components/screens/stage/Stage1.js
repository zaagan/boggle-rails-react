import React, { Component } from "react";
import Aux from "../../../hoc/_Aux";
import { connect } from "react-redux";

import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  calculateScore
} from "../../../constants/gameUtil";
import Board from "../../common/Board";
import ScoreBox from "../../common/ScoreBox";
import CurrentWord from "../../common/CurrentWord";
import Button from "../../common/Button";
import "./Stage1.css";
import NavBar from "../../common/NavBar";

import { NB_HOME, NB_RESET } from "../../../constants/navBarAction";
import TimeSand from "../../common/TimeSand";
import {
  ROUTE_SCORES,
  ROUTE_INTRO,
  ROUTE_STAGE1
} from "../../../constants/routeNames";
import { gameAction } from "../../../store/actions";

class Stage1 extends Component {
  constructor(props) {
    super(props);

    this.initBoard = shuffleBoard();

    this.state = {
      board: this.initBoard,
      currentWord: "",
      currentWordPosition: [],
      wordScoreList: {}
    };

    this.onUserAction = this.onUserAction.bind(this);
  }

  onUserAction(item) {
    switch (item) {
      case NB_HOME:
        this.props.dispatch(gameAction.backToHome());
        // this.props.history.push(ROUTE_INTRO);
        break;

      case NB_RESET:
        this.props.history.push(ROUTE_STAGE1);
        break;

      default:
        alert(3);
        break;
    }
  }

  // 1. click on the tile
  // 2. update tile selected to true.
  // 2.1 Can select and unselect the tile
  // 2.2 Can only unselect the last tile
  // 2.3 Update currentWord as we select and unselect
  // 2.4. Can only select the surrounding cells
  // 2.5 Make a copy of board, word, currentWordPositions, etc
  // 2.6 Mutate the state
  // 3. render the board with updated tile so it renders as active

  handleClick(rowId, columnId) {
    // TODO: Handle tile click to select / unselect tile.
    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];
    if (selectedTile.selected) {
      // Check if selectedTile is last tile
      if (isTileEqual(selectedTile, lastSelectedTile)) {
        // Unselected selectedTile and remove from currentWordPosition
        // Also update the board to set the tile to unselected
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = false;
        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.slice(0, -1)
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        // Select the tile
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = true;
        this.setState({
          // update current word with selected tile
          currentWord: this.state.currentWord.concat(
            newBoard[rowId][columnId].letter
          ),
          // update board
          board: newBoard,
          // update current word position with selected tile position
          currentWordPosition: this.state.currentWordPosition.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  // Adds Current Word to the Word List
  handleSubmit(word) {

    // Check if word is valid
    if (word.length < 3 || this.state.wordScoreList[word]) {
      return;
    }
    // TODO: Calculate score
    const score = calculateScore(word);

    // TODO: Unselect all tiles.
    const clearedBoard = this.initBoard;

    // TODO: Add to the Word List
    this.setState({
      // wordScoreList: Object.assign(this.state.wordScoreList, {[word]: score}),
      wordScoreList: { ...this.state.wordScoreList, [word]: score },
      currentWord: "",
      currentWordPosition: [],
      board: clearedBoard
    });
  }

  render() {
    return (
      <Aux>
        <NavBar onClick={this.onUserAction} />

        <div className="game-area">
          <Board
            board={this.state.board}
            handleClick={this.handleClick.bind(this)}
          />
          <CurrentWord
            currentWord={this.state.currentWord}
            label="Current Word"
          />
          <Button
            handleSubmit={this.handleSubmit.bind(this, this.state.currentWord)}
            label="SUBMIT WORD"
          />
        </div>

        <ScoreBox
          wordScoreList={this.state.wordScoreList}
          totalScore={Object.values(this.state.wordScoreList).reduce(
            (totalScore, next) => {
              return totalScore + next;
            },
            0
          )}
        />
        <div className="timesand-container">
          <TimeSand />
        </div>

        <div className="clear" />
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser } = state.game;
  return { currentUser };
}

Stage1 = connect(mapStateToProps)(Stage1);

export default Stage1;
