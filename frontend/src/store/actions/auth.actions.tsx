import { AUTH_SUCCESS } from "../actionsType/auth.actionstype";



export function Auth_Success (data : any) {
    return {
        type : AUTH_SUCCESS,
        payload : data
    }
}