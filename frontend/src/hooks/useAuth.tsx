import { useDispatch, useSelector } from 'react-redux';
import {
    authAction,
    logoutAction
} from '../store/actions/auth.actions';

const useAuth: Function = () => {
    const dispatch = useDispatch();
    return {
        auth: useSelector((state: any) => state.auth),
        login: (data: any) => dispatch(authAction(data)),
        logout: () => dispatch(logoutAction()),
    };
};

export default useAuth;
