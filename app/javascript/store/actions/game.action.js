import { NEW_GAME_INIT, NEW_GAME_SUCCESS, NEW_GAME_FAILURE, BACK_TO_HOME } from "../types";

import { gameService } from "../../services/game.service";

import { ROUTE_STAGE1 } from "../../constants/routeNames";
import { toast } from 'react-toastify';

export const gameAction = {
  initNewGame,
  backToHome
};

function initNewGame(initGameObj, history) {
  return dispatch => {


    // REQUEST ACTION -- >
    dispatch(request({
      userName: initGameObj.userName,
      stageID: initGameObj.stageID
    }));

    // MAKE A REQUEST TO THE API -->
    gameService
      .initGame(initGameObj)
      .then(gameInfo => {
        
        if (gameInfo) {

          if (gameInfo.success) {
            dispatch(success(gameInfo)); // <-- SUCCESS ACTION
            history.push(ROUTE_STAGE1);
          } else {
            dispatch(failure(gameInfo.message)); // <-- FAILURE ACTION
          }
        } else {
       
          dispatch(failure('Something went wrong.')); // <-- FAILURE ACTION
        }

      }, error => {
      
        dispatch(failure(error)); // <-- FAILURE ACTION
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
