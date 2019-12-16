import { InGameMessageType } from '../constants/messageType'


export function GenerateMessageByTrials(trials, userName) {
    let resultMsg = '';

    if (trials < 5) {
        resultMsg = "You can always do better !!";
    } else {
        if (trials > 10) {
            resultMsg = `Excellent job ${userName} !!`;
        } else {
            resultMsg = `Well played ${userName} !!`;
        }
    }
    return resultMsg;
}


export function GenerateMessage(msgType, msg) {

    if (msgType) {
        switch (msgType) {

            case InGameMessageType.SUCCESS:

                let SUCCESS_FEEDBACKS = [
                    "Nice !!",
                    "You are doing great !!",
                    "Keep Going !!",
                    "Very Good",
                    "Awesome",
                    "Alright !!"
                ];
                var randomChoice = Math.floor(Math.random() * SUCCESS_FEEDBACKS.length);
                return SUCCESS_FEEDBACKS[randomChoice];

            case InGameMessageType.EXISTS:
                return "You have already submitted this word !!";

            case InGameMessageType.ERROR:
                let FAILURE_FEEDBACKS = [
                    "Incorrect",
                    "Try again !!",
                    "That's wrong !!",
                    "Incorrect word",
                    "Wrong answer",
                ];
                var randomFailureChoice = Math.floor(Math.random() * FAILURE_FEEDBACKS.length);
                return FAILURE_FEEDBACKS[randomFailureChoice];

            case InGameMessageType.GREETING:
                return `You have 3 minutes to find as many words as you can.`;

            case InGameMessageType.END:
                return "Thanks for playing.";

            default:
                return "Huh !!";
        }
    }
    return "";

}