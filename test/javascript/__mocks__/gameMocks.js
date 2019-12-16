import { EVALUATION_INCORRECT } from "../../../app/javascript/store/types";



export const GAMEMOCKS = {
    GAME_INIT: {
        user: {
            stageID: 1,
            userName: "Ozesh"
        }
    },
    GAME_INIT_SUCCESS: {
        user: {
            boardSize: 4,
            data: {
                board_data: "dtyraqtaoarexepm"
            },
            message: "New game initiated.",
            stageID: 1,
            success: true,
            userName: "Ozesh"
        }
    },
    GAME_INIT_FAILURE: {

    },
    EVALUATION_INIT: {
        response: {
            word: "toad"
        }
    },
    EVALUATION_SUCCESS: {
        response: {
            data:{
                is_correct: true,
                score: 1
            },
            message: "Evaluation was succesfull !!",
            success: true,
            word: "toad",
        }
    },
    


}