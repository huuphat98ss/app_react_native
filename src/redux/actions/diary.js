import * as actionTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from './auth';
const localhost = actionTypes.LOCALHOST;

export const createSeason = (id, data, startSeason) => {
  console.log('tao vu mua moi');
  console.log(id);
  console.log(data);
  let dataCreate = {
    startSeason: startSeason,
    iduser: id,
    datecreate: data,
  };
  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/createseason`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataCreate,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(' tao vu moi thanh cong vao tab noti lam nhiem vu');
        dispatch(actions.Notification(id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const pushDiaryToServer = (data) => {
  console.log('dispasth diary');
  console.log(data.isFarmer);
  let idfarmer = data.isFarmer;
  //console.log(data);
  imageData = data.imageData;
  const formData = new FormData();
  if (imageData.length !== 0) {
    // formData.append(
    //   'dataImage',
    //   JSON.stringify({
    //     imageData,
    //   }),
    // );
    for (let image in imageData) {
      formData.append('dataImage', imageData[image]);
    }
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
  //     data.imageData,
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
      .then((response) => {
        response.json();
        //console.log('tien hanh luu vao tab nhat ky trong ngay');
        // console.log(idfarmer);
        //  dispatch(actions.dataNotification(idfarmer));
      })
      .then((json) => {
        console.log('tien hanh luu vao tab nhat ky trong ngay');
        console.log(idfarmer);
        dispatch(actions.dataNotification(idfarmer));
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');

      //   dispatch(actions.dataNotification(data.isFarmer));
      // })
      .catch((error) => {
        console.error(error);
      });
  };
  //}
};
export const dataViewDiary = (datapayload) => ({
  type: actionTypes.DATA_VIEW_DIARY,
  dataView: datapayload,
});
export const dataStayDiary = (datapayload) => ({
  type: actionTypes.DATA_STAY_DIARY,
  dataStayDiary: datapayload,
});
export const idDiaryDelete = (datapayload) => ({
  type: actionTypes.DATA_ID_DELETE_DIARY,
  idDiarydelete: datapayload,
});
export const showDiary = (data) => {
  console.log(data);

  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/getdiaryfarmer`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('tien hanh luu vao tab nhat ky trong ngay');
        console.log(json);
        // let data = json.map((ele) => {
        //   ele = ele.toObject();
        //   ele.dayCreate = dates(ele.updateAt.getTime());
        //   return ele;
        // });
        dispatch(dataViewDiary(json));
        // return true;
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');
      // })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const getbatchStump = (data) => {
  console.log(data);
  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/getbatchstump`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('ok oko oko');
        console.log(json);
        dispatch(dataStayDiary(json));
        // return true;
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');
      // })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const deleteDiary = (data) => {
  console.log('tai delete');
  console.log(data);
  // let dataShow = {
  //   date: data.date,
  //   idfarmer: data.idFarmer,
  // };
  return (dispatch) => {
    console.log('diary');
    //dispatch(idDiaryDelete(data.idDiary));
    fetch(`http://${localhost}:3456/deletediary`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('delete diary res');
        // console.log(json);
        //  dispatch(showDiary(dataShow));
        // return true;
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');
      // })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const dataProfile = (datapayload) => ({
  type: actionTypes.DATA_PROFILE,
  dataProfile: datapayload,
});
export const getDataFarmer = (id) => {
  console.log(id);
  return (dispatch) => {
    fetch(`http://${localhost}:3456/getdatafarmerprofile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('map get');
        // console.log(data);
        dispatch(dataProfile(data));
      });
  };
};
export const updateSeasonEnd = (data) => {
  console.log(data);
  return (dispatch) => {
    console.log('diary');
    fetch(`http://${localhost}:3456/updateendseason`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('ok oko oko');
        // console.log(json);
        // dispatch(dataStayDiary(json));
        // return true;
      })
      // .then((res) => {
      //   console.log('dua vao nhat ki trong ngay');
      // })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const dataScanQr = (dataBatch) => ({
  type: actionTypes.DATA_QR_DIARY,
  dataScanQrdiary: dataBatch,
});
export const GetStay = (lo, thua) => {
  console.log(lo + ' + ' + thua);
  return (dispatch) => {
    fetch(`http://${localhost}:3456/getdatastay/${lo}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('map get');
        console.log('batch say');
        // console.log(data);
        let datais = {
          batch: data.dataBatch.numberbatch,
          stump: thua,
        };
        // console.log(datais);
        dispatch(dataScanQr(datais));
      });
  };
};
