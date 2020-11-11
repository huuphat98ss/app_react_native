import {LOGIN_USER, LOGOUT_USER} from '../actions/types';

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
    loading: true,
    isLogin: true,
  });
};

const logout = (state, action) => {
  console.log("HUy");
  return updateObject(state, {
    currentUser: {},
    loading: false,
    isLogin: false,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return login(state, action);
    case LOGOUT_USER:
      return logout(state, action);
    default:
      return state;
  }
};

export default authReducer;
