import { toast } from 'react-toastify';
import { MessageType } from '../constants/messageType';


export function showMessage(messageType, msg, location = toast.POSITION.TOP_RIGHT, custom) {


    var options = {
        position: location,
        className: 'boggle-msg'
    };
    switch (messageType) {

        case MessageType.SUCCESS:
            toast.success(msg, options);
            break;

        case MessageType.ERROR:
            toast.error(msg, options);
            break;

        case MessageType.WARNING:
            toast.warn(msg, options);
            break;

        case MessageType.INFO:
            toast.info(msg, options);
            break;

        case MessageType.CUSTOM:
        default:
            toast(msg);
            break;
    }
}