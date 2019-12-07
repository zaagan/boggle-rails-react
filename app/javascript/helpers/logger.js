import colors from 'colors';

const logMessage = function (message, type) {

    switch (type) {
        case 'error':
            console.log(colors.red(message.underline));
            break;

        case 'success':
            console.log(colors.green(message));
            break;

        case 'info':
            console.log(colors.yellow(message));
            break;

        case 'default':
            console.log(colors.blue(message));
            break;

        default:
            console.log(colors.white(message));
            break;
    }
}

export default logMessage;