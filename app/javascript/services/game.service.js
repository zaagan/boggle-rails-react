import APIEndPoint from "../constants/apiEndPoint";
import { ST_USER_INFO } from "../constants/storageItems";

export const gameService = {
  initGame,
  backToHome
};

function initGame(userName, stageID) {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userName, password })
  //   };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userName: userName,
        stageID: stageID,
        trials: 43
      });
    }, 300);
  }).then(user => {
    localStorage.setItem(ST_USER_INFO, JSON.stringify(user));
    return user;
  });
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
