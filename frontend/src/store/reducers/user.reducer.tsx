import * as types from "../actionsType/user.actionstype";

export const initialState = {
    data: {},
    loading: true,
    error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function reducer(state = initialState, action: any = {}) {

    switch (action.type) {
        case types.FIND_WHERE_INIT:
            return {
                ...state,
                data: {},
                loading: true,
                error: null,
            };

        case types.FIND_WHERE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };

        case types.FIND_WHERE_ERROR:
            return {
                ...state,
                data: {},
                loading: true,
                error: action.payload,
            };
        default:
            return state;
    }
}
