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
import diaryReducer from './src/redux/reducers/DiaryReducer';
import thunk from 'redux-thunk';
import {reducer as network} from 'react-native-offline';
import {ReduxNetworkProvider} from 'react-native-offline';
const rootReducer = combineReducers({
  authReducer: authReducer,
  diaryReducer: diaryReducer,
  network,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const ReduxTutorial = () => (
  <Provider store={store}>
    <ReduxNetworkProvider>
      <App />
    </ReduxNetworkProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxTutorial);
