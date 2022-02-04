import { combineReducers } from "redux";
import auth from './reducers/auth.reducer';
import user from './reducers/user.reducer';

const rootReducer = combineReducers({
    auth,
    user
})

export default rootReducer
