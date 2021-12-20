import { AnyAction } from 'redux'
import { AUTH_SUCCESS } from "../actionsType/auth.actionstype";


export function AuthReducer(state = {
    auth: false

    }, actions: AnyAction) {
    switch (actions.type) {

        case AUTH_SUCCESS :
            return Object.assign({}, state, {
                auth : actions.payload
            })

        default: return { ...state }
    }
}

