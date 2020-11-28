import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localhost = '192.168.0.67';

export const login = (datapayload) => ({
  type: actionTypes.LOGIN_USER,
  data: datapayload,
});

export const userLoginFetch = (data) => {
  return (dispatch) => {
    // fetch(`http://${localhost}:3456/loginfarmer`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: data.username,
    //     password: data.password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     //console.log(json);
    //     if (json.message) {
    //       console.log(json.message);
    //       dispatch(logout());
    //       return;
    //     }
    AsyncStorage.setItem('userToken', JSON.stringify(data));
    // this.setState({resdata: 'ok'});
    dispatch(authStart());
    dispatch(login(data));
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  };
};

export const authStart = () => {
  console.log('authStart');
  return {
    type: actionTypes.AUTH_START,
  };
};

// export const getUserLoginFetch = (data) => {
//   //console.log('fetch');
//   return (dispatch) => {
//     dispatch(login(data));
//   };
// }

export const checkLogin = (data) => {
  //console.log('data' + data);
  //let checktoken = AsyncStorage.getItem('userToken');
  // console.log('check login');
  //if (checktoken !== null) {
  return (dispatch) => {
    console.log('check');
    dispatch(authStart());
    //console.log(typeof data);
    let object = JSON.parse(data);
    // console.log('object' + object);
    if (object == null) {
      dispatch(checkLoginFail());
    }
    // console.log('dua ve object ');
    console.log('check data ' + object);
    dispatch(login(object));
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
