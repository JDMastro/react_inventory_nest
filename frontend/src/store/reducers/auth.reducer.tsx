import { AnyAction } from 'redux'
import * as types from "../actionsType/auth.actionstype";

export const initialState = {
    loading: false,
    error: null,
};

export default function reducer(state = initialState, actions: AnyAction) {
    switch (actions.type) {

        case types.AUTH_INIT :
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.AUTH_SUCCESS :
            return {
                ...state,
                loading: false,
                error: null,
            };
        case types.AUTH_ERROR :
            return {
                ...state,
                loading: false,
                error: actions.payload,
            };

        default: return state;
    }
}

