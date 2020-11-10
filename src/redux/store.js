import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import authReducer from './reducers/AuthReducer';
import {compose} from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  authReducer: authReducer,
});
// const composeEnhancers = composeWithDevTools({realtime: true, port: 8000});
const configureStore = () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
