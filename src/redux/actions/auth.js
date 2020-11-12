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
  let checktoken = await AsyncStorage.getItem('userToken');
  console.log('check login');
  if (checktoken !== null) {
    return (dispatch) => {
      console.log('check');
      console.log(typeof checktoken);
      let object = JSON.parse(checktoken);
      console.log('dua ve object ');
      console.log(object.username);
      dispatch(login(object));
    };
  }
};

export const dataCheckLogin = async (jsonValue) => {
  return (dispatch) => {
    console.log('Huy');
  };
};

export const logout = () => ({
  type: actionTypes.LOGOUT_USER,
});
