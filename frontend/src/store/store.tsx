import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer'

const composeenhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let store = createStore(rootReducer, composeenhancers(applyMiddleware(thunk)));


export default store;