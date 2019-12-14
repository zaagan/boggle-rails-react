import { toast } from 'react-toastify';
import { MessageType } from '../constants/messageType';


export function showMessage(messageType, msg, location = toast.POSITION.TOP_RIGHT, custom) {


    switch (messageType) {


        case MessageType.SUCCESS:
            toast.success(msg, {
                position: location
            });
            break;

        case MessageType.ERROR:
            toast.error(msg, {
                position: location
            });
            break;

        case MessageType.WARNING:
            toast.warn(msg, {
                position: location
            });
            break;

        case MessageType.INFO:
            toast.info(msg, {
                position: location
            });
            break;

        case MessageType.CUSTOM:
        default:
            toast(msg);
            break;
    }
}