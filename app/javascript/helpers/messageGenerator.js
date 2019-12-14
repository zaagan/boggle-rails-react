import { toast } from 'react-toastify';

import { InGameMessageType } from '../constants/messageType'

export function GenerateMessage(msgType, msg) {

    switch (msgType) {

        case InGameMessageType.SUCCESS:
            return "Nice !! ";

        case InGameMessageType.ERROR:
            return "Oops !! That didnt go well.";

        case InGameMessageType.GREETING:
            return `Get ready ${msg} !! You have 3 minutes to find as many words as you can.`;

        case InGameMessageType.END:
            return "Thanks for playing. ";

        default:
            return "Huh !!";
    }


}