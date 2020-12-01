import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localhost = actionTypes.LOCALHOST;
export const pushDiaryToServer = (data) => {
  console.log(data);
  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/writediary`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        datadiary: data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('tien hanh luu vao tab nhat ky trong ngay');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //}
};
