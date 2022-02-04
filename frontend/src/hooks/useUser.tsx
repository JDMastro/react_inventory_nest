import { useDispatch, useSelector } from 'react-redux';
import {
    findWhereAction,
} from '../store/actions/user.actions';

const useUser: Function = () => {
    const dispatch = useDispatch();

    return {
        user: useSelector((state: any) => state.user),
        findWhere: (data: any) => dispatch(findWhereAction(data)),
    };
};

export default useUser;
