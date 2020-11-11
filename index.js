/**
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import configureStore from './src/redux/store';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import authReducer from './src/redux/reducers/AuthReducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  authReducer: authReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));



const ReduxTutorial = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxTutorial);
