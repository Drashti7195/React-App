import { combineReducers,createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from "../state/reducer"

console.log("user reducer check");

const reducer = {user}

const reducers = combineReducers(reducer);

export const store = createStore(reducers,applyMiddleware(thunk))

