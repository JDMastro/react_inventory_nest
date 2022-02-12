/* eslint-disable */
import * as types from "../actionsType/user.actionstype";
import { UsersRequest } from "../../services/usersService";

export const findWhereInitAction = () => ({
    type: types.FIND_WHERE_INIT,
});
export const findWhereSuccessAction = (payload: any) => ({
    type: types.FIND_WHERE_SUCCESS,
    payload,
});
export const findWhereErrorAction = (payload: any) => ({
    type: types.FIND_WHERE_ERROR,
    payload,
});

export const findWhereAction = (data: any) => async (dispatch: Function) => {
    dispatch(findWhereInitAction());
    try {
        let response = await UsersRequest.me({});
        //response.permissions = ['users:view', 'users:edit', 'users:create'];
        dispatch(findWhereSuccessAction(response));
    } catch (error) {
        return dispatch(findWhereErrorAction(error));
    }
};
