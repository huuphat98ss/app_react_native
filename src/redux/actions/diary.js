import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localhost = actionTypes.LOCALHOST;
export const pushDiaryToServer = (data) => {
  console.log(data);
  const formData = new FormData();
  if (data.imageData !== 0) {
    formData.append('dataImage', data.imageData);
  }
  delete data['imageData'];
  formData.append(
    'datadiary',
    JSON.stringify({
      data,
    }),
  );
  //console.log(formData);
  // formData.append('dataImage', data);
  // let dataset = {
  //   hello: 'phat',
  //   hi: 'lo',
  // };
  // formData.append(
  //   'datadiary',
  //   JSON.stringify({
  //     dataset,
  //   }),
  // );
  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/writediary`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
      // body: formData,
      // dataset,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('tien hanh luu vao tab nhat ky trong ngay');
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');
      // })
      .catch((error) => {
        console.error(error);
      });
  };
  //}
};
