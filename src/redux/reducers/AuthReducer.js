import {LOGIN_USER, LOGOUT_USER, RELOADING} from '../actions/types';

const initialState = {
  currentUser: {},
  isLogin: false,
  loading: false,
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const login = (state, action) => {
  console.log(action.data);
  return updateObject(state, {
    currentUser: action.data,
    loading: false,
    isLogin: true,
  });
};

const logout = (state, action) => {
  console.log('HUy');
  return updateObject(state, {
    currentUser: {},
    loading: false,
    isLogin: false,
  });
};
const setloading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return login(state, action);
    case LOGOUT_USER:
      return logout(state, action);
    case RELOADING:
      return setloading(state, action);
    default:
      return state;
  }
};

export default authReducer;
