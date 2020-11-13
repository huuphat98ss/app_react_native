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

export const checkLogin = (data) => {
  //let checktoken = AsyncStorage.getItem('userToken');
  console.log('check login');
  //if (checktoken !== null) {
  return (dispatch) => {
    dispatch(setloading());
    console.log('check');
    //console.log(typeof data);
    let object = JSON.parse(data);
    // console.log('dua ve object ');
    console.log('check data ' + object);
    dispatch(login(object));
  };
  //}
};

export const checklogout = () => {
  return (dispatch) => {
    console.log('Huy');
    dispatch(setloading());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT_USER,
});

export const setloading = () => ({
  type: actionTypes.RELOADING,
});
