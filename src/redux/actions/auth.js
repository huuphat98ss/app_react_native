import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const localhost = '192.168.1.221';

export const login = (datapayload) => ({
  type: actionTypes.LOGIN_USER,
  data: datapayload,
});

export const userLoginFetch = (data) => {
  AsyncStorage.setItem('userToken', JSON.stringify(data));
  return (dispatch) => {
    dispatch(login(data));
  };
};

// export const getUserLoginFetch = (data) => {
//   //console.log('fetch');
//   return (dispatch) => {
//     dispatch(login(data));
//   };
// }

export const checkLogin = async () => {
  const jsonValue = await AsyncStorage.getItem('userToken');
  console.log('jsonValue' + jsonValue);
  return (dispatch) => {
    // dispatch(login(jsonValue));
    console.log('Hut');
  };
};

export const dataCheckLogin = async (jsonValue) => {
  return (dispatch) => {
    console.log('Huy');
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT_USER,
});
