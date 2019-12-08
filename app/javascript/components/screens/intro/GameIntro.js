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
      UserName: "",
      stageID: 1
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

    const { UserName, stageID } = this.state;
    const { dispatch } = this.props;
    const history = this.props.history;

    if (UserName && stageID) {
      dispatch(gameAction.initNewGame(UserName, stageID, history));
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

            <h2>Are you ready to try it out ?</h2>

            <input
              type="text"
              name="UserName"
              className="form-control input-element"
              placeholder="Enter a User name > eg: John Doe"
              aria-label="UserName"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
            />

            <Button handleSubmit={this.handleSubmit} label="START GAME" />
          </form>
        </div>

        <div className="clear" />
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  //debugger;
  return state;
  // const { loggingIn } = state.authentication;
  // const alert = state.alert;
  // return { loggingIn, alert };
}

GameIntro = connect(mapStateToProps)(GameIntro);

export default GameIntro;
