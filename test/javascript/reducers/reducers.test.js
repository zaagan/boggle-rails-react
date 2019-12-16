import reducer from '../../../app/javascript/store/reducers/game.reducer'
import { initialState } from '../../../app/javascript/store/reducers/game.reducer'

import {
    NEW_GAME_INIT, NEW_GAME_SUCCESS, NEW_GAME_FAILURE,
    EVALUATION_INIT,
    EVALUATION_SUCCESS,
    EVALUATION_INCORRECT,
    EVALUATION_FAILURE,
    CLEAR_GAME
} from '../../../app/javascript/store/types'
import { GAMEMOCKS } from '../__mocks__/gameMocks';
describe('game reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toMatchSnapshot()
    })

    it('should handle a new Game init request', () => {
        expect(
            reducer(initialState,
                { type: NEW_GAME_INIT, user: GAMEMOCKS.GAME_INIT.user })
        ).toMatchSnapshot()
    });

    it('should init a new game', () => {
        expect(
            reducer(initialState,
                { type: NEW_GAME_SUCCESS, user: GAMEMOCKS.GAME_INIT_SUCCESS.user })
        ).toMatchSnapshot()
    });

    it('should handle game failures', () => {
        expect(
            reducer(initialState,
                { type: NEW_GAME_FAILURE })
        ).toMatchSnapshot()
    });

    it('should handle evaluation init', () => {
        expect(
            reducer(initialState,
                { type: EVALUATION_INIT, response: GAMEMOCKS.EVALUATION_INIT.response })
        ).toMatchSnapshot()
    });


    it('should handle evaluation sucess', () => {
        expect(
            reducer(initialState,
                { type: EVALUATION_SUCCESS, response: GAMEMOCKS.EVALUATION_SUCCESS.response })
        ).toMatchSnapshot()
    });

    it('should handle incorrect evaluations.', () => {
        expect(
            reducer(initialState,
                {
                    type: EVALUATION_INCORRECT
                })
        ).toMatchSnapshot()
    });

    it('should handle evaluation failures.', () => {
        expect(
            reducer(initialState,
                {
                    type: EVALUATION_FAILURE
                })
        ).toMatchSnapshot()
    });


    it('should handle clearing the game.', () => {
        expect(
            reducer(initialState,
                {
                    type: CLEAR_GAME
                })
        ).toMatchSnapshot()
    });

})