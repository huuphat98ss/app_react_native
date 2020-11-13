import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './reducers/AuthReducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  authReducer: authReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
