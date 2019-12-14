import { ALERT_ACTION } from "../types";

export const alertAction = {
    success,
    error,
    clear
};

function success(message) {
    return { type: ALERT_ACTION.SUCCESS, message };
}

function error(message) {
    return { type: ALERT_ACTION.ERROR, message };
}

function clear() {
    return { type: ALERT_ACTION.CLEAR };
}