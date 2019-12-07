import * as actionTypes from "../types";
import config from "../../constants/config";

const initialState = {
  ...config,
  users: [
    {
      user: "andrew",
      score: 34,
      trials: 2,
      level: 3
    }
  ]
};

const game = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default game;