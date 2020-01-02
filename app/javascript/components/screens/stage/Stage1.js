import React, { Component } from "react";
import Aux from "../../../hoc/_Aux";
import { connect } from "react-redux";

import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  toggleHints,
  clearHints
} from "../../../constants/gameUtil";
import Board from "../../common/Board";
import ScoreBox from "../../common/ScoreBox";
import CurrentWord from "../../common/CurrentWord";
import Button from "../../common/Button";
import "./Stage1.css";
import NavBar from "../../common/NavBar";

import { NB_HOME, NB_RESET } from "../../../constants/navBarAction";
import TimeSand from "../../common/TimeSand";
import { ROUTE_SCORES, ROUTE_STAGE1 } from "../../../constants/routeNames";
import { gameAction } from "../../../store/actions";
import { MessageType, InGameMessageType } from "../../../constants/messageType";

import { showMessage, GenerateMessage } from "../../../helpers";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Stage1 extends Component {
  constructor(props) {
    super(props);

    let { data, boardSize } = props.currentUser;
    let board_data = data.board_data;

    this.initBoard = shuffleBoard(board_data, boardSize);

    this.state = {
      board: this.initBoard,
      currentWord: "",
      currentWordPosition: []
    };

    this.onUserAction = this.onUserAction.bind(this);
    this.onEndGameClick = this.onEndGameClick.bind(this);
  }

  backtoHome = () => {
    const { dispatch } = this.props;
    dispatch(gameAction.clearGame());
  };

  onUserAction(item) {
    switch (item) {
      case NB_HOME:
        this.backtoHome();
        // this.props.history.push(ROUTE_INTRO);
        break;

      case NB_RESET:
        window.location.reload();
        // this.props.history.push(ROUTE_STAGE1);
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

    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];

    debugger;
    if (selectedTile.selected) {

      // Check if selectedTile is last tile
      if (isTileEqual(selectedTile, lastSelectedTile)) {

        // Unselected selectedTile and remove from currentWordPosition
        // Also update the board to set the tile to unselected
        let newBoard = copyBoard(this.state.board);

        newBoard[rowId][columnId].selected = false;


        let currentPosition = this.state.currentWordPosition.slice(0, -1);
        if (currentPosition.length <= 0) {
          newBoard = clearHints(newBoard);
        } else {
          let currentRowId = currentPosition[currentPosition.length - 1].rowId;
          let currentColId = currentPosition[currentPosition.length - 1].columnId;
          newBoard = toggleHints(newBoard, currentRowId, currentColId);
        }


        // newBoard[rowId][columnId].selected = false;

        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: currentPosition
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        // Select the tile
        let newBoard = copyBoard(this.state.board);

        newBoard[rowId][columnId].selected = true;

        newBoard = toggleHints(newBoard, rowId, columnId);

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

  clearStage = () => {
    const clearedBoard = this.initBoard;
    this.setState({
      currentWord: "",
      currentWordPosition: [],
      board: clearedBoard
    });
  };

  onEndGameClick() {
    let props = this.props;
    confirmAlert({
      title: "Quit Game",
      message: "Are you sure you want to end this game ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            props.history.push(ROUTE_SCORES);
          }
        },
        {
          label: "Not Yet ",
          onClick: () => console.log("submission canceled")
        }
      ]
    });
  }

  // Adds Current Word to the Word List
  handleSubmit(word) {
    let currentList = this.props.wordScoreList;

    // Check if word is valid
    if (word.length < 3) {
      return;
    }

    if (currentList && currentList[word]) {
      showMessage(
        MessageType.ERROR,
        GenerateMessage(InGameMessageType.EXISTS, "")
      );
      this.clearStage();
      return;
    }

    const { dispatch } = this.props;

    dispatch(
      gameAction.evaluateWord(
        {
          word: word
        },
        () => {
          this.clearStage();
        }
      )
    );
  }

  render() {
    return (
      <Aux>
        <NavBar onClick={this.onUserAction} />

        <div className="game-container">
          <div className="game-area left-container">
            <Board
              board={this.state.board}
              handleClick={this.handleClick.bind(this)}
            />
            <CurrentWord
              currentWord={this.state.currentWord}
              label="Current Word"
            />
            <Button
              handleSubmit={this.handleSubmit.bind(
                this,
                this.state.currentWord
              )}
              label="SUBMIT WORD"
            />
          </div>

          <div className="right-container">
            <ScoreBox />
            <Button
              extraClass="btn-primary btn-end-game"
              handleSubmit={this.onEndGameClick}
              label="QUIT GAME"
            />
          </div>
        </div>

        <div className="timesand-container">
          <TimeSand />
        </div>

        <div className="clear" />
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, wordScoreList } = state.game;
  return { currentUser, wordScoreList };
}

Stage1 = connect(mapStateToProps)(Stage1);

export default Stage1;
