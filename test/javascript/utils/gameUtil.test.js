import { shuffleBoard } from '../../../app/javascript/constants/gameUtil';

const gameUtilMsgHeader = "[Utility Functions Tests]";


/*
* TEST CASE 1
*/
test(`${gameUtilMsgHeader} [TC 1] : check for boardData and boardLength equivalence`, () => {
    let boardData = 'welcometothejungle';
    let boardLength = 4;
    var board = shuffleBoard(boardData, boardLength);
    expect(board.length).toBe(0);
});

/*
* TEST CASE 2
*/
test(`${gameUtilMsgHeader} [TC 2] : check for boardData and boardLength equivalence`, () => {
    let boardData = null;
    let boardLength = null;
    var board = shuffleBoard(boardData, boardLength);
    expect(board.length).toBe(0);
});



/*
* TEST CASE 3
*/
test(`${gameUtilMsgHeader} [TC 3] : check for boardData and boardLength equivalence`, () => {
    let boardData = 'welcometothejungle';
    let boardLength = null;
    var board = shuffleBoard(boardData, boardLength);
    expect(board.length).toBe(0);
});


/*
* TEST CASE 4
*/
test(`${gameUtilMsgHeader} [TC 5] : check if the board matrix is n x n`, () => {

    let boardData = 'udpsywnmmeapdqnnortthcasc';
    let boardLength = 5;
    var board = shuffleBoard(boardData, boardLength);
    expect(board.length).toBe(5);
    expect(board[0].length).toBe(5);

});