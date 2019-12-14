import APIEndPoint from "../constants/apiEndPoint";
import { ST_USER_INFO } from "../constants/storageItems";

export const gameService = {
  initGame,
  backToHome
};

function initGame(data) {

  let param = '?length=' + data.boardSize;
  return fetch(APIEndPoint.GAMES.NEW_GAME + param)
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (response && response.success && response.data && response.data.board_data) {
      
        var responsePackage  = {... response,
          userName: data.userName,
          stageID: data.stageID,
          boardSize: data.boardSize,
        };
     

        localStorage.setItem(ST_USER_INFO, JSON.stringify(responsePackage));
        return responsePackage;

      } else {
        return response;
      }

    })
    .catch(error => console.error(error));;

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       userName: data.userName,
  //       stageID: data.stageID,
  //       trials: 0
  //     });
  //   }, 300);
  // }).then(user => {
  //   localStorage.setItem(ST_USER_INFO, JSON.stringify(user));
  //   return user;
  // });
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function backToHome() {
  localStorage.removeItem(ST_USER_INFO);
}
