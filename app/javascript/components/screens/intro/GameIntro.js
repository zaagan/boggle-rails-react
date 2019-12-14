import React from "react";
import Aux from "../../../hoc/_Aux";
import { connect } from "react-redux";

import Button from "../../common/Button";

// import { Link } from "react-router-dom";
// import { ROUTE_STAGE1 } from "../../../constants/routeNames";

import "./GameIntro.css";

import { gameAction } from "../../../store/actions";

class GameIntro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      stageID: 1,
      boardSize: 4
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });

    const { userName, stageID, boardSize } = this.state;
    const { dispatch } = this.props;
    const history = this.props.history;

    if (userName && stageID) {
      var newGameObj = {
        userName,
        stageID,
        boardSize
      };
      dispatch(gameAction.initNewGame(newGameObj, history));
    }
  }

  render() {
    return (
      <Aux>
        <div className="game-intro">
          <h1>Welcome to Boggle !!</h1>
          <form>
            <div>
              <p>
                Boggle is a word game invented by Allan Turoff and originally
                distributed by Parker Brothers. The game is played using a grid
                of letters, in which the players attempt to find words in
                sequences of adjacent letters.
              </p>
              <p>
                Basically, The player searches for words that can be constructed
                from the letters of sequentially adjacent cubes, where
                "adjacent" cubes are those horizontally, vertically and
                diagonally neighboring. Words must be at least three letters
                long, may include singular and plural (or other derived forms)
                separately. The application records all the words that is
                submitted by the players. After three minutes have elapsed, the
                application stops the player from the game play and the game
                enters the scoring phase.
              </p>
            </div>

            <h2>Are you ready to play ?</h2>

            <input
              type="text"
              name="userName"
              className="form-control input-element"
              placeholder="Enter a User name > eg: John Doe"
              aria-label="userName"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
            />

            <div className="input-selector">
              <label className="input-label">Choose a board size :</label>

              <select name="boardSize"
                className="input-element" value={this.state.boardSize} onChange={this.handleChange}>
                <option value="4"> 4 x 4</option>
                <option value="5"> 5 x 5 </option>
                <option value="6"> 6 x 6</option>
              </select>
            </div>

            <Button handleSubmit={this.handleSubmit} label="START GAME" />
          </form>
        </div>

        <div className="clear" />
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

GameIntro = connect(mapStateToProps)(GameIntro);

export default GameIntro;
