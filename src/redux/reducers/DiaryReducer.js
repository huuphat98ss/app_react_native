import * as actionTypes from '../actions/types';
import {updateObject} from '../utility';

const initialState = {
  arrayDiary: [],
  dataStayDiary: [],
  idDiaryDeleted: '',
  dataProfile: '',
};

const dataViewDiary = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    arrayDiary: action.dataView,
  });
};
const dataStayDiary = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    dataStayDiary: action.dataStayDiary,
  });
};
const idDiaryDelete = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    idDiaryDeleted: action.idDiarydelete,
  });
};
const dataProfile = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    dataProfile: action.dataProfile,
  });
};
const diaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_PROFILE:
      return dataProfile(state, action);
    case actionTypes.DATA_VIEW_DIARY:
      return dataViewDiary(state, action);
    case actionTypes.DATA_STAY_DIARY:
      return dataStayDiary(state, action);
    case actionTypes.DATA_ID_DELETE_DIAR:
      return idDiaryDelete(state, action);
    default:
      return state;
  }
};

export default diaryReducer;
