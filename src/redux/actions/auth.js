import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const localhost = '192.168.1.221';

export const login = (datapayload) => ({
  type: actionTypes.LOGIN_USER,
  data: datapayload,
});

export const userLoginFetch = (data) => {
  //console.log('fetch');
  console.log('sdsds' + data);
  return (dispatch) => {
    AsyncStorage.setItem('userToken', JSON.stringify('phat'));
    dispatch(login(data));
  };
  // return (dispatch) => {
  //   fetch(`http://${localhost}:3456/login`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: data.username,
  //       password:data.password
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //      console.log("res login")
  //       console.log(json);
  //     })
  //     .catch((error) => console.error(error));
  // };
};
export const checkLogin = () => {
  console.log('check login');
  return (dispatch) => {
    let jsonValue = JSON.parse(AsyncStorage.getItem('userToken'));
    console.log(jsonValue);
    // console.log(JSON.parse(jsonValue));
    // if (value) {
    //   dispatch(login(data));
    // }
  };
};
export const logout = (key) => ({
  type: LOGOUT_USER,
  key: key,
});
