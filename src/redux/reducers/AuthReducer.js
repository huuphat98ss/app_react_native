import * as actionTypes from '../actions/types';
import {updateObject} from '../utility';

const initialState = {
  currentUser: {},
  isLogin: false,
  loading: true,
  arrayMap: [],
  dataCheckNotifi: [],
  dataSeasonStart: '',
  idSeason: '',
};

const authStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const login = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    currentUser: action.data,
    loading: false,
    isLogin: true,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    currentUser: {},
    loading: false,
    isLogin: false,
  });
};

const checkLoginFail = (state, action) => {
  return updateObject(state, {
    currentUser: {},
    loading: false,
    isLogin: false,
  });
};

export const dataMap = (state, action) => {
  return updateObject(state, {
    arrayMap: action.data,
  });
};

const dataCheckNotifi = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    dataCheckNotifi: action.dataCheckNotifi,
  });
};
const startSeason = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    dataSeasonStart: action.dataSeasonStart,
  });
};
const idSeason = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    idSeason: action.idSeason,
  });
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return login(state, action);
    case actionTypes.LOGOUT_USER:
      return logout(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.CHECK_LOGIN_FAIL:
      return checkLoginFail(state, action);
    case actionTypes.MAP_FARMER:
      return dataMap(state, action);
    case actionTypes.DATA_CHECK_NOTIFI:
      return dataCheckNotifi(state, action);
    case actionTypes.DATA_SEASON:
      return startSeason(state, action);
    case actionTypes.ID_DATA_SEASON:
      return idSeason(state, action);
    default:
      return state;
  }
};

export default authReducer;
