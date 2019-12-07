import React from "react";
import Aux from "../../../hoc/_Aux";

class GameIntro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Aux>
        <h5>Welcome To Boggle</h5>
      </Aux>
    );
  }
}

export default GameIntro;
