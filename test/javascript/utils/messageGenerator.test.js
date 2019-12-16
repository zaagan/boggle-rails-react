import { GenerateMessage, GenerateMessageByTrials } from '../../../app/javascript/helpers';

const messageHeader = "[Messaging Tests]";

/*
* TEST CASE 1
*/
test(`${messageHeader} should provide an excellent job message for a trial greater than 10  ...`, () => {
    let trials = 11;
    let userName = 'Ozesh';
    let message = GenerateMessageByTrials(trials, userName);
    expect(message).toBe(`Excellent job ${userName} !!`);
});

/*
* TEST CASE 2
*/
test(`${messageHeader} should provide a proper message based on the message type.`, () => {
    let message = GenerateMessage('end', null)
    expect(message).toBe("Thanks for playing.");
});

/*
* TEST CASE 3
*/
test(`${messageHeader} should provide no message for null message types.`, () => {
    let message = GenerateMessage(null, null)
    expect(message).toBe("");
});