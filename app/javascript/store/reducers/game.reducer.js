import {
  NEW_GAME_INIT,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  BACK_TO_HOME
} from "../types";
import config from "../../constants/config";

import { getCurrentUser } from "../../helpers";

const initialState = {
  ...config,
  users: [
    {
      user: "andrew",
      score: 34,
      trials: 2,
      level: 3
    }
  ],
  inGame: false,
  currentUser: getCurrentUser(),
  stages: []
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME_INIT:
      return {...state, inGame: true, currentUser: action.user };

    case NEW_GAME_SUCCESS:
      return {...state, inGame: true, currentUser: action.user };

    case NEW_GAME_FAILURE:
      return {...state, inGame: false, currentUser: null };

    case BACK_TO_HOME:
      return {...state, inGame: false, currentUser: null };

    default:
      return state;
  }
};

export default game;
