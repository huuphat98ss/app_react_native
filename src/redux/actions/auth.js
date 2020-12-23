import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const localhost = actionTypes.LOCALHOST;
// const localhost = '192.168.1.6';
export const login = (datapayload) => ({
  type: actionTypes.LOGIN_USER,
  data: datapayload,
});
export const dataMap = (data) => ({
  type: actionTypes.MAP_FARMER,
  data: data,
});

export const userLoginFetch = (data) => {
  console.log('login');
  return (dispatch) => {
    fetch(`http://${localhost}:3456/loginfarmer`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('decode');
        //  console.log(json);
        if (json.message) {
          console.log(json.message);
          dispatch(logout());
          return;
        }
        //AsyncStorage.setItem('userToken', JSON.stringify(data));

        const decodedToken = jwt_decode(json.accessToken);
        //  console.log(decodedToken);
        AsyncStorage.setItem('userToken', JSON.stringify(json.accessToken));

        dispatch(authStart());
        dispatch(login(decodedToken));
        dispatch(getDataMap(decodedToken.data._id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const authStart = () => {
  console.log('authStart');
  return {
    type: actionTypes.AUTH_START,
  };
};

export const getDataMap = (data) => {
  console.log('at map');
  // console.log(data);
  // let token = await AsyncStorage.getItem('userToken');
  // console.log(token);
  return (dispatch) => {
    fetch(`http://${localhost}:3456/getMap/${data}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('map get');
        // console.log(data);
        dispatch(dataMap(data));
      });
  };
};

export const checkLogin = (data) => {
  console.log('data check' + data);
  const decodedToken = jwt_decode(data);

  return (dispatch) => {
    console.log('check');
    dispatch(authStart());
    //console.log(typeof data);
    //let object = JSON.parse(data);
    // console.log('object' + object);
    if (decodedToken == null) {
      dispatch(checkLoginFail());
    }
    //console.log('dua ve object ');
    //console.log(decodedToken);
    dispatch(login(decodedToken));
    dispatch(getDataMap(decodedToken.data._id));
  };
  //}
};

export const checkLoginFail = () => ({
  type: actionTypes.CHECK_LOGIN_FAIL,
});

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
