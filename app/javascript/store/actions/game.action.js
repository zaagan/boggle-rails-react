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

import { MessageType, InGameMessageType } from "../../constants/messageType.js";

import { showMessage, GenerateMessage } from "../../helpers";

import { gameService } from "../../services/game.service";

import { ROUTE_STAGE1 } from "../../constants/routeNames";

export const gameAction = {
  initNewGame,
  evaluateWord,
  clearGame,
  backToHome
};

function clearGame() {
  return dispatch => {
    dispatch(request());
    gameService.backToHome();
  }

  function request() {
    return { type: CLEAR_GAME };
  }

}

function evaluateWord(gameObj = {
  word: ''
}, onSuccess, onFailure) {
  return dispatch => {

    dispatch(request({ word: gameObj.word }));

    // MAKE A CALL TO THE API
    gameService
      .evaluateWord(gameObj)
      .then(response => {

        if (response) {

          if (response.success) {

            if (response.data && response.data.is_correct) {

              dispatch(success(response)); // <-- SUCCESS ACTION
              showMessage(MessageType.SUCCESS, GenerateMessage(InGameMessageType.SUCCESS, ''));

            } else {
              dispatch(incorrect(response)); // <-- SUCCESS ACTION
              showMessage(MessageType.ERROR, GenerateMessage(InGameMessageType.ERROR, ''));
            }

            if (onSuccess) onSuccess();


          } else {
            dispatch(failure(response.message)); // <-- FAILURE ACTION
            showMessage(MessageType.ERROR, response.message);
          }
        } else {
          let msg = 'Something went wrong.'
          dispatch(failure(msg)); // <-- FAILURE ACTION
          showMessage(MessageType.ERROR, msg);
        }

      }, error => {
        dispatch(failure(error)); // <-- FAILURE ACTION
        showMessage(MessageType.ERROR, error);

      });

  };

  function request(response) {
    return { type: EVALUATION_INIT, response };
  }
  function success(response) {
    return { type: EVALUATION_SUCCESS, response };
  }
  function incorrect(error) {
    return { type: EVALUATION_INCORRECT, error };
  }
  function failure(error) {
    return { type: EVALUATION_FAILURE, error };
  }

}

function initNewGame(initGameObj = {
  userName: '',
  stageID: 0
}, history) {
  return dispatch => {


    // REQUEST ACTION -- >
    dispatch(request({
      userName: initGameObj.userName,
      stageID: initGameObj.stageID
    }));

    // MAKE A REQUEST TO THE API -->
    gameService
      .initGame(initGameObj)
      .then(response => {

        if (response) {

          if (response.success) {

            dispatch(success(response)); // <-- SUCCESS ACTION
            history.push(ROUTE_STAGE1);

            showMessage(MessageType.SUCCESS, GenerateMessage(InGameMessageType.GREETING, response.userName));

          } else {

            dispatch(failure(response.message)); // <-- FAILURE ACTION

            showMessage(MessageType.ERROR, response.message);
          }
        } else {

          let msg = 'Something went wrong.';
          dispatch(failure(msg)); // <-- FAILURE ACTION
          showMessage(MessageType.ERROR, msg);

        }

      }, error => {
        dispatch(failure(error)); // <-- FAILURE ACTION
        showMessage(MessageType.ERROR, error);
      });
  };

  function request(user) {
    return { type: NEW_GAME_INIT, user };
  }
  function success(user) {
    return { type: NEW_GAME_SUCCESS, user };
  }
  function failure(error) {
    return { type: NEW_GAME_FAILURE, error };
  }
}

function backToHome() {
  gameService.backToHome();
  return { type: BACK_TO_HOME };
}
