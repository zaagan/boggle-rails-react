/*
    Holds functions that are no longer in use
    but may be applicable in the future
    or as a reference
*/
import { TileData } from "../data";

const facesNum = 6;
const boardLength = 5;


/**
 * Unused function - Just for a reference
*/
const randomlySelectedFace = faces => {
    let randomIndex = Math.floor(Math.random() * facesNum);
    return faces.charAt(randomIndex);
};


/**
 * Unused function - Just for a reference
*/
const shuffleDice = dice => {
    for (let i = 0; i < dice.length; i++) {
        let randomIndex = Math.floor(Math.random() * dice.length); // random from 0 -> 25
        let temp = dice[i];
        dice[i] = dice[randomIndex];
        dice[randomIndex] = temp;
    }
    return dice;
};

/**
 * Unused function - Just for a reference
*/
export const shuffleBoardOld = () => {
    //  Create 1D array with dice
    //  Shuffle the dice
    //  Create 2D array with an empty board
    //  Randomly select from the 1D array
    //  Insert in the board and randomly pick a face

    const dice = [
        "aaafrs",
        "aaeeee",
        "aafirs",
        "aeeeem",
        "aeegmu",
        "aegmnn",
        "afirsy",
        "bjkqxz",
        "ccenst",
        "ceiilt",
        "ceilpt",
        "ceipst",
        "ddhnot",
        "dhhlor",
        "dhhlor",
        "dhlnor",
        "dhlnor",
        "eiiitt",
        "emottt",
        "ensssu",
        "fiprsy",
        "gorrvw",
        "iprrry",
        "nootuw",
        "ooottu"
    ];

    const board = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ];

    const shuffledDice = shuffleDice(dice);

    for (let row = 0; row < boardLength; row++) {
        for (let col = 0; col < boardLength; col++) {
            
            let dice = shuffledDice.shift();

            let face = randomlySelectedFace(dice);
            const tileData = new TileData(face, row, col);
            board[row][col] = tileData;
        }
    }
    return board;
};


/**
  * Unused function - Just for a reference
 */
export const calculateScore = word => {
    const score = word.length - 2;

    if (score < 1) {
        return 1;
    }
    if (score > 6) {
        return 6;
    }
    return score;
};
