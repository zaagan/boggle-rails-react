import {
  NEW_GAME_INIT,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  BACK_TO_HOME
} from "../types";

import { gameService } from "../../services/game.service";

import { ROUTE_STAGE1 } from "../../constants/routeNames";

export const gameAction = {
  initNewGame,
  backToHome
};

function initNewGame(userName, stageID, history) {
  return dispatch => {
    dispatch(request({ userName, stageID })); // <-- REQUEST ACTION

    // MAKE A REQUEST TO THE API
    gameService.initGame(userName, stageID).then(
      gameInfo => {
        dispatch(success(gameInfo)); // <-- SUCCESS ACTION
        history.push(ROUTE_STAGE1);
      },
      error => {
        dispatch(failure(error)); // <-- FAILURE ACTION
      }
    );
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
