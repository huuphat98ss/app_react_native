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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.data,
        loading: true,
        isLogin: true,
      };
    // case LOGOUT_USER:
    //   return {
    //     ...state,
    //     foodList: state.foodList.filter((item) => item.key !== action.key),
    //   };
    default:
      return state;
  }
};

export default authReducer;
