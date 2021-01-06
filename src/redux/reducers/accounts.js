import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "../actions/constants";

let initialState = {
  loginResponse: {},
  registerResponse: {},
};

const accountReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, loginResponse: action.response };
    case REGISTER_USER_SUCCESS:
      return { ...state, registerResponse: action.response };
    default:
      return state;
  }
};

export default accountReducer;
