import {
  NEW_GAME_INIT,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  CLEAR_GAME,
  EVALUATION_INIT,
  EVALUATION_SUCCESS,
  EVALUATION_INCORRECT,
  EVALUATION_FAILURE,
  BACK_TO_HOME
} from "../types";
import config from "../../constants/config";
import { MessageType, InGameMessageType } from "../../constants/messageType.js";

import { getCurrentUser, showMessage, GenerateMessage } from "../../helpers";


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
  wordScoreList: {},
  trials: 0,
  wrongCount: 0,
  stages: [],
};

const game = (state = initialState, action) => {

  switch (action.type) {
    case NEW_GAME_INIT:
      return { ...state, inGame: true, currentUser: action.user, errMsg: [] };

    case NEW_GAME_SUCCESS:
      showMessage(MessageType.SUCCESS, GenerateMessage(InGameMessageType.GREETING, action.user.userName));
      return { ...state, inGame: true, currentUser: action.user };

    case NEW_GAME_FAILURE:
      showMessage(MessageType.ERROR, action.error);
      return { ...state, inGame: false, currentUser: null };


    case EVALUATION_INIT:
      let trialCount = state.trials + 1;
      return { ...state, trials: trialCount };

    case EVALUATION_INCORRECT:
      let wrongCount = state.wrongCount + 1;
      showMessage(MessageType.ERROR, GenerateMessage(InGameMessageType.ERROR, ''));
      return { ...state, wrongCount: wrongCount };


    case EVALUATION_SUCCESS:

      let { word, data } = action.response;
      showMessage(MessageType.SUCCESS, GenerateMessage(InGameMessageType.SUCCESS, ''));
      return {
        ...state,
        wordScoreList: {
          ...state.wordScoreList,
          [word]: data.score
        }
      };


    case EVALUATION_FAILURE:
      showMessage(MessageType.ERROR, action.error);
      return state;

    case CLEAR_GAME:
      return { ...state, inGame: false, currentUser: null, trials: 0, wrongCount: 0, wordScoreList: {} };


    case BACK_TO_HOME:
      return { ...state, inGame: false, currentUser: null, trials: 0, wrongCount: 0, wordScoreList: {} };


    default:
      return state;
  }
};

export default game;
